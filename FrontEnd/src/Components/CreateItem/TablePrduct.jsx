import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useTheme } from "@mui/material/styles";
import { BASE_URL } from "../../config";
import axios from "axios";

// Styled Table Container with Vibrant Glass Effect
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: "100%",
  overflowX: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  borderRadius: "16px",
}));

// Styled Table Rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.07)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
}));

// Styled Table Header Row
const StyledTableHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
}));

// Progress Bar Styling
const ProgressBar = styled(Box)(({ progress }) => ({
  position: "relative",
  width: "100%",
  height: "8px",
  backgroundColor: "#444",
  borderRadius: "4px",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: `${progress}%`,
    height: "100%",
    backgroundColor:
      progress === 100 ? "#4caf50" : progress > 50 ? "#2196f3" : "#f44336",
    borderRadius: "4px",
    transition: "width 0.4s ease",
  },
}));

const TableProduct = () => {
  const theme = useTheme();
  const [cardData, setCardData] = useState( {result: []});

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/inventory/read`, {
          withCredentials: true,
        });
        console.log("Backend Response mera:", response.data);
        setCardData({
         result: response.data.result
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);


  const rows = [];
  if (cardData.result.length > 0) {
    for (const item of cardData.result) {
      // Assuming you want to map the item properties to the rows
      rows.push({
        product: item.name || "Smartphone", // Replace with your actual data
        revenue: item.selling_price_per_unit || "$12,500", // Replace with actual revenue if available
        status: item.quantity || "434", // Replace with actual status if available
        progress: item.sold_percentage ? parseFloat(item.sold_percentage).toFixed(0) : 0 || 100, // Replace with actual progress if 
      });
    }
  }

  // Icons for each product category
  const icons = {
    Smartphone: <ShoppingCartIcon sx={{ color: "#00bcd4" }} />,
    Laptop: <MonetizationOnIcon sx={{ color: "#ffc107" }} />,
    Headphones: <StorefrontIcon sx={{ color: "#9c27b0" }} />,
    Smartwatch: <ShoppingCartIcon sx={{ color: "#3f51b5" }} />,
    Camera: <StorefrontIcon sx={{ color: "#f44336" }} />,
    "Gaming Console": <MonetizationOnIcon sx={{ color: "#4caf50" }} />,
  };

  return (
    <Box
      sx={{
        padding: "40px",
        background: "rgb(32 41 64)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop:'40px',
        borderRadius:'22px',
      }}
    >
      <Box sx={{ width:'100%',}}>
        <Typography
          variant="h4"
          align="center"
          color="#ffffff"
          gutterBottom
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            textTransform: "uppercase",
            letterSpacing: "2px",
           
          }}
        >
          Product Details
        </Typography>

        <StyledTableContainer>
          <Table>
            <TableHead>
              <StyledTableHead>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: "16px" }}>
                  Product
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: "16px" }}>
                  Price
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: "16px" }}>
                  Available Quantity
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: "16px" }}>
                  Sold
                </TableCell>
              </StyledTableHead>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {icons[row.product] || null}
                      <Typography
                        variant="body1"
                        sx={{ marginLeft: 2, color: "#ffffff", fontWeight: 500 }}
                      >
                        {row.product}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>{row.revenue}</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>{row.status}</TableCell>
                  <TableCell>
                    <ProgressBar progress={row.progress} />
                    <Typography
                      variant="body2"
                      color="white"
                      align="center"
                      sx={{ marginTop: "4px" }}
                    >
                      {row.progress}%
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Box>
    </Box>
  );
};

export default TableProduct;
