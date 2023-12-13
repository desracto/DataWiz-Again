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

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* Container for demonstration purposes */}
            <DemoContainer components={['DateTimePicker']}>
                {/* DateTimePicker component for selecting date and time */}
                <DateTimePicker
                    onChange={onChange} // Callback for value changes
                    slotProps={{ textField: { size: 'large' } }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
