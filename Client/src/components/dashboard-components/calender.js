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

  const classnames = {
    "Anxiety": "bg-blue-400",
    "Bipolar": "bg-purple-400",
    "Depression": "bg-gray-400",
    "Normal": "bg-green-400",
    " Personality Disorder": "bg-amber-400",
    "Stress": "bg-red-400",
    "Suicidal": "bg-gray-400"
  }




  useEffect(() => {
    async function getEntries(username) {
      const response = await getAllDiaryEntriesByUsername(username);
      const uniqueDates = [...Customdates];

      response.data.forEach(element => {
        const monthAbbreviation = element.created_at.split(" ")[2];
        const date = new Date(`${monthAbbreviation} 1, 2000`);
        const year = element.created_at.split(" ")[3];
        const day = element.created_at.split(" ")[1];
        const month = date.getMonth() + 1;

        const newEntry = {
          day: +day,
          month: +month,
          year: +year,
          className: classnames[element.sentiment],
        };

        if (!uniqueDates.some(entry =>
          entry.day === newEntry.day &&
          entry.month === newEntry.month &&
          entry.year === newEntry.year &&
          entry.className === newEntry.className
        )) {
          uniqueDates.push(newEntry);
        }
      });

      setCustomdates(uniqueDates);
    }

    getEntries(getUserdetails().username);
  }, []);



  return (
    <Calendar
      shouldHighlightWeekends
      customDaysClassName={Customdates}

    />
  );
};

export default DashboardCalender;