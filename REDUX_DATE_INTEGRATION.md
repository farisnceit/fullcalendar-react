# Redux Integration for Selected Date

## Overview

The `selectedDate` is now stored in the Redux store instead of local component state. This provides centralized state management and allows other components to access and modify the current calendar date.

## Changes Made

### 1. Redux Store Updates (`src/store/calendarSlice.js`)

#### Added to Initial State

```javascript
const initialState = {
  selectedDate: new Date().toISOString(), // Store as ISO string for serialization
  resources: [...],
  events: [...]
}
```

**Why ISO String?**

- Redux requires serializable state
- ISO strings can be easily stored and transmitted
- Prevents issues with Date object serialization
- Format: `"2025-12-24T14:10:41.000Z"`

#### New Action: `setSelectedDate`

```javascript
setSelectedDate: (state, action) => {
  state.selectedDate = action.payload; // Expects ISO string
};
```

#### Exported Action

```javascript
export const {
  addEvent,
  updateEvent,
  deleteEvent,
  addResource,
  updateResource,
  deleteResource,
  setSelectedDate, // ← New action
} = calendarSlice.actions;
```

### 2. Calendar Component Updates (`src/components/Calendar.jsx`)

#### Import the Action

```javascript
import { updateEvent, addEvent, setSelectedDate } from "../store/calendarSlice";
```

#### Access from Redux Store

```javascript
const { resources, events, selectedDate } = useSelector(
  (state) => state.calendar
);
```

#### Convert to Date Object

```javascript
// Convert selectedDate from ISO string to Date object
const currentDate = useMemo(() => new Date(selectedDate), [selectedDate]);
```

**Why useMemo?**

- Prevents unnecessary Date object creation
- Only recalculates when `selectedDate` changes
- Improves performance

#### Dispatch Redux Action

```javascript
const goToDate = (date) => {
  dispatch(setSelectedDate(date.toISOString())); // ← Dispatch to Redux
  if (calendarRef.current) {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);
  }
};
```

## Benefits of Redux Integration

### 1. **Centralized State Management**

- Single source of truth for the selected date
- Consistent across all components
- Easy to debug with Redux DevTools

### 2. **Component Communication**

Other components can now:

```javascript
// Read the selected date
const { selectedDate } = useSelector((state) => state.calendar);

// Update the selected date
dispatch(setSelectedDate(new Date("2025-12-25").toISOString()));
```

### 3. **Persistence Ready**

Easy to add persistence:

```javascript
// Save to localStorage
localStorage.setItem("selectedDate", selectedDate);

// Load from localStorage
const savedDate = localStorage.getItem("selectedDate");
if (savedDate) {
  dispatch(setSelectedDate(savedDate));
}
```

### 4. **Time Travel Debugging**

With Redux DevTools, you can:

- See all date changes
- Replay date selections
- Debug date-related issues

### 5. **Testability**

```javascript
// Easy to test Redux actions
import { setSelectedDate } from "./calendarSlice";

test("setSelectedDate updates the date", () => {
  const newDate = "2025-12-25T00:00:00.000Z";
  const action = setSelectedDate(newDate);
  const newState = calendarReducer(initialState, action);
  expect(newState.selectedDate).toBe(newDate);
});
```

## Usage Examples

### Example 1: Navigate to Specific Date

```javascript
import { useDispatch } from "react-redux";
import { setSelectedDate } from "../store/calendarSlice";

function DatePicker() {
  const dispatch = useDispatch();

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(date.toISOString()));
  };

  return (
    <input
      type="date"
      onChange={(e) => handleDateSelect(new Date(e.target.value))}
    />
  );
}
```

### Example 2: Display Current Date in Another Component

```javascript
import { useSelector } from "react-redux";

function DateDisplay() {
  const { selectedDate } = useSelector((state) => state.calendar);
  const date = new Date(selectedDate);

  return <div>Current Date: {date.toLocaleDateString()}</div>;
}
```

### Example 3: Filter Events by Selected Date

