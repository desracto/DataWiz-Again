import * as React from 'react';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

// Import MUI components for date pickers
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// Define the functional component named DateTimePickerValue
export default function DateTimePickerValue({ quizStartTime, onChange }) {
    // Extend dayjs functionality to support custom date parsing
    dayjs.extend(customParseFormat)

    // Set initial state for the date/time value using quizStartTime prop
    const [value, setValue] = React.useState(dayjs(quizStartTime, "DD/MM/YYYY - HH:mm:ss"));

    // Define a function to handle changes in date/time value
    const handleDateTimeChange = (newValue) => {
        setValue(newValue);
        // If there is a provided onChange callback, invoke it with the updated value
        if (onChange) {
            onChange('start_time', newValue);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* Container for demonstration purposes */}
            <DemoContainer components={['DateTimePicker']}>
                {/* DateTimePicker component for selecting date and time */}
                <DateTimePicker
                    label="Start Time" // Label for the DateTimePicker
                    value={value} // Current value of the DateTimePicker
                    onChange={handleDateTimeChange} // Callback for value changes
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
