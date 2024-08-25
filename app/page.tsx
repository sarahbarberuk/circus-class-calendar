"use client";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventApi } from "@fullcalendar/core"; // Import the EventApi type from FullCalendar
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // Import tooltip styles

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
  instructor: string | null;
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

      const mappedEvents = data.classes.map((classItem: Class) => {
        let title = `${classItem.class_name} - ${classItem.school_name}, (Level: ${classItem.level_description})`;

        if (classItem.instructor) {
          title += ` - Instructor: ${classItem.instructor}`; // Append instructor if it's not null
        }

        return {
          title, // Set the title with class name, school name, level, and optional instructor
          daysOfWeek: [getDayOfWeekNumber(classItem.day_of_week)], // Recurring on specific day
          startTime: classItem.start_time, // Class start time
          endTime: classItem.end_time, // Class end time
          backgroundColor: categoryColors[classItem.category_name] || "#2196f3",
          borderColor: categoryColors[classItem.category_name] || "#2196f3",
          category: classItem.category_name,
          level: classItem.level_description,
          school: classItem.school_name,
          extendedProps: {
            location: classItem.class_location,
            instructor: classItem.instructor,
            school: classItem.school_name,
          },
        };
      });
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
        selectedCategories.includes(event.category_name)) &&
      (selectedLevels.length === 0 ||
        selectedLevels.includes(event.level_description)) &&
      (selectedSchools.length === 0 ||
        selectedSchools.includes(event.school_name))
  );

  // Function to handle event mouseover for tooltip
  const handleEventMouseEnter = ({
    el,
    event,
  }: {
    el: HTMLElement; // 'el' is a DOM element
    event: EventApi; // 'event' is a FullCalendar event
  }) => {
    tippy(el, {
      content: `${event.title}<br>${event.extendedProps.location}<br>${event.extendedProps.instructor}`,
      allowHTML: true,
      placement: "top",
    });
  };

  return (
    <div>
      <h1>Circus Classes Calendar - Brighton and nearby</h1>

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
        eventMouseEnter={handleEventMouseEnter} // Add tooltip on hover
      />

      {/* Footer */}
      <footer style={footerStyle}>
        <p>
          This website was made for free by Sarah Barber, mostly for personal
          use but I&#39ve decided to share it. I take no responsibility for the
          info being up to date! You can ask me to add extra classes if you
          already know me. Last updated 25/08/2024
        </p>
        <p>
          I want to add High Top (if someone can tell me their regular term time
          schedule).
        </p>
      </footer>
    </div>
  );
}

// Helper function to convert the day of the week to a FullCalendar day number
function getDayOfWeekNumber(dayOfWeek: string): number {
  const daysOfWeek: {
    [key in
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"]: number;
  } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  return daysOfWeek[dayOfWeek as keyof typeof daysOfWeek]; // Type-cast dayOfWeek to valid keys
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

const filterItemsWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap", // Correct value for flexWrap
  gap: "15px", // Correct gap for space between items
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

const footerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px 0",
  marginTop: "20px",
};
