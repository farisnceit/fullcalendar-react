# Redux Integration Guide

## Overview

This FullCalendar application uses **Redux Toolkit** for centralized state management. All events and resources are stored in the Redux store, making it easy to manage, update, and share state across components.

## Architecture

### 1. Store Configuration (`src/store/store.js`)

The Redux store is configured with:

- **Calendar reducer** - Manages events and resources
- **Middleware configuration** - Handles date serialization for FullCalendar

### 2. Calendar Slice (`src/store/calendarSlice.js`)

Contains:

- **Initial state** with sample events and resources
- **Reducers** for CRUD operations
- **Actions** exported for use in components

### 3. Calendar Component (`src/components/Calendar.jsx`)

- Uses `useSelector` to read state from Redux
- Uses `useDispatch` to dispatch actions
- Handles all FullCalendar interactions

### 4. App Component (`src/App.jsx`)

- Wraps the app with Redux `Provider`
- Renders the Calendar component

## How It Works

### Reading State

```javascript
import { useSelector } from "react-redux";

const { resources, events } = useSelector((state) => state.calendar);
```

### Dispatching Actions

```javascript
import { useDispatch } from "react-redux";
import { addEvent, updateEvent } from "../store/calendarSlice";

const dispatch = useDispatch();

// Add event
dispatch(addEvent(newEvent));

// Update event
dispatch(updateEvent(updatedEvent));
```

## Event Flow

### 1. Drag & Drop Event

```
User drags event → handleEventDrop() → dispatch(updateEvent()) → Redux updates state → Calendar re-renders
```

### 2. Resize Event

```
User resizes event → handleEventResize() → dispatch(updateEvent()) → Redux updates state → Calendar re-renders
```

### 3. Create Event

```
User selects time slot → handleDateSelect() → dispatch(addEvent()) → Redux updates state → Calendar re-renders
```

## Benefits of Redux

1. **Centralized State** - Single source of truth for all calendar data
2. **Predictable Updates** - All state changes go through reducers
3. **Easy Testing** - Actions and reducers are pure functions
4. **DevTools Support** - Time-travel debugging with Redux DevTools
5. **Scalability** - Easy to add new features and state slices
6. **Component Decoupling** - Components don't need to pass props deeply

## Adding New Features

### Add a New Action

1. Open `src/store/calendarSlice.js`
2. Add a new reducer:

```javascript
reducers: {
  // ... existing reducers
  duplicateEvent: (state, action) => {
    const eventToDuplicate = state.events.find((e) => e.id === action.payload);
    if (eventToDuplicate) {
      const newEvent = {
        ...eventToDuplicate,
        id: String(Date.now()),
      };
      state.events.push(newEvent);
    }
  };
}
```

3. Export the action:

```javascript
export const {
  addEvent,
  updateEvent,
  deleteEvent,
  duplicateEvent, // Add this
} = calendarSlice.actions;
```

4. Use in component:

```javascript
import { duplicateEvent } from "../store/calendarSlice";

dispatch(duplicateEvent(eventId));
```

## Redux DevTools

Install the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) to:

- Inspect state changes
- Time-travel through actions
- Debug state updates
- Export/import state

## Best Practices

1. **Keep reducers pure** - No side effects in reducers
2. **Use action creators** - Always use the exported actions
3. **Normalize state** - Keep data flat when possible
4. **Use selectors** - Create reusable selectors for complex state queries
5. **Handle async with thunks** - Use createAsyncThunk for API calls

## Example: Adding API Integration

```javascript
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk(
  "calendar/fetchEvents",
  async () => {
    const response = await fetch("/api/events");
    return response.json();
  }
);

// In slice
extraReducers: (builder) => {
  builder.addCase(fetchEvents.fulfilled, (state, action) => {
    state.events = action.payload;
  });
};
```

## Troubleshooting

### Issue: Date serialization warnings

**Solution**: Already handled in store configuration with `serializableCheck` middleware settings.

### Issue: State not updating

**Solution**: Make sure you're dispatching actions, not mutating state directly.

### Issue: Component not re-rendering

**Solution**: Verify you're using `useSelector` correctly and the state path is correct.

---

**Happy coding with Redux! 🚀**
