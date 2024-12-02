import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import backgroundImage from "../../../assets/background.jpg";
import { BASE_URL } from "../../../config";

const ReceiptModal = ({
  open,
  onClose,
  discount,
  inventory = [],
  clientName,
  setClientName,
}) => {
  const [message, setMessage] = useState(""); // To store error or success messages
const token = localStorage.getItem("token")
  const calculateTotalAmount = () => {
    return inventory.reduce((total, row) => total + row.totalAmount, 0);
  };
  const calculateTotalAmountWithDiscount = () => {
    const total = inventory.reduce((total, row) => total + row.totalAmount, 0); // Sum up all totalAmount values
    const discountedTotal = total - (total * discount) / 100; // Apply the discount
    return discountedTotal.toFixed(2); // Round to two decimal places
  };

  const handleGenerateReceipt = async () => {
    if (!clientName) {
      setMessage("Please fill in the 'Client Name' field.");
      return;
    }

    const data = {
      percentdiscount: discount ,
      customername: clientName,
      items: inventory,
      total: calculateTotalAmount(),
    };

    try {
      const response = await axios.post(`${BASE_URL}/inventory/invoice`,
        {
          data,
          // Authorization:token
        },
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );

      console.log("Backend Response:", response.data);
      setMessage("Receipt generated successfully!");
    } catch (error) {
      console.error("Error generating receipt:", error);
      setMessage("Failed to generate receipt. Please try again.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="receipt-modal-title"
      aria-describedby="receipt-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: "500px" },
          marginTop:{ md: "40px" }, // Full width for mobile, fixed width for tablet/desktop
          maxHeight: "90vh", // Limit height for scrollable content
          bgcolor: "#424242",
          boxShadow: 24,
          p: { xs: 2, md: 4 },
          // borderRadius: 2,
          overflowY: "auto", // Enable scrolling for long content
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border:'2px solid #ffffff44',
          borderRadius:'10px',
        }}
      >
        <Typography
          variant="h6"
          id="receipt-modal-title"
          mb={2}
          sx={{ color: "white" }}
        >
          Generate Receipt
        </Typography>

        {/* Customer Name Field */}
        <TextField
          fullWidth
          label="Customer Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          sx={{
            mb: 2,
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />

        {/* Receipt Table */}
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
            mb: 2,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Item</TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Price
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Qty
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.length > 0 ? (
                inventory.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: "white" }}>{row.name}</TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      ${row.price}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      {row.quantity}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      ${row.totalAmount}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: "white" }}>
                    No items available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total Amount */}
        <Typography variant="h6" align="right" sx={{ mb: 2, color: "white" }}>
          Total: ${calculateTotalAmount()}
        </Typography>
        <Typography variant="h6" align="right" sx={{ mb: 2, color: "white" }}>
          Total After Discount: ${calculateTotalAmountWithDiscount()}
        </Typography>

        {/* Error/Success Message */}
        {message && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              textAlign: "left",
              color: message.includes("successfully") ? "green" : "red",
            }}
          >
            {message}
          </Typography>
        )}

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleGenerateReceipt}>
            Confirm
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ReceiptModal;
