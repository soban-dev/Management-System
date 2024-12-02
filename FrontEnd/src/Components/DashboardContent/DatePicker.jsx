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
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white !important', // Force white background for the input
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fff !important', // Force white border color
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white !important', // Force white text color inside the input field
                },
                '& .MuiFormLabel-root': {
                  color: 'white !important', // Force white label color
                },
                '& .MuiInputAdornment-root': {
                  color: 'white !important', // Force white color for the calendar icon
                },
                mb: 2,
              }}
            />
          )}
        />

        {/* End Date Picker */}
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          minDate={startDate} // Ensure that end date can't be before start date
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                '& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input': {
                  backgroundColor: 'white !important',
                  Color: '#4444 !important', 
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fff !important', // Force white border color
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white !important', // Force white text color inside the input field
                },
                '& .MuiFormLabel-root': {
                  color: 'white !important', // Force white label color
                },
                '& .MuiInputAdornment-root': {
                  color: 'white !important', // Force white color for the calendar icon
                },
              }}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}
