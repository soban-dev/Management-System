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
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useTheme } from "@mui/material/styles";
import { BASE_URL } from "../../config";
import axios from "axios";

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: "100%",
  overflowX: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  borderRadius: "16px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.07)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
}));

const StyledTableHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
}));

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
      progress > 99 ? "#4caf50" : progress > 50 ? "#2196f3" : "#f44336",
    borderRadius: "4px",
    transition: "width 0.4s ease",
  },
}));

const TableProduct = () => {
  const theme = useTheme();
  const [cardData, setCardData] = useState({ result: [] });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/inventory/read`, {
          withCredentials: true,
        });
        console.log(response.data.result);
        
        setCardData({
          result: response.data.result,
        });
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const rows = [];
  if (cardData.result.length > 0) {
    for (const item of cardData.result) {
      rows.push({
        product: item.name || "Smartphone",
        revenue: item.selling_price_per_unit || "$12,500",
        status: item.quantity || "434",
        progress:
          item.sold_percentage ? parseFloat(item.sold_percentage).toFixed(0) : 0 || 100,
      });
    }
  }

  const icons = {
    0: <ShoppingCartIcon sx={{ color: "#00bcd4" }} />,
    1: <MonetizationOnIcon sx={{ color: "#ffc107" }} />,
    2: <StorefrontIcon sx={{ color: "#9c27b0" }} />,
    3: <ShoppingCartIcon sx={{ color: "#3f51b5" }} />,
    4: <StorefrontIcon sx={{ color: "#f44336" }} />,
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
        marginTop: "40px",
        borderRadius: "22px",
      }}
    >
      <Box sx={{ width: "100%" }}>
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

        {/* Show loader while data is being fetched */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <CircularProgress size={60} color="primary" />
          </Box>
        ) : (
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
                        { icons[index % 5]|| null}
                        <Typography variant="body1" sx={{ marginLeft: 2, color: "#ffffff", fontWeight: 500 }}>
                          {row.product}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "#ffffff" }}>{row.revenue}</TableCell>
                    <TableCell sx={{ color: "#ffffff" }}>{row.status}</TableCell>
                    <TableCell>
                      <ProgressBar progress={row.progress} />
                      <Typography variant="body2" color="white" align="center" sx={{ marginTop: "4px" }}>
                        {row.progress}%
                      </Typography>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
      </Box>
    </Box>
  );
};

export default TableProduct;
