// app/calendar/page.tsx
"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

// Helper function to convert day names to date strings
function getNextDateForDay(dayOfWeek: string) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const targetDayIndex = daysOfWeek.indexOf(dayOfWeek);
  const today = new Date();
  const currentDayIndex = today.getDay();
  const daysToAdd = (targetDayIndex - currentDayIndex + 7) % 7;

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysToAdd);
  return nextDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
}

// Define colors for each category
const categoryColors: { [key: string]: string } = {
  Pole: "#ff5722", // Orange
  Aerial: "#3f51b5", // Blue
  Flexibility: "#009688", // Teal
  Dance: "#e91e63", // Pink
  Gymnastics: "#4caf50", // Green
  Calisthenics: "#ff9800", // Amber
  Handstands: "#9c27b0", // Purple
  Fitness: "#f44336", // Red
};

interface Class {
  class_name: string;
  school_name: string;
  class_location: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  instructor: string;
  category_name: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [calendarHeight, setCalendarHeight] = useState(0);

  useEffect(() => {
    // Calculate the height (90% of the window height)
    const newHeight = window.innerHeight * 0.9; // 90% of the window height
    setCalendarHeight(newHeight);

    async function fetchData() {
      const response = await fetch("/api/classes");
      const data = await response.json();
      const mappedEvents = data.classes.map((classItem: Class) => ({
        title: `${classItem.class_name} (${classItem.category_name})`,
        start: `${getNextDateForDay(classItem.day_of_week)}T${
          classItem.start_time
        }`,
        end: `${getNextDateForDay(classItem.day_of_week)}T${
          classItem.end_time
        }`,
        backgroundColor: categoryColors[classItem.category_name] || "#2196f3", // Default color if category not matched
        borderColor: categoryColors[classItem.category_name] || "#2196f3", // Color border to match
        extendedProps: {
          location: classItem.class_location,
          instructor: classItem.instructor,
          school: classItem.school_name,
        },
      }));
      setEvents(mappedEvents);
    }
    fetchData();

    // Update calendar height when window is resized
    const handleResize = () => {
      setCalendarHeight(window.innerHeight * 0.9);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h1>Circus Classes Calendar</h1>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]} // Use timeGridPlugin for hourly rows
        initialView="timeGridWeek" // Set the default view to a time grid for the week
        firstDay={1} // Start the week on Monday
        slotMinTime="08:00:00" // Start the day at 8 AM
        slotMaxTime="22:00:00" // End the day at 10 PM
        slotDuration="00:15:00" // Break each slot into 15 minutes (adjusts row height)
        slotLabelInterval="01:00" // Labels every hour
        height={calendarHeight} // Dynamically set height to 90% of window
        events={events} // Set the events fetched from the API
        eventOverlap={false} // Prevent overlapping
        slotEventOverlap={false} // Prevent slot-level event overlaps
      />
    </div>
  );
}
