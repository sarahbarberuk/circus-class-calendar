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
  level_description: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Class[]>([]);
  const [calendarHeight, setCalendarHeight] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // For filtering categories
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]); // For filtering levels
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]); // For filtering schools

  useEffect(() => {
    const newHeight = window.innerHeight * 0.9;
    setCalendarHeight(newHeight);

    async function fetchData() {
      const response = await fetch("/api/classes");
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
        category: classItem.category_name,
        level: classItem.level_description,
        school: classItem.school_name, // Add school for filtering
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

  const handleSchoolChange = (school: string) => {
    if (selectedSchools.includes(school)) {
      setSelectedSchools(selectedSchools.filter((s) => s !== school));
    } else {
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  // Filter events based on selected categories, levels, and schools
  const filteredEvents = events.filter(
    (event) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(event.category)) &&
      (selectedLevels.length === 0 || selectedLevels.includes(event.level)) &&
      (selectedSchools.length === 0 || selectedSchools.includes(event.school))
  );

  return (
    <div>
      <h1>Circus Classes Calendar</h1>

      {/* Filter Container */}
      <div style={filterBoxStyle}>
        <div style={filterGroupWrapperStyle}>
          {/* Category Filter */}
          <div style={filterGroupStyle}>
            <h3 style={headingStyle}>Filter by Category</h3>
            <div style={filterItemsWrapperStyle}>
              {Object.keys(categoryColors).map((category) => (
                <label key={category} style={filterItemStyle}>
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    style={checkboxStyle}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div style={filterGroupStyle}>
            <h3 style={headingStyle}>Filter by Level</h3>
            <div style={filterItemsWrapperStyle}>
              {[
                "Beginner/Elementary",
                "Beginner & Improver/Higher Beginner",
                "Improver",
                "Improver & Intermediate",
                "Intermediate",
                "Intermediate+",
                "Advanced",
                "Mixed level or unspecified",
              ].map((level) => (
                <label key={level} style={filterItemStyle}>
                  <input
                    type="checkbox"
                    value={level}
                    checked={selectedLevels.includes(level)}
                    onChange={() => handleLevelChange(level)}
                    style={checkboxStyle}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          {/* School Filter */}
          <div style={filterGroupStyle}>
            <h3 style={headingStyle}>Filter by School</h3>
            <div style={filterItemsWrapperStyle}>
              {[
                "Blue Moon",
                "Brighton Aerial Arts",
                "Brighton Gymnastics",
                "Calisthenics Brighton",
                "Energy for life",
                "Fun Abounds",
                "Gemini Pole",
                "Joe Wilcox",
                "Lauren acroyoga",
                "The Pole Lab",
                "Smikle Dance",
                "South East Dance",
                "Studio 4 All Dance",
                "The Circus Project",
                "Wickers Gymnastics",
              ].map((school) => (
                <label key={school} style={filterItemStyle}>
                  <input
                    type="checkbox"
                    value={school}
                    checked={selectedSchools.includes(school)}
                    onChange={() => handleSchoolChange(school)}
                    style={checkboxStyle}
                  />
                  {school}
                </label>
              ))}
            </div>
          </div>
        </div>
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
        events={filteredEvents}
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
  return nextDate.toISOString().split("T")[0];
}

// Inline styles
const filterBoxStyle = {
  backgroundColor: "#f0f0f0",
  padding: "10px 20px",
  borderRadius: "8px",
  marginBottom: "20px",
  border: "1px solid #ccc",
};

const filterGroupWrapperStyle = {
  display: "flex", // Align categories and levels side by side
  justifyContent: "space-between", // Ensure proper spacing between filter groups
};

const filterGroupStyle = {
  flex: 1, // Allow equal width for both groups
  marginRight: "20px", // Add space between the category and level groups
};

const filterItemsWrapperStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px", // Add horizontal space between items
};

const filterItemStyle = {
  display: "flex",
  alignItems: "center",
};

const checkboxStyle = {
  marginRight: "5px",
};

const headingStyle = {
  marginBottom: "5px",
};
