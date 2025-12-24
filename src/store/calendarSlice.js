import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  resources: [
    { id: 'a', title: 'Conference Room A' },
    { id: 'b', title: 'Conference Room B' },
    { id: 'c', title: 'Meeting Room C' },
    { id: 'd', title: 'Training Room D' }
  ],
  events: [
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
    }
  }
})

export const { 
  addEvent, 
  updateEvent, 
  deleteEvent, 
  addResource, 
  updateResource, 
  deleteResource 
} = calendarSlice.actions

export default calendarSlice.reducer
