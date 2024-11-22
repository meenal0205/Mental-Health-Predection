import React, { useEffect, useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import { getAllDiaryEntriesByUsername } from "../../services/services";

const DashboardCalender = ({ username }) => {
  const [Customdates, setCustomdates] = useState([])

  const classnames = {
    "Anxiety": "bg-blue-100",
    "Bipolar": "bg-purple-100",
    "Depression": "bg-slate-200",
    "Normal": "bg-green-100",
    "Personality Disorder": "bg-amber-100",
    "Stress": "bg-red-100",
    "Suicidal": "bg-gray-300"
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

    getEntries(username);
  }, []);



  return (
    <div className="ml-14">
      <Calendar
        shouldHighlightWeekends
        customDaysClassName={Customdates}
      />
      <div className="flex flex-wrap gap-y-2 gap-x-8 mt-4">
        {Object.keys(classnames).map(key => (
          <div key={key} className="flex gap-1 items-center">
            <div className={`w-12 h-4 ${classnames[key]}`} />
            <span className="text-sm text-gray-600">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCalender;