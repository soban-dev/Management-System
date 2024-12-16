import React, { useState } from "react";
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

const CreateInvoice = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  
  const handleKeyDown = (event) => {
    if (suggestions.length > 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        ); // Loop to the start
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        ); // Loop to the end
      } else if (event.key === "Enter" && focusedIndex >= 0) {
        event.preventDefault();
        handleSuggestionClick(suggestions[focusedIndex]); // Use focusedIndex to handle selection
      }
    }
  };
  

  const fetchSuggestions = async (query) => {
    try {
      if (query.length > 1) {
        const response = await axios.post(
          `${BASE_URL}/inventory/searchitem`,
          { name: query },
          { withCredentials: true }
        );
        setSuggestions(response.data);
      } else {
        setSuggestions([]);
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
    setSuggestions([]);
    fetchItemDetails(suggestion.name);
  };

  const fetchItemDetails = async (itemName) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/inventory/fetchitem`,
        { name: itemName },
        { withCredentials: true }
      );
      setInvoiceItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };
  console.log(invoiceItems)

  const handleUpdateItems = async () => {
    const updateData = invoiceItems.map((item) => ({
      name: item.name,
      quantity: item.addition || 0,
    }));

    try {
      await axios.patch(
        `${BASE_URL}/inventory/updateitem`,
        { updateData },
        { withCredentials: true }
      );
      alert("Items updated successfully!");
    } catch (error) {
      console.error("Error updating items:", error);
      alert("Failed to update items. Please try again.");
    }
  };
   
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "800px",
        margin: "auto",
        mt: 5,
        p: 3,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        border: "2px solid #444",
        borderRadius: "10px",
        color: "white",
        position: "relative",
        backgroundColor:'black',
      }}
    >
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
          ":hover": { backgroundColor: "darkred" },
        }}
      >
        &times;
      </Button>

      <Typography variant="h4" textAlign="center" gutterBottom>
        Update Item
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, position: "relative" }}
      onKeyDown={handleKeyDown}>
        <TextField
          variant="outlined"
          fullWidth
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search for an item"
          InputProps={{ style: { color: "white", background: "#424242" } }}
        />
        {searchValue.trim().length > 0 && suggestions.length > 0 && (
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
                    backgroundColor:
                      focusedIndex === index ? "#303030" : "#616161",
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

      <Table
        sx={{
          backgroundColor: "#424242",
          borderRadius: 2,
          overflow: "hidden",
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
              Item
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
              Price
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
              Available Quantity
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
              Addition
            </TableCell>
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
                <TableCell sx={{ color: "white", textAlign: "center" }}>{item.name}</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>{item.selling_price_per_unit}</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>{item.quantity}</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  <TextField
                    value={item.addition || ""}
                    onChange={(e) => {
                      const updatedItems = [...invoiceItems];
                      updatedItems[index].addition = e.target.value;
                      setInvoiceItems(updatedItems);
                    }}
                    size="small"
                    variant="outlined"
                    sx={{
                      width: "50%",
                      ".MuiOutlinedInput-root": {
                        input: {
                          color: "white",
                          textAlign: "center",
                        },
                        "& fieldset": { borderColor: "gray" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "#757575" },
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1976d2", ":hover": { backgroundColor: "#1565c0" } }}
          onClick={handleUpdateItems}
        >
          Update Item
        </Button>
      </Box>
    </Box>
  );
};

export default CreateInvoice;