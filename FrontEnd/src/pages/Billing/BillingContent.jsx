import React from "react";
import { Box } from "@mui/material";
import CreateInvoiceButton from "../../Components/Billing/CreatInvoice/CreateInvoiceButton"; // Create Invoice Button
import UpdateInvoiceButton from "../../Components/Billing/UpdateInvoice/UpdateInvoiceButton"; // Update Invoice Button
import Invoices from "../../Components/Billing/Invoices/Invoices"; // Invoices Component
import UpdateItemButton from "../../Components/Billing/UpdateItem/UpdateItemButton";

export default function BillingContent() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap", // Wrap content for responsiveness
        justifyContent: { xs: "center", md: "space-between" }, // Center on mobile, space between on larger screens
        alignItems: "flex-start",
        gap: 3,
        padding: 2,
      }}
    >
      {/* Left Column: Buttons */}
      <Box
        sx={{
          flex: 1,
          maxWidth: { xs: "100%", sm: "540px" }, // Full width on mobile, reduced on larger screens
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            padding: 1.5,
            backgroundColor: "rgb(32 41 64)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "180px",
            width: "100%", // Full width for responsiveness
          }}
        >
          <CreateInvoiceButton />
        </Box>
        <Box
          sx={{
            padding: 1.5,
            backgroundColor: "rgb(32 41 64)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "180px",
            width: "100%", // Full width for responsiveness
          }}
        >
          <UpdateInvoiceButton />
        </Box>
        <Box
          sx={{
            padding: 1.5,
            backgroundColor: "rgb(32 41 64)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "180px",
            width: "100%", // Full width for responsiveness
          }}
        >
          <UpdateItemButton />
        </Box>
      </Box>

      {/* Right Column: Invoices */}
      <Box
        sx={{
          flex: 2,
          width: { xs: "100%", sm: "calc(100% - 560px)" }, // Adjust width based on the left column
          maxWidth: "100%", // Prevent overflow
          marginTop: { xs: 0, md: 0 }, // Add top margin for mobile view
        }}
      >
        <Invoices />
      </Box>
    </Box>
  );
}