```javascript
import { useSelector } from "react-redux";

function EventList() {
  const { events, selectedDate } = useSelector((state) => state.calendar);

  const todaysEvents = events.filter((event) => {
    const eventDate = new Date(event.start);
    const selected = new Date(selectedDate);
    return eventDate.toDateString() === selected.toDateString();
  });

  return (
    <ul>
      {todaysEvents.map((event) => (
        <li key={event.id}>{event.title}</li>
      ))}
    </ul>
  );
}
```

## State Structure

```javascript
{
  calendar: {
    selectedDate: "2025-12-24T14:10:41.000Z",  // ISO string
    resources: [
      { id: 'a', title: 'Conference Room A' },
      // ...
    ],
    events: [
      {
        id: '1',
        title: 'Team Meeting',
        start: '2025-12-24T09:00:00',
        // ...
      },
      // ...
    ]
  }
}
```

## Redux DevTools

With Redux DevTools, you can see:

```
Action: calendar/setSelectedDate
Payload: "2025-12-25T00:00:00.000Z"

Diff:
- selectedDate: "2025-12-24T14:10:41.000Z"
+ selectedDate: "2025-12-25T00:00:00.000Z"
```

## Migration Notes

### Before (Local State)

```javascript
const [currentDate, setCurrentDate] = useState(new Date());

const goToDate = (date) => {
  setCurrentDate(date); // Local state
  // ...
};
```

### After (Redux State)

```javascript
const { selectedDate } = useSelector((state) => state.calendar);
const currentDate = useMemo(() => new Date(selectedDate), [selectedDate]);

const goToDate = (date) => {
  dispatch(setSelectedDate(date.toISOString())); // Redux action
  // ...
};
```

## Best Practices

### 1. Always Store as ISO String

```javascript
// ✅ Good
dispatch(setSelectedDate(new Date().toISOString()));

// ❌ Bad - Date objects are not serializable
dispatch(setSelectedDate(new Date()));
```

### 2. Convert to Date Object in Component

```javascript
// ✅ Good - Use useMemo for performance
const currentDate = useMemo(() => new Date(selectedDate), [selectedDate]);

// ❌ Bad - Creates new Date object on every render
const currentDate = new Date(selectedDate);
```

### 3. Use Selectors for Derived Data

```javascript
// ✅ Good - Create a selector
const selectFormattedDate = (state) => {
  const date = new Date(state.calendar.selectedDate);
  return date.toLocaleDateString();
};

const formattedDate = useSelector(selectFormattedDate);
```

## Future Enhancements

### 1. Add Date Range Selection

```javascript
const initialState = {
  selectedDate: new Date().toISOString(),
  dateRange: {
    start: null,
    end: null,
  },
  // ...
};
```

### 2. Add Date History

```javascript
const initialState = {
  selectedDate: new Date().toISOString(),
  dateHistory: [], // Track previously viewed dates
  // ...
};
```

### 3. Add View Type

```javascript
const initialState = {
  selectedDate: new Date().toISOString(),
  viewType: "day", // 'day', 'week', 'month'
  // ...
};
```

## Testing

### Test Redux Action

```javascript
import calendarReducer, { setSelectedDate } from "./calendarSlice";

describe("setSelectedDate", () => {
  it("should update selectedDate", () => {
    const initialState = {
      selectedDate: "2025-12-24T00:00:00.000Z",
      resources: [],
      events: [],
    };

    const newDate = "2025-12-25T00:00:00.000Z";
    const action = setSelectedDate(newDate);
    const newState = calendarReducer(initialState, action);

    expect(newState.selectedDate).toBe(newDate);
  });
});
```

### Test Component Integration

```javascript
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Calendar from "./Calendar";
import calendarReducer from "../store/calendarSlice";

test("displays selected date", () => {
  const store = configureStore({
    reducer: { calendar: calendarReducer },
  });

  render(
    <Provider store={store}>
      <Calendar />
    </Provider>
  );

  // Assert date is displayed
});
```

## Summary

✅ **selectedDate is now in Redux store**
✅ **Stored as ISO string for serialization**
✅ **Accessible from any component**
✅ **Easy to persist and debug**
✅ **Follows Redux best practices**

---

**Status**: ✅ Complete
**Version**: 2.0.0
**Last Updated**: December 24, 2025
