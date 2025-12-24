import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from './calendarSlice'

export const store = configureStore({
  reducer: {
    calendar: calendarReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for date serialization
        ignoredActions: ['calendar/addEvent', 'calendar/updateEvent'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.start', 'payload.end'],
        // Ignore these paths in the state
        ignoredPaths: ['calendar.events']
      }
    })
})
