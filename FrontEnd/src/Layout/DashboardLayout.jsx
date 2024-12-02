import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Header from "../Components/header";
import Sidebar from "../Components/sidebar";
import DashboardContent from "../pages/Dashboard/DashboardContent";
import Invoices from "../pages/Billing/BillingContent";
import ProfileComponent from "../pages/Profile/ProfileContent";
import NotificationComponent from "../pages/Notification/NotificationContent";
import CreateItem from "../pages/CreateItem/CreateItem";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [role, setRole] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:"space-between",
        gap:'20px',
        backgroundColor: "rgb(26 32 53)", // Main layout background
        minHeight: "100vh",
        height:'100%',
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen} // Pass the state to Sidebar
        toggleSidebar={toggleSidebar} // Pass toggle function to Sidebar
      />

      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // minHeight: "auto",
          width:'calc(100% - 250px)'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "sticky", // Keep the header at the top
            top: 0,
            // backgroundColor: "rgb(52, 71, 103)", // Solid background color
            zIndex: 10,
            height: "64px", // Standard header height
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius:'10px',
            // Optional shadow
          }}
        >
          <Header toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar to Header */}
        </Box>

        {/* Routes for the Content */}
        <Box 
          sx={{
            // backgroundColor: "rgb(52, 71, 103)",
            color: "#FFF",
            // overflowY: "auto", // Scrollable content
            padding: 3,
            marginTop: { xs: 5, },
            // height:'auto',
        
          
          }}
        >
          <Routes>
             <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/billing" element={<Invoices />} />
            <Route path="/tables" element={<CreateItem />} /> 
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/notifications" element={<NotificationComponent />} />
          </Routes>
        </Box>
      </Box>

      <CssBaseline />
    </Box>
  );
}

export default DashboardLayout;
