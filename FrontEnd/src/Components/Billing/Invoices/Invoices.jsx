import React, { useState, useRef,useEffect } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import { BASE_URL } from "../../../config";



function Invoices() {
  const [invoiceData, setInvoiceData] = useState({});
  const [showAllInvoices, setShowAllInvoices] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/inventory/fiveinvoice`, {
          withCredentials: true,
        });
        const data = response.data;
        setInvoiceData(data); // Set data after fetching
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfileData();
  }, []);
  
  console.log(invoiceData);
  
  const invoices = invoiceData?.receipts?.map(item => ({
    date: item.createdAt,
    id: item._id,
    amount: item.total,
  })) || [];

  
  const viewAll = async () => {
    console.log("View All button clicked");
    try {
      const response = await axios.get(`${BASE_URL}/inventory/allinvoice`, {
        withCredentials: true,
      });      
      
      // Update invoiceData with the correct structure
      setInvoiceData({
        receipts: response.data.formattedReceipts || [],  // Assuming the API returns the data in `result`
      });
      setShowAllInvoices(true); // Show all invoices
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  

  return (
    <Box
      sx={{
        backgroundColor: "rgb(32 41 64)",
        borderRadius: "10px",
        padding: 3,
        color: "#FFF",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        Width:'100%',
        margin: "auto",
        height:'573px',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Invoices
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: "#1E90FF",
            borderColor: "#1E90FF",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(30, 144, 255, 0.1)",
              borderColor: "#1E90FF",
            },
          }}
          onClick={viewAll} // onClick event added here
        >
          View All
        </Button>
      </Box>

      {/* Invoices List */}
      <List sx={{maxHeight:'440px',
              overflow:'auto',}}>
        {invoices.map((invoice, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              
              borderBottom: index !== invoices.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
              
            }}
          >
            {/* Invoice Info */}
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {invoice.date}
              </Typography>
              <Typography variant="body2" color="gray">
                {invoice.id}
              </Typography>
            </Box>

            {/* Amount and PDF */}
            <ListItemSecondaryAction sx={{ display: "flex", alignItems: "center", gap: 2, }}>
              <Typography variant="body1" fontWeight="bold">
                ${invoice.amount}
              </Typography>
              <Button
                startIcon={<PictureAsPdfIcon />}
                sx={{
                  color: "#1E90FF",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textTransform: "none",
                }}
              >
                PDF
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Invoices;
