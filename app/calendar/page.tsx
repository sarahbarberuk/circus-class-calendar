"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

// Define colors for each category
const categoryColors: { [key: string]: string } = {
  Pole: "#ff5722",
  Aerial: "#3f51b5",
  Flexibility: "#009688",
  Dance: "#e91e63",
  Gymnastics: "#4caf50",
  Calisthenics: "#ff9800",
  Handstands: "#9c27b0",
  Fitness: "#f44336",
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
  level_description: string; // Fetch level description
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Class[]>([]);
  const [calendarHeight, setCalendarHeight] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // For filtering categories
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]); // For filtering levels

  useEffect(() => {
    // Calculate the height (90% of the window height)
    const newHeight = window.innerHeight * 0.9;
    setCalendarHeight(newHeight);

    async function fetchData() {
      const response = await fetch("/api/classes"); // Fetch from API
      const data = await response.json();
      const mappedEvents = data.classes.map((classItem: Class) => ({
        title: `${classItem.class_name} (${classItem.category_name}, ${classItem.level_description})`,
        start: `${getNextDateForDay(classItem.day_of_week)}T${
          classItem.start_time
        }`,
        end: `${getNextDateForDay(classItem.day_of_week)}T${
          classItem.end_time
        }`,
        backgroundColor: categoryColors[classItem.category_name] || "#2196f3",
        borderColor: categoryColors[classItem.category_name] || "#2196f3",
        category: classItem.category_name, // Add category for filtering
        level: classItem.level_description, // Add level for filtering
        extendedProps: {
          location: classItem.class_location,
          instructor: classItem.instructor,
          school: classItem.school_name,
        },
      }));
      setEvents(mappedEvents);
    }

    fetchData();

    const handleResize = () => {
      setCalendarHeight(window.innerHeight * 0.9);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleLevelChange = (level: string) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((lev) => lev !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  // Filter events based on selected categories and levels
  const filteredEvents = events.filter(
    (event: any) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(event.category)) &&
      (selectedLevels.length === 0 || selectedLevels.includes(event.level))
  );

  return (
    <div>
      <h1>Circus Classes Calendar</h1>

      {/* Category Filter */}
      <div>
        <h3>Filter by Category</h3>
        {Object.keys(categoryColors).map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Level Filter */}
      <div>
        <h3>Filter by Level</h3>
        {[
          "Beginner/Elementary",
          "Beginner & Improver/Higher Beginner",
          "Improver",
          "Improver & Intermediate",
          "Intermediate",
          "Intermediate+",
          "Advanced",
          "Mixed level/Unspecified",
        ].map((level) => (
          <label key={level}>
            <input
              type="checkbox"
              value={level}
              checked={selectedLevels.includes(level)}
              onChange={() => handleLevelChange(level)}
            />
            {level}
          </label>
        ))}
      </div>

      {/* FullCalendar Component */}
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        firstDay={1}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotDuration="00:15:00"
        slotLabelInterval="01:00"
        height={calendarHeight}
        events={filteredEvents} // Pass filtered events
        eventOverlap={false}
        slotEventOverlap={false}
      />
    </div>
  );
}

// Helper function to get the next date for a specific day
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
