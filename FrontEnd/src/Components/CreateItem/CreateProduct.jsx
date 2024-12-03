import React, { useState, useRef } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios"; 
import { BASE_URL } from "../../config";
const token = localStorage.getItem("token")
const CreateProduct = () => {
  const [clientName, setClientName] = useState("");
  const [price, setPrice] = useState(""); 
  const [quantity, setQuantity] = useState(""); 
  const [buyingPrice, setBuyingPrice] = useState(""); 
  const [requiredQuantity, setRequiredQuantity] = useState(""); 
  const [productData, setProductData] = useState([]); 

  const priceInput = useRef(null);
  const quantityInput = useRef(null);
  const buyingPriceInput = useRef(null);
  const requiredQuantityInput = useRef(null);

  const handleKeyPress = (e, nextField) => {
    if (e.key === "Enter" && nextField) {
      nextField.current.focus();
    }
  };

  const handleSubmit = async () => {
    const newProduct = {
      name: clientName,
      quantity: quantity,
      required_quantity: requiredQuantity,
      buying_price_per_unit: buyingPrice,
      selling_price_per_unit: price,
    };

    setProductData((prevData) => [...prevData, newProduct]);

    try {
      const response = await axios.post(`${BASE_URL}/inventory/createitem`,{ name :newProduct.name, 

        quantity :newProduct.quantity,
        required_quantity :newProduct.required_quantity,
        buying_price_per_unit:newProduct.buying_price_per_unit,
        selling_price_per_unit :newProduct.selling_price_per_unit,

      },
      {
        withCredentials: true, 
      });
      console.log("Backend Response:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <Box
      sx={{
        background: "rgb(32 41 64)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: "22px",
        padding: "25px 0px",
      }}
    >
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "80%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          margin: "auto",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          backgroundColor: "rgb(29 35 52 / 90%)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            mb: 3,
            color: "white",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
          }}
        >
          Add a New Product
        </Typography>

        {/* Client Name Input */}
        <TextField
          variant="outlined"
          placeholder="Enter Name"
          fullWidth
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          InputProps={{
            style: {
              color: "white",
              background: "#424242",
            },
          }}
          onKeyDown={(e) => handleKeyPress(e, priceInput)}
          sx={{ mb: 3, width: "100%", maxWidth: "350px" }}
        />

        {/* Selling Price Input */}
        <TextField
          variant="outlined"
          placeholder="Enter Selling Price"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          InputProps={{
            style: {
              color: "white",
              background: "#424242",
            },
          }}
          onKeyDown={(e) => handleKeyPress(e, buyingPriceInput)}
          inputRef={priceInput}
          sx={{ mb: 3, width: "100%", maxWidth: "350px" }}
        />

        {/* Buying Price Input */}
        <TextField
          variant="outlined"
          placeholder="Enter Buying Price"
          fullWidth
          value={buyingPrice}
          onChange={(e) => setBuyingPrice(e.target.value)}
          InputProps={{
            style: {
              color: "white",
              background: "#424242",
            },
          }}
          onKeyDown={(e) => handleKeyPress(e, requiredQuantityInput)}
          inputRef={buyingPriceInput}
          sx={{ mb: 3, width: "100%", maxWidth: "350px" }}
        />

        {/* Required Quantity Input */}
        <TextField
          variant="outlined"
          placeholder="Enter Required Quantity"
          fullWidth
          value={requiredQuantity}
          onChange={(e) => setRequiredQuantity(e.target.value)}
          InputProps={{
            style: {
              color: "white",
              background: "#424242",
            },
          }}
          onKeyDown={(e) => handleKeyPress(e, quantityInput)}
          inputRef={requiredQuantityInput}
          sx={{ mb: 3, width: "100%", maxWidth: "350px" }}
        />

        {/* Available Quantity Input */}
        <TextField
          variant="outlined"
          placeholder="Enter Available Quantity"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputProps={{
            style: {
              color: "white",
              background: "#424242",
            },
          }}
          onKeyDown={(e) => handleKeyPress(e, null)}
          inputRef={quantityInput}
          sx={{ mb: 3, width: "100%", maxWidth: "350px" }}
        />

        {/* Add Product Button */}
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            ":hover": {
              backgroundColor: "#1565c0",
            },
            fontSize: "16px",
            padding: "10px 20px",
            width: "70%",
            mt: 3,
            maxWidth:'340px',
          }}
        >
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProduct;
