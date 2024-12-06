import React, { useEffect, useState } from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../config";



export default function TopCards({datevalue,datevalue2}) {
  const [cardData, setCardData] = useState({
    Sales: null,
    Profit: null,
    Revenue: null,
    ItemSold: null,
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
            Sales: response.data?.totalSales || 0,
            Profit: response.data?.totalProfit || 0,
            Revenue: response.data?.totalRevenuePotential || 0,
            ItemSold: response.data?.totalSoldQuantity || 0,
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
    { title: "TotalSales", value:`Rs: ${cardData.Sales}`   || "$0",  description: `from ${datevalue} \n to ${datevalue2}`, color: "#1E90FF" },
    { title: "Profit", value: `Rs: ${cardData.Profit}` || "0", description: `from ${datevalue} \n to ${datevalue2}`, color: "#36A2EB" },
    { title: "Revenue Potential", value: `Rs: ${cardData.Revenue}` || "+0",  description: `Potential of Revenue on all Items.`, color: "#4CAF50" },
    { title: "ItemSold", value: ` ${cardData.ItemSold}` || "+0", description: `from ${datevalue} \n to ${datevalue2}`, color: "#E91E63" },
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
                <Typography variant="h6" sx={{ fontSize: "13px" }}>
                  {item.title}
                </Typography>
                <Typography variant="h4" sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "11px", color: "#4CAF50" }}>
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
