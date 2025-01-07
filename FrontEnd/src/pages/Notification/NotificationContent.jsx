import React, { useEffect, useState } from "react";
import { Box, Alert, IconButton, Paper, Typography, Button, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [verifyingId, setVerifyingId] = useState(null); 
  const location = useLocation();

  const handleClose = (index,id, username ) => {
    deleteVerify(id , username)
  };

  const handleVerify = async (id, username) => {
    setVerifyingId(id); 
    try {
      const response = await axios.post(`${BASE_URL}/admin/verify`, { employeeId: id });
      if (response.status === 200) {
        alert(`Verification Successful for ${username}`);
        fetchNotifications();
      } else {
        alert(`Verification Failed for ${username}`);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("An error occurred while verifying the user.");
    } finally {
      setVerifyingId(null); 
    }
  };
  const deleteVerify = async (id, username) => {
    setVerifyingId(id); 
    try {
      const response = await axios.post(`${BASE_URL}/admin/delete`, { employeeId: id });
      if (response.status === 200) {
        alert(`deletion Successful ${username}`);
        fetchNotifications();
      } else {
        alert(`Deletion failed for ${username}`);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("An error occurred while deleting the user.");
    } 
    finally {
      setVerifyingId(null); 
    }
  };
  useEffect(() => {
    if (location.pathname === "/notifications") {
      fetchNotifications();
    }
  }, [location]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/employees`);

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
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
    } finally {
      setLoading(false); 
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

        {/* Show loader while fetching notifications */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        ) : notifications.length > 0 ? (
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
                  onClick={() => handleClose(index, notification.id, notification.username)}
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
                    backgroundColor: verifyingId === notification.id ? "#ccc" : "#4CAF50",
                    color: "white",
                    fontWeight: "bold",
                    padding: "4px 16px",
                    borderRadius: "8px",
                    textTransform: "none",
                    marginLeft: "190px",
                  }}
                  onClick={() => handleVerify(notification.id, notification.username)}
                  disabled={verifyingId === notification.id} 
                >
                  {verifyingId === notification.id ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Verify"
                  )}
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
