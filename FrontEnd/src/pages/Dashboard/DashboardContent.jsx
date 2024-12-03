import React, { useState, useRef,useEffect } from "react";
import { Box, Grid,} from "@mui/material";

import TopCards from "../../Components/DashboardContent/TopCards";
import Charts from "../../Components/DashboardContent/Charts";
import ItemMatrics from "../../Components/DashboardContent/ItemMatrics";
import Overview from "../../Components/DashboardContent/Overview";
import CustomDateRangePicker from "../../Components/DashboardContent/DatePicker";


function DashboardContent() {
  const [datevalue, setDateValue] = useState();
  const [datevalue2, setDateValue2] = useState();
  // setDateValue2(datevalue);
  console.log("mera asad",datevalue);
  
  return (
    <Box>
      {/* Top Row Cards */}
      <CustomDateRangePicker
      datevalue={datevalue}
      setDateValue={setDateValue}
      />
      <TopCards
      datevalue={datevalue}
      />
       {/* Charts */}
       <Charts/>
      {/* Bottom Section */}
       <Grid container spacing={3} mt={4}>
      {/* Projects */}
        <ItemMatrics/>
      {/* Orders Overview */}
      <Overview/>
      </Grid>
     </Box>
  );
}

export default DashboardContent;
