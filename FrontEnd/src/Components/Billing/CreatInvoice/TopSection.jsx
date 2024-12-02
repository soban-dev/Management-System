import React, { useState } from "react";
import { Box, Stack, TextField, Button, Typography, MenuItem } from "@mui/material";
import axios from "axios";

const TopSection = ({ setItemArray }) => {
  const [discount, setDiscount] = useState(0); // Declare

  const handleDiscountChange = (e) => {
    const value = e.target.value; // Input value ko capture kare
    setDiscount(value === "" ? 0 : Number(value)); // Khali field ke liye 0 store kare
  };
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemValue, setItemValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  

  const fetchSuggestions = async (query) => {
    try {
      if (query.length === 0) {
        setSuggestions([]);
      } else if (query.length > 1) {
        const response = await axios.post("http://localhost:3000/api/inventory/searchitem", {
          name: query,
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

  const handleSuggestionClick = async (suggestion) => {
    try {
      const response = await axios.post("http://localhost:3000/api/inventory/fetchitem", {
        name: suggestion.name,
      });
      setSelectedItem(response.data);
      setSearchValue(suggestion.name);
      setItemValue("");
      setSuggestions([]);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
      event.preventDefault();
    } else if (event.key === "Escape") {
      setSuggestions([]);
    }
  };

  const toggleEditing = (event) => {
    event.preventDefault(); // Prevent default behavior
    setIsEditing((prev) => !prev);
  
    if (isEditing) {
      updateItemArray();
    }
  };


  const handleItemInputChange = (event) => {
    setItemValue(event.target.value);
  };

  const handleItemInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsEditing(false);
      updateItemArray();
    }
  };

  const updateItemArray = () => {
    const newItem = {
      name: searchValue,
      quantity: itemValue || 0,
      price_per_unit: selectedItem?.selling_price_per_unit || 0,
      price: itemValue * selectedItem?.selling_price_per_unit
    };

    setItemArray((prevArray) => {
      const existingIndex = prevArray.findIndex((item) => item.name === searchValue);
      if (existingIndex > -1) {
        const updatedArray = [...prevArray];
        updatedArray[existingIndex] = newItem;
        return updatedArray;
      }
      return [...prevArray, newItem];
      
      
    });
    
  };
  

  return (
    <Box>
      <Typography
  variant="h4"
  textAlign="center"
  mb={3}
  sx={{
    fontFamily: "'Roboto', sans-serif", // Modern and clean font
    fontWeight: "bold", // Bold weight for emphasis
    fontSize: "28px", // Adjusted font size for better readability
    letterSpacing: "1px", // Slight spacing for a polished look
    color: "white", // Optional: Blue color for alignment with the theme
  }}
>
  Create Invoice
</Typography>

      <Stack
        direction="column" // Make it vertical layout for responsiveness
        spacing={2}
        mb={2}
        alignItems="stretch" // Stretch items to fit the width
      >
        {/* Search Input */}
        <Box sx={{ position: "relative", width: "100%", }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        sx={{
          
          "& .MuiInputBase-root": {
            height: "50px",
            borderColor: "white", // Change border color to white
          },
          color: "white",
          "& .MuiInputLabel-root": {
            color: "white", // Change label color to white
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Change border color for outlined input
          },
          // color: "white", // White text inside input
          input: { 
            color: "white", 
            MozAppearance: "textfield", // Firefox ke liye stepper arrows hataye
            appearance: "textfield" // Chrome/Edge ke liye stepper arrows hataye
          },
      //     "&:hover .MuiOutlinedInput-notchedOutline": {
      //       borderColor: "white", // Change border color on hover
      //       "& input": {
      //       color: "white !important", // Ensure the input text is white
      // },
      //     },
        }}
      />
      {suggestions.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#7e7e7e",
            zIndex: 10,
            borderRadius: 1,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <MenuItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              sx={{
                backgroundColor: index === highlightedIndex ? "#aea8a8" : "transparent",
              }}
            >
              {suggestion.name}
            </MenuItem>
          ))}
        </Box>
      )}
    </Box>

        {/* Buttons in a separate Stack for responsiveness */}
        <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      justifyContent="flex-end" // Buttons align to the right
      sx={{ width: '100%' }}
    >
      {/* Left-aligned TextField */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
      <TextField
  label="Enter Discount"
  variant="outlined"
  fullWidth
  type="number"
  step="1" // Allow only integer values
  inputProps={{
    min: "0", // Minimum value
    step: "1", // Step increment
  }}
  InputLabelProps={{
    shrink: true, // Always float the label
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white", // White border color
      },
    },
    color: "white", // White text inside input
    "& input": {
      color: "white !important", // Ensure the input text is white
      MozAppearance: "textfield", // Firefox ke liye arrows hatana
      appearance: "textfield", // Chrome/Edge ke liye arrows hatana
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        display: "none", // Chrome/Edge ke liye arrows remove
      },
      "&[type=number]": {
        MozAppearance: "textfield", // Firefox ke liye
      },
    },
    "& .MuiInputLabel-root": {
      color: "white", // Label color white
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white", // Focused state mein bhi white
    },
  }}
  onChange={(e) => {
    let value = e.target.value;

    // If the value has a decimal, convert it to an integer
    if (value.includes(".")) {
      value = Math.floor(parseFloat(value)); // Convert to integer
    }

    // Update state with the integer value
    handleDiscountChange({ target: { value } });
  }}
