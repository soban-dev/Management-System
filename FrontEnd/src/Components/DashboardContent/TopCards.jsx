import React, { useEffect, useState } from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../config";



export default function TopCards({dateValue,}) {
  const [cardData, setCardData] = useState({
    totalProfit: null,
    itemSold: null,
    numberOfProducts: null,
    totalStock: null,
  });
  console.log("meri datee ",dateValue);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/dashboard`, {
         
        });
        console.log("Backend Response:", response.data);
        setCardData({
          totalProfit: response.data.totalProfit,
          itemSold: response.data.totalSoldQuantity,
          numberOfProducts: response.data.ItemsinStock,
          totalStock: response.data.ItemsQuantity,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, []);
  const defaultCards = [
    { title: "Total Profit", value: cardData.totalProfit || "$281", percent: "+55%", description: "than last week", color: "#1E90FF" },
    { title: "Item Sold", value: cardData.itemSold || "360", percent: "+3%", description: "than last month", color: "#36A2EB" },
    { title: "No. of Products", value: cardData.numberOfProducts || "+34", percent: "+1%", description: "than yesterday", color: "#4CAF50" },
    { title: "Total Stock", value: cardData.totalStock || "+91", description: "Just updated", color: "#E91E63" },
  ];

  return (
    <Grid container spacing={3} mb={4}>
      {defaultCards.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              backgroundColor: "rgb(32 41 64)",
              color: "#FFF",
              padding: 2,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  {item.title}
                </Typography>
                <Typography variant="h4" sx={{ fontSize: "24px", fontWeight: "bold" }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4CAF50" }}>
                  {item.percent} {item.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: item.color,
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                }}
              ></Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
