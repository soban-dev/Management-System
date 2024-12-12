import React, { useEffect, useState, useRef } from "react";
import TableProduct from '../../Components/CreateItem/TablePrduct'
import CreateProduct from '../../Components/CreateItem/CreateProduct'
import HighStockProduct from '../../Components/CreateItem/HighStockTable'
import LowStockProduct from '../../Components/CreateItem/LowStockTable'
import axios from "axios"; 
import { BASE_URL } from "../../config";
 
 export default function CreateItem() {
  const [data, setData] = useState({ available: [], low: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/inventory/read`, {
          withCredentials: true,
        });

        console.log("main ha", response.data.result);
        const available = response.data.result.find(
          (item) => item._id === "Available"
        );
        const low = response.data.result.find((item) => item._id === "Low");
        setData({
          available: available ? available.items : [],
          low: low ? low.items : [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
        
    fetchData();
  }, []);
  console.log(data);
   return (
     <>
     <CreateProduct/>
     <LowStockProduct
      data={data}/>
     <HighStockProduct
      data={data}/>
     <TableProduct
     data={data}/>
     </>
   )
 }
 