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
  const [searchValue, setSearchValue] = useState(""); // Search input value
  const [suggestions, setSuggestions] = useState([]); // Suggestions fetched from API
  const [selectedItem, setSelectedItem] = useState(null); // Selected item details
  const [itemData, setItemData] = useState(null); // State to store fetched item data
  const [quantity, setQuantity] = useState(""); // State for input value
  const [enteredQuantity, setEnteredQuantity] = useState(""); // State for the quantity entered
  const [invoiceItems, setInvoiceItems] = useState([]); // State to store the list of items in the invoice
  const [discount, setDiscount] = useState(0); // Discount percentage
  const inputRef = useRef(null); // Reference to the input field
  const [clientName, setClientName] = useState(""); // State for client name
  const [openReceiptModal, setOpenReceiptModal] = useState(false); // State to manage modal visibility
  const [invoiceId, setInvoiceId] = useState("");
const token = localStorage.getItem("token")
  // Fetch suggestions as the user types
  const handleKeyPress1 = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
      event.target.blur(); // Remove focus from the TextField
    }
  };



  const fetchSuggestions = async (query) => {
    try {
      if (query.length === 0) {
        setSuggestions([]);
      } else if (query.length > 1) {
        const response = await axios.post(`${BASE_URL}/inventory/searchitem`, {
          name: query,
          // Authorization:token
        },
        {
          withCredentials: true, // Ensure cookies are sent
        });
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

  // Handle suggestion click
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
        // Authorization:token
      },
      {
        withCredentials: true, // Ensure cookies are sent
      });
      setItemData(response.data);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  // Toggle visibility of input field to enter quantity
  const [isInputVisible, setIsInputVisible] = useState(false);

  // Handle button click to toggle input visibility
  const handleButtonClick = () => {
    setIsInputVisible(true);
  };

  // Handle quantity entry on "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (quantity && selectedItem) {
        const existingItemIndex = invoiceItems.findIndex(
          (item) => item.name === selectedItem.name
        );
  
        if (existingItemIndex !== -1) {
          // If item exists, replace its quantity and totalAmount
          const updatedInvoiceItems = [...invoiceItems];
          updatedInvoiceItems[existingItemIndex].quantity = parseInt(quantity);
          updatedInvoiceItems[existingItemIndex].totalAmount =
            parseInt(quantity) * updatedInvoiceItems[existingItemIndex].price;
  
          setInvoiceItems(updatedInvoiceItems);
        } else {
          // If item does not exist, add it to the list
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
  
  // Handle discount change
  const handleDiscountChange = (event) => {
    const discountValue = Math.max(0, Math.min(100, event.target.value)); // Ensure between 0 and 100
    setDiscount(discountValue);
  };

  // Calculate total with discount
  const calculateTotalWithDiscount = () => {
    const total = invoiceItems.reduce((acc, item) => acc + item.totalAmount, 0);
    return total - (total * discount) / 100;
  };

  useEffect(() => {
    // Add event listener for outside click to hide input
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

  console.log(invoiceId)

  return (
    <Box
    sx={{
      backgroundImage: `url(${backgroundImage})`, // Add background image
      backgroundSize: "cover", // Make it cover the entire box
      backgroundPosition: "center", // Center the image
      backgroundRepeat: "no-repeat", // Prevent the image from repeating
      width: "800px",
      margin: "auto",
      mt: 5,
      p: 3,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      border:'2px solid #444',
      borderRadius:'10px',
      color: "white",
      position: "relative", // For positioning the close button
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
    
    <Box 
  sx={{
    display: "flex",
    justifyContent: "space-between", 
    alignItems: "center", 
    mb: 3, 
  }}
>
  {/* Left side TextField */}
  <TextField
        variant="outlined"
        placeholder="Old Invoice#ID"
        size="small"
        value={invoiceId}
        onChange={(e) => setInvoiceId(e.target.value)}
        onKeyPress={handleKeyPress1} 
        sx={{
          backgroundColor: "#424242",
          input: { color: "white" },
          width: "200px",
        }}
      />

  {/* Centered Heading */}
  <Typography 
    variant="h4" 
    textAlign="left" 
    sx={{
      flex: 1, 
      color: "white",
      paddingLeft:'120px',
    }}
  >
    Update Invoice
  </Typography>
</Box>


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
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "flex-start", justifyContent: "space-between" }}>
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
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{
              backgroundColor: "#1976d2",
              ":hover": { backgroundColor: "#115293" },
              height: "50px",
              width: "100%",
            }}
          >
            Total Quantity
          </Button>
          <Box sx={{ mt: 1 }}>
            {isInputVisible ? (
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
            ) : (
              <Typography variant="body2" sx={{ color: "white" }}>
                {enteredQuantity || "Enter a value"}
              </Typography>
            )}
          </Box>
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
          justifyContent: "flex-end", // Centering the elements horizontally
          alignItems: "center",
          mt: 3,
          gap: 2,
        }}
      >
        <TextField
  variant="outlined"
  label="Discount:" // Label for the input
  placeholder="Enter Discount"
  value={discount} // Bind discount state
  onChange={(e) => setDiscount(e.target.value)} // Update discount state on change
  onKeyPress={(event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter behavior
      event.target.blur(); // Remove focus from the TextField
      console.log("Discount value updated:", discount); // Debug or handle value
    }
  }}
  sx={{
    backgroundColor: "#424242", // Dark background for the field
    borderRadius: "4px", // Optional rounded edges for the input
    input: {
      color: "white", // Text color inside the field
      padding: "13.5px 14px", // Padding to match your button height
    },
    label: { color: "white" }, // Optional: Adjust label color
    width: 180, // Consistent width
    height: "50px", // Matching height with buttons
  }}
/>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            ":hover": { backgroundColor: "#115293" },
            height: "50px", // Matching height with discount field
          }}
          onClick={() => setOpenReceiptModal(true)} // Open modal on click
        >
          Generate Receipt
        </Button>
        {/* Receipt Modal */}
      <ReceiptModal
        open={openReceiptModal}
        onClose={() => setOpenReceiptModal(false)} // Close modal on close
        discount={discount}
        inventory={invoiceItems}
        clientName={clientName}
        invoiceId={invoiceId}
        setClientName={setClientName}
      />
      </Box>
    </Box>
  );
};

export default CreateInvoice;
