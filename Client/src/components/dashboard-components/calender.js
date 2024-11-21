import React, { useEffect, useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import { getAllDiaryEntriesByUsername } from "../../services/services";
import { getUserdetails } from "../../utils/session";


const DashboardCalender = () => {
  let date = new Date();
  const defaultValue = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),
  };

  const [selectedDay, setSelectedDay] = useState(defaultValue);

  const [Customdates, setCustomdates] = useState([])

  useEffect(() => {
    async function getEntries(username) {
      const response = await getAllDiaryEntriesByUsername(username);
      setCustomdates(response.data);

      Customdates.forEach(element => {
        console.log(element.created_at);
      });



    }
    getEntries(getUserdetails().username)


  }, [])


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