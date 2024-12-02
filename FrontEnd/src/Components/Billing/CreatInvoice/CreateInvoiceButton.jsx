import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import CreateInvoice from "./CreateInvoice";

const CreateInvoiceButton = () => {
  const [open, setOpen] = useState(false); // Modal open/close state

  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const handleClose = () => {
    setOpen(false); // Close the invoice component
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center align the content
        justifyContent: "center",
         // Optional to vertically center on the page
      }}
    >
      {/* Centered Button and Description */}
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            background: "linear-gradient(90deg, #1E90FF, #007BFF)",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "10px",
            padding: "10px 20px",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #007BFF, #0056B3)",
            },
          }}
        >
          Create Invoice
        </Button>

        {/* Description Text */}
        <Typography
          variant="body2"
          sx={{
            color: "#AAA",
            marginTop: 2,
            fontSize: "14px",
          }}
        >
          Click above to create a new invoice.
        </Typography>
      </Box>

      {/* Modal containing the CreateInvoice component */}
      <Modal
         open={open}
         onClose={handleClose}
         disableAutoFocus
         disableEnforceFocus
           // Close the modal when backdrop or cross button is clicked
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
  sx={{
    width: "100%",
    maxWidth: 1000,
    // marginLeft: { xs: "0", md: "220px" }, // Remove marginLeft on tablet and mobile
    borderRadius: "10px", // Rounded corners
    padding: { xs: 0, md: 0 }, // Smaller padding for mobile and tablet
    height: { xs: "auto", sm: "90vh", md: "auto" }, // Adjust height for smaller screens
  }}
>
  <CreateInvoice onClose={handleClose} />
</Box>

      </Modal>
    </Box>
  );
};

export default CreateInvoiceButton;