/>


    </Box>
      {/* Buttons Section */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Total Quantity Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained" // Use "contained" to have a filled button
            sx={{
              height: "55px",
              width: "130px",
              fontSize: "14px",
              background: "linear-gradient(90deg, #1E90FF, #007BFF)", // Gradient blue background
              color: "#FFF", // White text color
              fontWeight: "bold", // Bold text
              fontFamily: "Roboto, sans-serif",
              padding: 0, // Modern font
              "&:hover": {
                background: "linear-gradient(90deg, #007BFF, #0056B3)", // Slightly darker gradient on hover
                
              },
            }}
            onClick={(event) => toggleEditing(event)}
          >
            Total Quantity
          </Button>
          <Box
            sx={{
              mt: 1, // Margin above the TextField
              display: isEditing ? "block" : "none", // Show only when editing
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter value"
              value={itemValue}
              onChange={handleItemInputChange}
              onKeyDown={handleItemInputKeyDown}
              onBlur={(event) => {
                // Prevent blur behavior causing unwanted box selection
                if (isEditing) {
                  event.preventDefault(); // Stop default blur
                  setIsEditing(false);
                }
              }}
              autoFocus
              sx={{
                width: { xs: "100%", sm: "130px" }, // Responsive width
                alignSelf: "center",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // White border color
                  },
                },
                color: "white",
                input: { color: 'white' },
              }}
            />
          </Box>
          {!isEditing && (
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontFamily: "Roboto, sans-serif", // Modern font
                color: 'white',
              }}
            >
              {itemValue || "Enter a value"}
            </Typography>
          )}
        </Box>

        {/* Price Button */}
        <Box sx={{ textAlign: "center", display: { xs: "none", sm: "block" }, }}>
          <Button
            variant="contained" // Use "contained" for filled button
            sx={{
              height: "55px", // Reduced height
              width: "130px", // Reduced width
              fontSize: "14px", // Slightly smaller font
              background: "linear-gradient(90deg, #1E90FF, #007BFF)", // Gradient blue background
              color: "#FFF", // White text color
              fontWeight: "bold", // Bold text
              fontFamily: "Roboto, sans-serif", // Modern font
              "&:hover": {
                background: "linear-gradient(90deg, #007BFF, #0056B3)",
                 // Slightly darker gradient on hover
              },
            }}
          >
            PRICE
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              fontFamily: "Roboto, sans-serif",
              color: 'white', // Modern font
            }}
          >
            ${selectedItem?.selling_price_per_unit || 0}
          </Typography>
        </Box>

        {/* Available Quantity Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained" // Use "contained" for filled button
            sx={{
              height: "55px", // Reduced height
              width: "130px", // Reduced width
              fontSize: "14px", // Slightly smaller font
              background: "linear-gradient(90deg, #1E90FF, #007BFF)", 
              color: "#FFF", 
              padding: 0,
              fontWeight: "bold", 
              fontFamily: "Roboto, sans-serif", 
              "&:hover": {
                background: "linear-gradient(90deg, #007BFF, #0056B3)", 
              },
            }}
          >
            AVAILABLE QTY
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              fontFamily: "Roboto, sans-serif",
              color: 'white', // Modern font
            }}
          >
            {selectedItem?.quantity || 0}
          </Typography>
        </Box>
      </Box>
    </Stack>


      </Stack>
    </Box>
  );
};

export default TopSection;
