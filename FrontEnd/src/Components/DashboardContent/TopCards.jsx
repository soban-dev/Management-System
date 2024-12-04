import React, { useEffect, useState } from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../config";



export default function TopCards({datevalue,datevalue2}) {
  const [cardData, setCardData] = useState({
    totalProfit: null,
    itemSold: null,
    numberOfProducts: null,
    totalStock: null,
  });
 
  

  useEffect(() => {
    const fetchData = async () => {
      // console.log("startdate ",datevalue);
      // console.log("enddate ",datevalue2);
      if (datevalue && datevalue2) {
        try {
          const response = await axios.get(
            `${BASE_URL}/admin/dashboard?startDate=${datevalue}&endDate=${datevalue2}`
          );
          // console.log("Backend Response:", response.data);

          setCardData({
            totalProfit: response.data?.totalProfit || 0,
            itemSold: response.data?.totalSoldQuantity || 0,
            numberOfProducts: response.data?.ItemsinStock || 0,
            totalStock: response.data?.ItemsQuantity || 0,
          });
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log("Start and end dates are required.");
      }
    };

    fetchData(); // Trigger fetch when dates change
  }, [datevalue, datevalue2]);
  const defaultCards = [
    { title: "Total Profit", value: cardData.totalProfit || "$0", percent: "+55%", description: "than last week", color: "#1E90FF" },
    { title: "Item Sold", value: cardData.itemSold || "0", percent: "+3%", description: "than last month", color: "#36A2EB" },
    { title: "No. of Products", value: cardData.numberOfProducts || "+0", percent: "+1%", description: "than yesterday", color: "#4CAF50" },
    { title: "Total Stock", value: cardData.totalStock || "+0", description: "Just updated", color: "#E91E63" },
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
