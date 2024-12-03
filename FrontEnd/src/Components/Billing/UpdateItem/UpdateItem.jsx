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
import backgroundImage from "../../../assets/background.jpg";
import { BASE_URL } from "../../../config";
import { data } from "react-router-dom";


const CreateInvoice = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState(""); 
  const [suggestions, setSuggestions] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [itemData, setItemData] = useState([]); 
  const [quantity, setQuantity] = useState(""); 
  const [enteredQuantity, setEnteredQuantity] = useState(""); 
  const [invoiceItems, setInvoiceItems] = useState([]); 
  const inputRef = useRef(null); 
  
  const [editingIndex, setEditingIndex] = useState(null); 
  const [editingQuantity, setEditingQuantity] = useState(""); 
  const token= localStorage.getItem('token');
 const handleUpdateItems = async () => {
 
  const updateData = invoiceItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
  }));
  
  try {
    const response = await axios.patch(`${BASE_URL}/inventory/updateitem`, {
      updateData,
      },
      {
        withCredentials: true, 
      }
    );
    console.log("Server Response:", response.data);
    alert("Items updated successfully!");
  } catch (error) {
    console.error("Error updating items:", error);
    alert("Failed to update items. Please try again.");
  }
};
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
  const fetchItemDetails = async (itemName) => {
    try {
      const response = await axios.post(`${BASE_URL}/inventory/fetchitem`, {
        name: itemName,
      },
    {
      withCredentials : true
    });
  
      console.log("Fetched Item Details:", response.data);
      setInvoiceItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleEditQuantity = (index, currentQuantity) => {
    setEditingIndex(index);
    setEditingQuantity(currentQuantity);
  };
  const handleQuantityChange = (event) => {
    setEditingQuantity(event.target.value);
  };
  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      const updatedItems = [...invoiceItems];
      updatedItems[index].quantity = parseInt(editingQuantity);
      setInvoiceItems(updatedItems);
      setEditingIndex(null); 
      setEditingQuantity("");
    }
  };
  const handleButtonClick = () => {
    setIsInputVisible(true);
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
        border: "2px solid #444",
        borderRadius: "10px",
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
          ":hover": {
            backgroundColor: "darkred",
          },
        }}
      >
        &times;
      </Button>

      <Typography variant="h4" textAlign="center" gutterBottom>
        Update Item
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
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 10,
              color: "white",
              background: "#424242",
            }}
          >
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

      {/* Invoice Table */}
      <Table
        sx={{
          backgroundColor: "#424242",
          borderRadius: 2,
          overflow: "hidden",
          tableLayout: "fixed",
          minHeight: "245px",
          overflowY: "auto",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Item</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Available Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ color: "white" }}>
                No items available
              </TableCell>
            </TableRow>
          ) : (
            invoiceItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "white" }}>{item.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{item.selling_price_per_unit}</TableCell>
                <TableCell
  sx={{
    color: "white",
    cursor: "pointer",
    backgroundColor: editingIndex === index ? "#424242" : "transparent",
    ":hover": { backgroundColor: "#424242" }, 
  }}
  onClick={() => handleEditQuantity(index, item.quantity)}
>
  {editingIndex === index ? (
    <TextField
      value={editingQuantity}
      onChange={handleQuantityChange}
      onKeyDown={(e) => handleKeyPress(e, index)}
      autoFocus
      size="small"
      variant="outlined"
      sx={{
        width: "100px", 
        height: "40px", 
        backgroundColor: "#303030", 
        color: "white", 
        borderRadius: "5px", 
        input: {
          color: "white", 
          textAlign: "center", 
        },
      }}
    />
  ) : (
    item.quantity
  )}
</TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Update Item Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            ":hover": { backgroundColor: "#1565c0" },
          }}
          onClick={handleUpdateItems}
        >
          Update Item
        </Button>
      </Box>
    </Box>
  );
};

export default CreateInvoice;
