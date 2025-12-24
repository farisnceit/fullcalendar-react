import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import { updateEvent, addEvent } from '../store/calendarSlice'
import EventDrawer from './EventDrawer'
import './Calendar.css'

function Calendar() {
  const dispatch = useDispatch()
  const { resources, events } = useSelector((state) => state.calendar)
  
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState(null)

  // Handle event drop (drag and drop)
  const handleEventDrop = (info) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end?.toISOString(),
      resourceId: info.event.getResources()[0]?.id,
      backgroundColor: info.event.backgroundColor,
      borderColor: info.event.borderColor
    }

    dispatch(updateEvent(updatedEvent))

    console.log('Event dropped:', {
      title: info.event.title,
      newStart: info.event.start,
      newEnd: info.event.end,
      newResource: info.event.getResources()[0]?.title
    })
  }

  // Handle event resize
  const handleEventResize = (info) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end?.toISOString(),
      resourceId: info.event.getResources()[0]?.id,
      backgroundColor: info.event.backgroundColor,
      borderColor: info.event.borderColor
    }

    dispatch(updateEvent(updatedEvent))

    console.log('Event resized:', {
      title: info.event.title,
      newStart: info.event.start,
      newEnd: info.event.end
    })
  }

  // Handle event click
  const handleEventClick = (info) => {
    setSelectedEventId(info.event.id)
    setIsDrawerOpen(true)
  }

  // Handle drawer close
  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setTimeout(() => setSelectedEventId(null), 300) // Clear after animation
  }

  // Handle date select (for creating new events)
  const handleDateSelect = (selectInfo) => {
    const title = prompt('Please enter a title for the event:')
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      const newEvent = {
        id: String(Date.now()), // Generate unique ID
        title,
        start: selectInfo.start.toISOString(),
        end: selectInfo.end.toISOString(),
        resourceId: selectInfo.resource?.id || 'a',
        backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16)
      }

      dispatch(addEvent(newEvent))
    }
  }

  return (
    <>
      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[resourceTimeGridPlugin, interactionPlugin, dayGridPlugin]}
          initialView="resourceTimeGridDay"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimeGridDay,resourceTimeGridWeek,dayGridMonth'
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
          height="500px"
          resourceAreaHeaderContent="Resources"
          resourceAreaWidth="15%"
          slotDuration="00:30:00"
          slotLabelInterval="01:00"
          eventResizableFromStart={true}
          nowIndicator={true}
        />
      </div>

      <EventDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        eventId={selectedEventId}
      />
    </>
  )
}

export default Calendar
