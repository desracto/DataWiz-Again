import * as React from 'react';

import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePickerValue( {quizStartTime, onChange} ) {
    dayjs.extend(customParseFormat)
    const [value, setValue] = React.useState(dayjs(quizStartTime, "DD/MM/YYYY - HH:mm:ss"));

    const handleDateTimeChange = (newValue) => {
        setValue(newValue);
        if (onChange) {
            onChange('start_time', newValue);
        }
    }

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
                label="Start Time"
                value={value}
                onChange={handleDateTimeChange}
            />
        </DemoContainer>
    </LocalizationProvider>
    );
}
