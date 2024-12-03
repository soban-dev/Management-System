import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Table,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LanguageIcon from "@mui/icons-material/Language";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation(); 

  return (
    <>
      {/* Permanent Sidebar for md and above */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: "250px",
            maxWidth: "100%", 
            backgroundColor: "rgb(32 41 64)", 
            color: "#EDEDED",
            boxSizing: "border-box", 
            overflow: "auto", 
            padding:'19px',
            borderRadius:'15px',
            margin:'6px',
          },
        }}
      >
        <SidebarContent location={location} toggleSidebar={toggleSidebar} />
      </Drawer>

      {/* Temporary Sidebar for xs and sm */}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={toggleSidebar} 
        sx={{
          display: { xs: "block", md: "none" }, 
          "& .MuiDrawer-paper": {
            width: "250px", 
            maxWidth: "100%", 
            backgroundColor: "rgb(32 41 64)", 
            color: "#EDEDED",
            boxSizing: "border-box", 
            overflow: "hidden", 
          },
        }}
      >
        <SidebarContent location={location} toggleSidebar={toggleSidebar} />
      </Drawer>
    </>
  );
}

function SidebarContent({ location, toggleSidebar }) {
  const role = localStorage.getItem('role'); 
// const role = "admin"
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", role: "admin" },
    { text: "Create Item", icon: <TableChartIcon />, path: "/tables",role: "admin" },
    { text: "Billing", icon: <ReceiptIcon />, path: "/billing", role: "user" },
    { text: "Notifications", icon: <NotificationsIcon />, path: "/notifications", role: "admin" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile", role: "user" },
    { text: "Log Out", icon: <LoginIcon />, path: "/sign-in", role: "user" },
    { text: "Registration", icon: <AppRegistrationIcon />, path: "/sign-up", role: "admin" },
    
  ];
  const filteredMenuItems = menuItems.filter(item => {
    if (role === "admin") {
      return true; 
    } else if (role === "user") {
      return item.role === "user"; 
    }
    return false; 
  });

  return (
    <Box
      sx={{
        height: "100%", 
        display: "flex",
        flexDirection: "column", 
      }}
    >
      {/* Logo Section */}
      <Typography
        variant="h6"
        sx={{
          padding: 2,
          color: "#FFF",
          textAlign: "center",
        }}
      >
        <DashboardIcon sx={{ fontSize: 32 }} /> Management
      </Typography>

      {/* Menu Items */}
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={toggleSidebar}
            sx={{
              color: location.pathname === item.path ? "#FFF" : "#A9A9A9",
              backgroundColor:
                location.pathname === item.path ? "rgba(30, 144, 255, 0.9)" : "transparent",
              borderRadius: 2,
              margin: 1,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "#FFF" : "#A9A9A9",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}


export default Sidebar;
