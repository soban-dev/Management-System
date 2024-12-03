import * as React from 'react';
import dayjs from 'dayjs';
import { Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CustomDateRangePicker() {
  const [startDate, setStartDate] = React.useState(dayjs()); // Start Date
  const [endDate, setEndDate] = React.useState(dayjs().add(1, 'day')); // End Date

  // Start Date change handler
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    // If end date is earlier than start date, update it to the start date
    if (newValue.isAfter(endDate)) {
      setEndDate(newValue.add(1, 'day'));
    }
  };

  // End Date change handler
  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'flex-end' }}>
        {/* Start Date Picker */}
        <DatePicker
        sx={{
          '& .MuiInputBase-root': {
                  color:'white !important', 
                  borderColor:'white !important',     
                },
               '& .MuiFormLabel-root' :{
                color:'white !important',
               },
               '& .MuiButtonBase-root' :{
                color:'white !important', 
               },
               '& .MuiOutlinedInput-notchedOutline ' :{
                borderColor:'white !important',  
               },
        }}
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                mb: 2,
              }}
            />
          )}
        />

        {/* End Date Picker */}
        <DatePicker
          label="End Date"
          value={endDate}
          sx={{
            '& .MuiInputBase-root': {
                    color:'white !important', 
                    borderColor:'white !important',     
                  },
                 '& .MuiFormLabel-root' :{
                  color:'white !important',
                 },
                 '& .MuiButtonBase-root' :{
                  color:'white !important', 
                 },
                 '& .MuiOutlinedInput-notchedOutline ' :{
                  borderColor:'white !important',  
                 },
          }}
          onChange={handleEndDateChange}
          minDate={startDate} // Ensure that end date can't be before start date
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}
