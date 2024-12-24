import React, { useState, useRef,useEffect } from "react";
import axios from "axios";
import {
  Box,
  Avatar,
  Paper,
  Typography,
  Divider,
  Stack,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import backgroundImage from "../../assets/bg-reset-cover.jpeg"; 
import avatarImage from "../../assets/team-4.jpg";
import { BASE_URL } from "../../config";

const ProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileText, setProfileText] = useState(
    "Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
  );
  const [profileData, setProfileData] = useState({});

  const textFieldRef = useRef(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/profile` ,
          {
            withCredentials: true, 
          }
        );
        const data = response.data;
        setProfileData(data); 
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);
//  console.log(profileData)
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };
  const handleClickOutside = (event) => {
    if (textFieldRef.current && !textFieldRef.current.contains(event.target)) {
      setIsEditing(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#1A202C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "22px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          width: "100%",
          height: "250px",
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "22px",
        }}
      />

      {/* Profile Card */}
      <Paper
        elevation={5}
        sx={{
          width: "85%",
          maxWidth: "900px",
          backgroundColor: "#2D3748",
          borderRadius: "22px",
          p: 5,
          mt: -10,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {/* Left Section */}
        <Box sx={{ flex: 1 }}>
          <Stack direction="column" alignItems="center">
            <Avatar
              sx={{
                width: 120,
                height: 120,
                backgroundImage: `url(${avatarImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "4px solid #1A202C",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
                objectFit: "cover",
              }}
              src={avatarImage}
              alt="Profile Avatar"
            />
            <Typography variant="h5" mt={2} sx={{ color: "white", fontWeight: "bold" }}>
              {profileData?.data?.name || "Richard Davis"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#A0AEC0", mb: 4 }}>
              {profileData?.data?.role || "CEO / Co-Founder"}
            </Typography>
          </Stack>

          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Platform Settings
          </Typography>

          {/* Rules and Regulations */}
          <Typography
            variant="body2"
            sx={{
              color: "#A0AEC0",
              mb: 1,
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Rules and Regulations
          </Typography>
          <List sx={{ paddingLeft: 2 }}>
            <ListItem disableGutters>
              <ListItemText
                primary="Your account must comply with all applicable laws and regulations."
                primaryTypographyProps={{
                  sx: { color: "white", fontSize: "14px", lineHeight: "1.8" },
                }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Ensure the security of your account by safeguarding your password."
                primaryTypographyProps={{
                  sx: { color: "white", fontSize: "14px", lineHeight: "1.8" },
                }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Avoid sharing sensitive or private information in public spaces."
                primaryTypographyProps={{
                  sx: { color: "white", fontSize: "14px", lineHeight: "1.8" },
                }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Respect other members and maintain a professional demeanor."
                primaryTypographyProps={{
                  sx: { color: "white", fontSize: "14px", lineHeight: "1.8" },
                }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Right Section */}
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Profile Information
            </Typography>
            <IconButton sx={{ color: "white" }} onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </Stack>

          {/* Editable Profile Information Text */}
          <Box sx={{ position: "relative" }}>
            {isEditing ? (
              <TextField
                value={profileText}
                onChange={(e) => setProfileText(e.target.value)}
                sx={{
                  backgroundColor: "#2D3748",
                  borderRadius: "5px",
                  width: "100%",
                  mb: 2,
                  fontFamily: "'Roboto', sans-serif",
                }}
                variant="filled"
                multiline
                rows={4}
                onKeyPress={handleKeyPress}
              />
            ) : (
              <Typography variant="body2" sx={{ color: "white" }}>
                {profileText}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3, backgroundColor: "#4A5568" }} />

          {/* Profile Details */}
          <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                Full Name:
              </Typography>
              <Typography variant="body2" sx={{ color: "white" }}>
                {profileData?.data?.name || "Richard Davis"}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                Mobile:
              </Typography>
              <Typography variant="body2" sx={{ color: "white" }}>
                {profileData?.data?.phone || "(44) 123 1234 123"}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                Email:
              </Typography>
              <Typography variant="body2" sx={{ color: "white" }}>
                {profileData?.data?.email || "alec.thompson@mail.com"}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                Location:
              </Typography>
              <Typography variant="body2" sx={{ color: "white" }}>
                {profileData?.data?.address || "Okara"}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileComponent;
