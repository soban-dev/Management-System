import React from "react";
import { Box, Grid,} from "@mui/material";

import TopCards from "../../Components/DashboardContent/TopCards";
import Charts from "../../Components/DashboardContent/Charts";
import ItemMatrics from "../../Components/DashboardContent/ItemMatrics";
import Overview from "../../Components/DashboardContent/Overview";
import DatePickerValue from "../../Components/DashboardContent/DatePicker";
import DateRangePickerValue from "../../Components/DashboardContent/DatePicker";
import DateRangeManualPicker from "../../Components/DashboardContent/DatePicker";
import DateRangePickerComponent from "../../Components/DashboardContent/DatePicker";
import CustomDateRangePicker from "../../Components/DashboardContent/DatePicker";


function DashboardContent() {
 
  return (
    <Box>
      {/* Top Row Cards */}
      <CustomDateRangePicker/>
      <TopCards/>
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
