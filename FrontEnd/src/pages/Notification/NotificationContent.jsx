import React, { useEffect, useState } from "react";
import { Box, Alert, IconButton, Paper, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom"; 
import axios from "axios"; 
import { BASE_URL } from "../../config";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]); 
  const location = useLocation(); 

  const handleClose = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index)); 
  };

  const handleVerify = async (id, username) => {
    try {
      const response = await axios.post("http://localhost:3000/api/admin/verify", { employeeId: id });
      if (response.status === 200) {
        alert(`Verification Successful for ${username}`);
      } else {
        alert(`Verification Failed for ${username}`);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("An error occurred while verifying the user.");
    }
  };
  useEffect(() => {
    if (location.pathname === "/notifications") {
      fetchNotifications();
    }
  }, [location]);
  const fetchNotifications = async () => {
    try {
      // console.log("Fetching notifications...");
      const response = await fetch(`${BASE_URL}/admin/employees`,);

      // console.log("Response Status:", response.status);
      // console.log("Response Headers:", response.headers);

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      // console.log("Fetched Notifications Data:", data);
      if (data.unverified && Array.isArray(data.unverified)) {
        const notifications = data.unverified.map((user) => ({
          id: user._id, 
          username: user.username,
          message: `Click to verify ${user.username}`, 
        }));

        setNotifications(notifications); 
      } else {
        console.error("Fetched data is not in expected array format.");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "20px auto" }}>
      <Paper
        elevation={12}
        sx={{
          backgroundColor: "#1A202C",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Alerts
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#A0AEC0",
            textAlign: "center",
            fontFamily: "'Roboto', sans-serif",
            marginBottom: "20px",
          }}
        >
          You will get all important messages or popups here.
        </Typography>

        {/* Display fetched notifications */}
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Alert
  key={index}
  sx={{
    backgroundColor: "#ff1100a8",
    color: "white",
    padding: "7px 25px",
    borderRadius: "10px",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "space-between", 
    alignItems: "center",
    position: "relative", 
  }}
  action={
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => handleClose(index)}
      sx={{
        position: "absolute",
        top: "8px",
        right: "8px",
        color: "white",
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  }
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <Typography sx={{ fontWeight: "bold", marginRight: "16px" }}>
      {notification.message}
    </Typography>

    <Button
      variant="contained"
      sx={{
        backgroundColor: "#4CAF50",
        color: "white",
        fontWeight: "bold",
        padding: "4px 16px",
        borderRadius: "8px",
        textTransform: "none",
        marginLeft:'190px',
      }}
      onClick={() => handleVerify(notification.id, notification.username)} 
    >
      Verify
    </Button>
  </Box>
</Alert>

          ))
        ) : (
          <Typography variant="body1" sx={{ color: "#A0AEC0", textAlign: "center" }}>
            No notifications available.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default NotificationComponent;
