import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./App.css";

function App() {
  // Sample resources (e.g., rooms, people, equipment)
  const [resources] = useState([
    { id: "a", title: "Conference Room A" },
    { id: "b", title: "Conference Room B" },
    { id: "c", title: "Meeting Room C" },
    { id: "d", title: "Training Room D" },
  ]);

  // Sample events with resource assignments
  const [events, setEvents] = useState([
    {
      id: "1",
      resourceId: "a",
      title: "Team Meeting",
      start: "2025-12-24T09:00:00",
      end: "2025-12-24T10:30:00",
      backgroundColor: "#3788d8",
      borderColor: "#2c6bb3",
    },
    {
      id: "2",
      resourceId: "b",
      title: "Client Presentation",
      start: "2025-12-24T11:00:00",
      end: "2025-12-24T12:00:00",
      backgroundColor: "#f4511e",
      borderColor: "#d93d0f",
    },
    {
      id: "3",
      resourceId: "a",
      title: "Project Review",
      start: "2025-12-24T13:00:00",
      end: "2025-12-24T14:30:00",
      backgroundColor: "#0b8043",
      borderColor: "#096634",
    },
    {
      id: "4",
      resourceId: "c",
      title: "Training Session",
      start: "2025-12-24T10:00:00",
      end: "2025-12-24T12:00:00",
      backgroundColor: "#8e24aa",
      borderColor: "#6a1b7f",
    },
    {
      id: "5",
      resourceId: "d",
      title: "Workshop",
      start: "2025-12-24T14:00:00",
      end: "2025-12-24T16:00:00",
      backgroundColor: "#e67c73",
      borderColor: "#d85b52",
    },
    {
      id: "6",
      resourceId: "b",
      title: "Code Review",
      start: "2025-12-24T15:00:00",
      end: "2025-12-24T16:00:00",
      backgroundColor: "#f6bf26",
      borderColor: "#d4a01e",
    },
  ]);

  // Handle event drop (drag and drop)
  const handleEventDrop = (info) => {
    const updatedEvent = {
      ...info.event.toPlainObject(),
      start: info.event.start,
      end: info.event.end,
      resourceId: info.event.getResources()[0]?.id,
    };

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === info.event.id ? updatedEvent : event
      )
    );

    console.log("Event dropped:", {
      title: info.event.title,
      newStart: info.event.start,
      newEnd: info.event.end,
      newResource: info.event.getResources()[0]?.title,
    });
  };

  // Handle event resize
  const handleEventResize = (info) => {
    const updatedEvent = {
      ...info.event.toPlainObject(),
      start: info.event.start,
      end: info.event.end,
    };

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === info.event.id ? updatedEvent : event
      )
    );

    console.log("Event resized:", {
      title: info.event.title,
      newStart: info.event.start,
      newEnd: info.event.end,
    });
  };

  // Handle event click
  const handleEventClick = (info) => {
    alert(
      `Event: ${info.event.title}\nStart: ${info.event.start}\nEnd: ${info.event.end}`
    );
  };

  // Handle date select (for creating new events)
  const handleDateSelect = (selectInfo) => {
    const title = prompt("Please enter a title for the event:");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEvent = {
        id: String(events.length + 1),
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        resourceId: selectInfo.resource?.id || "a",
        backgroundColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16),
      };

      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>FullCalendar Resource Timeline</h1>
        <p>Drag, drop, and resize events across resources</p>
      </header>

      <div className="calendar-container">
        <FullCalendar
          plugins={[resourceTimeGridPlugin, interactionPlugin, dayGridPlugin]}
          initialView="resourceTimeGridDay"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "resourceTimeGridDay,resourceTimeGridWeek,dayGridMonth",
          }}
          resources={resources}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          eventClick={handleEventClick}
          select={handleDateSelect}
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
          height="auto"
          resourceAreaHeaderContent="Resources"
          resourceAreaWidth="15%"
          slotDuration="00:30:00"
          slotLabelInterval="01:00"
          eventResizableFromStart={true}
          nowIndicator={true}
        />
      </div>

      <div className="info-panel">
        <h3>Features Enabled:</h3>
        <ul>
          <li>✅ Resource Timeline Day View</li>
          <li>✅ Drag & Drop Events</li>
          <li>✅ Resize Events (from both ends)</li>
          <li>✅ Move Events Between Resources</li>
          <li>✅ Click to Select Time Slots</li>
          <li>✅ Multiple View Options</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
