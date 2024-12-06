import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Box, Grid, Card, Typography, LinearProgress, } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,    
  LinearScale,    
  BarElement,       
  PointElement,   
  LineElement,      
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BASE_URL } from '../../config';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const token = localStorage.getItem("token");
 export default function ItemMatrics() {
    const [cardData, setCardData] = useState({
        totalProfit: null,
        itemSold: null,
        numberOfProducts: null,
        totalStock: null,
      });
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/admin/dashboard`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            // console.log("Backend Response:", response.data);
            setCardData({
              ItemsQuantity: response.data.ItemsQuantity,
              ItemsinStock: response.data.ItemsinStock,
              inHighStock: response.data.inHighStock,
              inLowStock: response.data.inLowStock,
              TotalPurchaseonItems: response.data.TotalPurchaseonItems,
              totalRevenuePotential: response.data.totalRevenuePotential,
            });
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
    



   return (
    <Grid item xs={12} md={8}>
    <Card
      sx={{
        backgroundColor: "rgb(32 41 64)",
        color: "#FFF",
        padding: 2,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" mb={2}>
        Item Matrics
      </Typography>
      <Typography variant="body2" sx={{ color: "#4CAF50" }} mb={2}>
        <span style={{ fontWeight: "bold" }}>30 done</span> this month
      </Typography>
      <Box>
        {[
          { name: "Items Quantity",budget:`${cardData.ItemsQuantity}` ||"$14,000", completion: 100 },
          { name: "Items In Stock",budget:cardData.ItemsinStock || "$3,000", completion: 100},
          { name: "Items in High Quantity", budget:cardData.inHighStock || "Not set", completion: cardData.inHighStock / cardData.ItemsinStock * 100},
          { name: "Items in Low Quantity", budget: cardData.inLowStock ||"0", completion: cardData.inHighStock / cardData.ItemsQuantity * 100 || 0 },
          { name: "Total Purchase of Items",budget:cardData.TotalPurchaseonItems || "$500", completion: 40 },
          { name: "Total Revenue Potential",budget:cardData.totalRevenuePotential || "$500", completion: 40 },
        ].map((project, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="body1">{project.name}</Typography>
            <Box sx={{ flex: 1, textAlign: "right",paddingRight:'100px', }}> {/* Left aligned */}
               <Typography variant="body2">{project.budget}</Typography>
              </Box>
            <Box sx={{ width: "30%", ml: 2 }}>
              <LinearProgress
                variant="determinate"
                value={project.completion}
                sx={{
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      project.completion === 100 ? "#4CAF50" : "#36A2EB",
                  },
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  </Grid>

   )
 }
 