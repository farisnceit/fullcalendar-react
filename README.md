# FullCalendar React Implementation with Redux

A modern React application featuring FullCalendar with **Resource Timeline Day View**, complete with drag-and-drop, resize functionality, and **Redux state management**.

## 🚀 Features

- ✅ **Resource Timeline Day View** - Visualize events across multiple resources (rooms, people, equipment)
- ✅ **Drag & Drop** - Move events between time slots and resources
- ✅ **Event Resizing** - Resize events from both start and end
- ✅ **Interactive Selection** - Click and drag to create new events
- ✅ **Multiple Views** - Switch between Day, Week, and Month views
- ✅ **Event Details Drawer** - Beautiful slide-up drawer with comprehensive event information
- ✅ **Redux State Management** - Centralized state with Redux Toolkit
- ✅ **Component Architecture** - Modular, reusable components
- ✅ **Real-time Updates** - Events update dynamically through Redux actions
- ✅ **Modern UI** - Beautiful gradients, smooth animations, and responsive design

## 📦 Installed Packages

```json
{
  "@fullcalendar/core": "^6.x.x",
  "@fullcalendar/react": "^6.x.x",
  "@fullcalendar/resource-timegrid": "^6.x.x",
  "@fullcalendar/interaction": "^6.x.x",
  "@fullcalendar/daygrid": "^6.x.x",
  "@reduxjs/toolkit": "^2.x.x",
  "react-redux": "^9.x.x"
}
```

## 🛠️ Installation

The project is already set up with all dependencies. If you need to reinstall:

```bash
npm install
```

## 🎯 Running the Application

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📁 Project Structure

```
fullcalendar-react/
├── src/
│   ├── components/
│   │   ├── Calendar.jsx       # FullCalendar component
│   │   ├── Calendar.css       # Calendar-specific styles
│   │   ├── EventDrawer.jsx    # Event details drawer
│   │   ├── EventDrawer.css    # Drawer styles
│   │   ├── EventList.jsx      # Event list component
│   │   └── EventList.css      # Event list styles
│   ├── store/
│   │   ├── store.js           # Redux store configuration
│   │   └── calendarSlice.js   # Calendar state slice with actions
│   ├── App.jsx                # Main app component with Provider
│   ├── App.css                # App-specific styles
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── package.json
└── vite.config.js
```

## 🔄 Redux State Management

### Store Structure

The application uses Redux Toolkit for state management with the following structure:

```javascript
{
  calendar: {
    resources: [...],  // Array of resource objects
    events: [...]      // Array of event objects
  }
}
```

### Available Actions

The calendar slice provides these actions:

- **`addEvent(event)`** - Add a new event to the calendar
- **`updateEvent(event)`** - Update an existing event (used for drag/drop and resize)
- **`deleteEvent(eventId)`** - Remove an event from the calendar
- **`addResource(resource)`** - Add a new resource
- **`updateResource(resource)`** - Update an existing resource
- **`deleteResource(resourceId)`** - Remove a resource

### Usage Example

```javascript
import { useDispatch } from "react-redux";
import { addEvent, updateEvent } from "./store/calendarSlice";

const dispatch = useDispatch();

// Add a new event
dispatch(
  addEvent({
    id: "7",
    resourceId: "a",
    title: "New Meeting",
    start: "2025-12-24T10:00:00",
    end: "2025-12-24T11:00:00",
  })
);

// Update an event
dispatch(
  updateEvent({
    id: "1",
    start: "2025-12-24T11:00:00",
    end: "2025-12-24T12:00:00",
  })
);
```

## 🎨 Key Implementation Details

### Resources

The calendar displays 4 sample resources:

- Conference Room A
- Conference Room B
- Meeting Room C
- Training Room D

### Sample Events

6 pre-configured events with different:

- Time slots
- Resource assignments
- Color schemes
- Durations

### Event Handlers

1. **handleEventDrop** - Triggered when an event is dragged to a new time/resource
2. **handleEventResize** - Triggered when an event duration is changed
3. **handleEventClick** - Shows event details on click
4. **handleDateSelect** - Creates new events by selecting time slots

### Calendar Configuration

```javascript
<FullCalendar
  plugins={[resourceTimeGridPlugin, interactionPlugin, dayGridPlugin]}
  initialView="resourceTimeGridDay"
  editable={true}
  selectable={true}
  eventResizableFromStart={true}
  nowIndicator={true}
  slotMinTime="08:00:00"
  slotMaxTime="18:00:00"
  // ... more options
/>
```

## 🎭 Customization

### Adding New Resources

Edit the `resources` state in `App.jsx`:

```javascript
const [resources] = useState([
  { id: "e", title: "Your New Resource" },
  // ... more resources
]);
```

### Adding New Events

Add to the `events` state:

```javascript
{
  id: '7',
  resourceId: 'a',
  title: 'New Event',
  start: '2025-12-24T09:00:00',
  end: '2025-12-24T10:00:00',
  backgroundColor: '#your-color',
  borderColor: '#your-border-color'
}
```

### Changing Time Range

Modify the `slotMinTime` and `slotMaxTime` props:

```javascript
slotMinTime = "06:00:00"; // Start at 6 AM
slotMaxTime = "22:00:00"; // End at 10 PM
```

## 🎨 Styling

The application uses a modern design with:

- **Gradient backgrounds** for visual appeal
- **Smooth transitions** on hover and interactions
- **Shadow effects** for depth
- **Responsive design** for mobile compatibility
- **Custom FullCalendar theme** matching the overall design

## 📚 FullCalendar Documentation

For more advanced features and customization:

- [Official Docs](https://fullcalendar.io/docs)
- [React Integration](https://fullcalendar.io/docs/react)
- [Resource Timeline](https://fullcalendar.io/docs/resource-timegrid-view)
- [Event Interaction](https://fullcalendar.io/docs/editable)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and use this implementation for your projects!

---

**Built with ❤️ using React + Vite + FullCalendar**
