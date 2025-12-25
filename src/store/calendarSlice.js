import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedDate: new Date().toISOString(), // Store as ISO string for serialization
  calendarStartTime: '00:00:00',
  calendarEndTime: '24:00:00',
  resources: [
    { id: 'a', title: 'Conference Room A', start: '08:00:00', end: '18:00:00' },
    { id: 'b', title: 'Conference Room B', start: '09:00:00', end: '17:00:00' },
    { id: 'c', title: 'Meeting Room C', start: '07:30:00', end: '19:00:00' },
    { id: 'd', title: 'Training Room D', start: '08:30:00', end: '16:30:00' }
  ],
  events: [
    // December 24, 2025
    {
      id: '1',
      resourceId: 'a',
      title: 'Team Meeting',
      start: '2025-12-24T09:00:00',
      end: '2025-12-24T10:30:00',
      backgroundColor: '#3788d8',
      borderColor: '#2c6bb3'
    },
    {
      id: '2',
      resourceId: 'b',
      title: 'Client Presentation',
      start: '2025-12-24T11:00:00',
      end: '2025-12-24T12:00:00',
      backgroundColor: '#f4511e',
      borderColor: '#d93d0f'
    },
    {
      id: '3',
      resourceId: 'a',
      title: 'Project Review',
      start: '2025-12-24T13:00:00',
      end: '2025-12-24T14:30:00',
      backgroundColor: '#0b8043',
      borderColor: '#096634'
    },
    {
      id: '4',
      resourceId: 'c',
      title: 'Training Session',
      start: '2025-12-24T10:00:00',
      end: '2025-12-24T12:00:00',
      backgroundColor: '#8e24aa',
      borderColor: '#6a1b7f'
    },
    {
      id: '5',
      resourceId: 'd',
      title: 'Workshop',
      start: '2025-12-24T14:00:00',
      end: '2025-12-24T16:00:00',
      backgroundColor: '#e67c73',
      borderColor: '#d85b52'
    },
    {
      id: '6',
      resourceId: 'b',
      title: 'Code Review',
      start: '2025-12-24T15:00:00',
      end: '2025-12-24T16:00:00',
      backgroundColor: '#f6bf26',
      borderColor: '#d4a01e'
    },
    
    // December 25, 2025
    {
      id: '7',
      resourceId: 'a',
      title: 'Christmas Planning',
      start: '2025-12-25T10:00:00',
      end: '2025-12-25T11:00:00',
      backgroundColor: '#d50000',
      borderColor: '#a00000'
    },
    {
      id: '8',
      resourceId: 'b',
      title: 'Holiday Celebration',
      start: '2025-12-25T14:00:00',
      end: '2025-12-25T16:00:00',
      backgroundColor: '#0b8043',
      borderColor: '#096634'
    },
    
    // December 26, 2025
    {
      id: '9',
      resourceId: 'a',
      title: 'Sprint Planning',
      start: '2025-12-26T09:00:00',
      end: '2025-12-26T10:30:00',
      backgroundColor: '#3788d8',
      borderColor: '#2c6bb3'
    },
    {
      id: '10',
      resourceId: 'c',
      title: 'Design Review',
      start: '2025-12-26T11:00:00',
      end: '2025-12-26T12:30:00',
      backgroundColor: '#8e24aa',
      borderColor: '#6a1b7f'
    },
    {
      id: '11',
      resourceId: 'b',
      title: 'Stakeholder Meeting',
      start: '2025-12-26T13:00:00',
      end: '2025-12-26T14:00:00',
      backgroundColor: '#f4511e',
      borderColor: '#d93d0f'
    },
    {
      id: '12',
      resourceId: 'd',
      title: 'Tech Talk',
      start: '2025-12-26T15:00:00',
      end: '2025-12-26T16:30:00',
      backgroundColor: '#e67c73',
      borderColor: '#d85b52'
    },
    
    // December 27, 2025
    {
      id: '13',
      resourceId: 'a',
      title: 'Daily Standup',
      start: '2025-12-27T09:00:00',
      end: '2025-12-27T09:30:00',
      backgroundColor: '#0b8043',
      borderColor: '#096634'
    },
    {
      id: '14',
      resourceId: 'b',
      title: 'Product Demo',
      start: '2025-12-27T10:00:00',
      end: '2025-12-27T11:30:00',
      backgroundColor: '#f6bf26',
      borderColor: '#d4a01e'
    },
    {
      id: '15',
      resourceId: 'c',
      title: 'Architecture Discussion',
      start: '2025-12-27T13:00:00',
      end: '2025-12-27T15:00:00',
      backgroundColor: '#8e24aa',
      borderColor: '#6a1b7f'
    },
    {
      id: '16',
      resourceId: 'd',
      title: 'Team Building',
      start: '2025-12-27T15:30:00',
      end: '2025-12-27T17:00:00',
      backgroundColor: '#3788d8',
      borderColor: '#2c6bb3'
    },
    
    // December 28, 2025
    {
      id: '17',
      resourceId: 'a',
      title: 'Quarterly Review',
      start: '2025-12-28T09:00:00',
      end: '2025-12-28T11:00:00',
      backgroundColor: '#f4511e',
      borderColor: '#d93d0f'
    },
    {
      id: '18',
      resourceId: 'b',
      title: 'Budget Planning',
      start: '2025-12-28T11:30:00',
      end: '2025-12-28T13:00:00',
      backgroundColor: '#0b8043',
      borderColor: '#096634'
    },
    {
      id: '19',
      resourceId: 'c',
      title: 'Performance Review',
      start: '2025-12-28T14:00:00',
      end: '2025-12-28T15:30:00',
      backgroundColor: '#8e24aa',
      borderColor: '#6a1b7f'
    },
    {
      id: '20',
      resourceId: 'd',
      title: 'Year-End Wrap Up',
      start: '2025-12-28T16:00:00',
      end: '2025-12-28T17:30:00',
      backgroundColor: '#e67c73',
      borderColor: '#d85b52'
    }
  ]
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload)
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(event => event.id === action.payload.id)
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...action.payload }
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload)
    },
    addResource: (state, action) => {
      state.resources.push(action.payload)
    },
    updateResource: (state, action) => {
      const index = state.resources.findIndex(resource => resource.id === action.payload.id)
      if (index !== -1) {
        state.resources[index] = { ...state.resources[index], ...action.payload }
      }
    },
    deleteResource: (state, action) => {
      state.resources = state.resources.filter(resource => resource.id !== action.payload)
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload // Expects ISO string
    },
    setCalendarTime: (state, action) => {
      state.calendarStartTime = action.payload.start
      state.calendarEndTime = action.payload.end
    }
  }
})

export const { 
  addEvent, 
  updateEvent, 
  deleteEvent, 
  addResource, 
  updateResource, 
  deleteResource,
  setSelectedDate,
  setCalendarTime
} = calendarSlice.actions

export default calendarSlice.reducer
