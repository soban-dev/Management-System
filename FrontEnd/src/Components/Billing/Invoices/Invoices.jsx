import React from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

function Invoices() {
  const invoices = [
    { date: "March, 01, 2020", id: "#MS-415646", amount: "$180" },
    { date: "February, 10, 2021", id: "#RV-126749", amount: "$250" },
    { date: "April, 05, 2020", id: "#QW-103578", amount: "$120" },
    { date: "June, 25, 2019", id: "#MS-415646", amount: "$180" },
    { date: "March, 01, 2019", id: "#AR-803481", amount: "$300" },
  ];

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
        >
          View All
        </Button>
      </Box>

      {/* Invoices List */}
      <List>
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
            <ListItemSecondaryAction sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                {invoice.amount}
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
