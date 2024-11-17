import React, { useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";


const DashboardCalender = () => {
  const defaultValue = {
    year: 2024,
    month: 11,
    day: 15,
  };

  const [selectedDay, setSelectedDay] = useState(defaultValue);

  return (
    <Calendar
      shouldHighlightWeekends
      customDaysClassName={[
        { year: 2024, month: 11, day: 4, className: 'bg-purple-100' },
        { year: 2024, month: 11, day: 5, className: 'bg-orange-100' },
        { year: 2024, month: 11, day: 8, className: 'bg-yellow-100' },
        { year: 2024, month: 11, day: 10, className: 'bg-blue-100' },
      ]}
    />
  );
};

export default DashboardCalender;