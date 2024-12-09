import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  List,
  Paper,
} from "@mui/material";
import axios from "axios";
import ReceiptModal from "./ReciptModel";
import backgroundImage from "../../../assets/background.jpg";
import { BASE_URL } from "../../../config";


const CreateInvoice = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState(""); 
  const [suggestions, setSuggestions] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemData, setItemData] = useState(null); 
  const [quantity, setQuantity] = useState(""); 
  const [enteredQuantity, setEnteredQuantity] = useState(""); 
  const [invoiceItems, setInvoiceItems] = useState([]); 
  const [discount, setDiscount] = useState(0); 
  const inputRef = useRef(null); 
  const [clientName, setClientName] = useState(""); 
  const [openReceiptModal, setOpenReceiptModal] = useState(false);

  const token = localStorage.getItem("token")
  
  const fetchSuggestions = async (query) => {


    
    try {
      if (query.length === 0) {
        setSuggestions([]);
      } else if (query.length > 1) {
        const response = await axios.post(`${BASE_URL}/inventory/searchitem`, {
          name: query,
        },
        {
          withCredentials: true, 
        }
      );
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    fetchSuggestions(event.target.value);
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion.name);
    setSelectedItem(suggestion);
    setSuggestions([]);
    fetchItemDetails(suggestion.name);
  };

  // Fetch item details
  const fetchItemDetails = async (itemName) => {
    try {
      const response = await axios.post(`${BASE_URL}/inventory/fetchitem`, {
        name: itemName, 
      },
      {
        withCredentials: true, 
      });
      setItemData(response.data);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleButtonClick = () => {
    setIsInputVisible(true);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (quantity && selectedItem) {
        const existingItemIndex = invoiceItems.findIndex(
          (item) => item.name === selectedItem.name
        );
  
        if (existingItemIndex !== -1) {
          const updatedInvoiceItems = [...invoiceItems];
          updatedInvoiceItems[existingItemIndex].quantity = parseInt(quantity);
          updatedInvoiceItems[existingItemIndex].totalAmount =
            parseInt(quantity) * updatedInvoiceItems[existingItemIndex].price;
  
          setInvoiceItems(updatedInvoiceItems);
        } else {
          const newItem = {
            name: selectedItem.name,
            price: itemData.selling_price_per_unit,
            quantity: parseInt(quantity),
            totalAmount: quantity * itemData.selling_price_per_unit,
          };
          setInvoiceItems([...invoiceItems, newItem]);
        }
  
        setEnteredQuantity(quantity);
        setQuantity("");
        setIsInputVisible(false);
      }
    }
  };
  
  const handleDiscountChange = (event) => {
    const discountValue = Math.max(0, Math.min(100, event.target.value)); 
    setDiscount(discountValue);
  };

  const calculateTotalWithDiscount = () => {
    const total = invoiceItems.reduce((acc, item) => acc + item.totalAmount, 0);
    return total - (total * discount) / 100;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsInputVisible(false);
    }
  };

  return (
    <Box
    sx={{
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: "cover", 
      backgroundPosition: "center", 
      backgroundRepeat: "no-repeat", 
      width: "800px",
      margin: "auto",
      mt: 5,
      p: 3,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      border:'2px solid #444',
      borderRadius:'10px',
      color: "white",
      position: "relative", 
    }}
  >
    {/* Close Button */}
    <Button
      onClick={onClose} 
      sx={{
        position: "absolute", 
        top: "10px", 
        right: "10px", 
        backgroundColor: "red", 
        color: "white", 
        minWidth: "40px", 
        minHeight: "40px",
        borderRadius: "50%", 
        ':hover': {
          backgroundColor: "darkred", 
        },
      }}
    >
      &times; {/* Cross icon */}
    </Button>
    
      <Typography variant="h4" textAlign="center" gutterBottom>
        Create Invoice
      </Typography>

      {/* Search Field */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, position: "relative" }}>
        <TextField
          variant="outlined"
          fullWidth
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search for an item"
          InputProps={{ style: { color: "white", background: "#424242" } }}
        />
        {suggestions.length > 0 && (
          <Paper sx={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10,color: "white", background: "#424242" }}>
            <List>
              {suggestions.map((suggestion, index) => (
                <MenuItem
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{
                    backgroundColor: "#616161",
                    ":hover": { backgroundColor: "#303030" },
                  }}
                >
                  {suggestion.name}
                </MenuItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      {/* Buttons Row */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "flex-start", justifyContent: "space-between",marginRight:'13px', }}>
        <Box sx={{ textAlign: "center", width: "150px", }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              ":hover": { backgroundColor: "#115293" },
              height: "50px",
              width: "100%",
            }}
          >
            Price
          </Button>
          <Typography variant="body2" sx={{ color: "white", marginTop: 1 }}>
            {itemData ? itemData.selling_price_per_unit : "0"}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", width: "150px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              ":hover": { backgroundColor: "#115293" },
              height: "50px",
              width: "100%",
            }}
          >
            Available Qty
          </Button>
          <Typography variant="body2" sx={{ color: "white", marginTop: 1 }}>
            {itemData ? itemData.quantity : "0"}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", width: "150px" }}>
  <TextField
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    onKeyPress={handleKeyPress}
    placeholder="Enter Quantity"
    sx={{
      width: "100%",
      backgroundColor: "#424242",
      input: { color: "white" },
    }}
    autoFocus
    ref={inputRef}
  />
  {/* <Box sx={{ mt: 1 }}>
    <Typography variant="body2" sx={{ color: "white" }}>
      {enteredQuantity || "Enter a value"}
    </Typography>
  </Box> */}
</Box>

      </Box>

      {/* Invoice Table */}
      <Table sx={{ backgroundColor: "#424242", borderRadius: 2, overflow: "hidden" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Item</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Qty</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ color: "white" }}>
                No items available
              </TableCell>
            </TableRow>
          ) : (
            invoiceItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "white" }}>{item.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{item.price}</TableCell>
                <TableCell sx={{ color: "white" }}>{item.quantity}</TableCell>
                <TableCell sx={{ color: "white" }}>{item.totalAmount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Discount and Generate Receipt */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", 
          alignItems: "center",
          mt: 3,
          gap: 2,
        }}
      >
        <TextField
  variant="outlined"
  label="Discount:" 
  placeholder="Enter Discount"
  value={discount} 
  onChange={(e) => setDiscount(e.target.value)} 
  onKeyPress={(event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      event.target.blur(); 
      // console.log("Discount value updated:", discount); 
    }
  }}
  sx={{
    backgroundColor: "#424242", 
    borderRadius: "4px", 
    input: {
      color: "white", 
      padding: "13.5px 14px", 
    },
    label: { color: "white" }, 
    width: 180, 
    height: "50px", 
  }}
/>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            ":hover": { backgroundColor: "#115293" },
            height: "50px",
          }}
          onClick={() => setOpenReceiptModal(true)} 
        >
          Generate Receipt
        </Button>
        {/* Receipt Modal */}
      <ReceiptModal
        open={openReceiptModal}
        onClose={() => setOpenReceiptModal(false)} 
        discount={discount}
        inventory={invoiceItems}
        clientName={clientName}
        setClientName={setClientName}
      />
      </Box>
    </Box>
  );
};

export default CreateInvoice;
