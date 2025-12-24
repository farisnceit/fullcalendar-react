import { useState, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import scrollgridPlugin from '@fullcalendar/scrollgrid'
import enLocale from '@fullcalendar/core/locales/en-gb'
import deLocale from '@fullcalendar/core/locales/de'
import itLocale from '@fullcalendar/core/locales/it'
import frLocale from '@fullcalendar/core/locales/fr'
import { updateEvent, addEvent, setSelectedDate } from '../store/calendarSlice'
import EventDrawer from './EventDrawer'
import './Calendar.css'

// Time constants
const TIME_CONSTANTS = {
  START_OF_DAY: '00:00:00',
  END_OF_DAY: '24:00:00',
  START_OF_DAY_15_MINUTE_MARK: '00:15:00'
}

function Calendar() {
  const dispatch = useDispatch()
  const { resources, events, selectedDate } = useSelector((state) => state.calendar)
  
  // Refs and state
  const calendarRef = useRef(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('en-gb')
  const [calendarTime, setCalendarTime] = useState({
    start: TIME_CONSTANTS.START_OF_DAY,
    end: TIME_CONSTANTS.END_OF_DAY
  })
  const [isLoading, setIsLoading] = useState(false)

  // Convert selectedDate from ISO string to Date object
  const currentDate = useMemo(() => new Date(selectedDate), [selectedDate])

  // Memoize events to prevent unnecessary re-renders
  const stableEvents = useMemo(() => events, [events])

  // Date navigation functions
  const goToDate = (date) => {
    dispatch(setSelectedDate(date.toISOString()))
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      calendarApi.gotoDate(date)
    }
  }

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    goToDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    goToDate(newDate)
  }

  const goToToday = () => {
    goToDate(new Date())
  }

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    goToDate(selectedDate)
  }

  // Format date for input
  const formatDateForInput = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Format date for display
  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
  const handleTimeSelect = (selectInfo) => {
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

  // Handle dates set (when calendar view changes)
  const handleDatesSet = (dateInfo) => {
    console.log('Calendar dates changed:', {
      start: dateInfo.start,
      end: dateInfo.end,
      view: dateInfo.view.type
    })
  }

  // Render custom event content
  const renderEventContent = (eventInfo) => {
    return (
      <div className="custom-event-content">
        <div className="event-time">
          {eventInfo.timeText}
        </div>
        <div className="event-title">
          {eventInfo.event.title}
        </div>
      </div>
    )
  }

  // Get event class names
  const getEventClassName = (arg) => {
    const classNames = ['custom-event']
    // Add any custom logic for additional class names
    return classNames
  }

  return (
    <>
      <div className="date-selector-strip">
        <div className="date-display">
          <h2>{formatDateForDisplay(currentDate)}</h2>
        </div>
        
        <div className="date-controls">
          <button 
            className="date-nav-btn" 
            onClick={goToPreviousDay}
            title="Previous Day"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            className="today-btn" 
            onClick={goToToday}
          >
            Today
          </button>
          
          <button 
            className="date-nav-btn" 
            onClick={goToNextDay}
            title="Next Day"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          <input
            type="date"
            className="date-picker"
            value={formatDateForInput(currentDate)}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[resourceTimeGridPlugin, interactionPlugin, scrollgridPlugin]}
          headerToolbar={{
            center: "",
            left: "",
            right: "",
          }}
          scrollTimeReset={false}
          eventClassNames={getEventClassName}
          ref={calendarRef}
          aspectRatio={1.5}
          locale={selectedLanguage}
          locales={[enLocale, deLocale, itLocale, frLocale]}
          themeSystem="bootstrap5"
          eventOverlap={false}
          selectOverlap={false}
          timeZone="local"
          allDaySlot={false}
          datesSet={handleDatesSet}
          slotDuration={TIME_CONSTANTS.START_OF_DAY_15_MINUTE_MARK}
          snapDuration={TIME_CONSTANTS.START_OF_DAY_15_MINUTE_MARK}
          slotMinTime={calendarTime.start || TIME_CONSTANTS.START_OF_DAY}
          slotMaxTime={calendarTime.end || TIME_CONSTANTS.END_OF_DAY}
          slotLabelFormat={{
            hour: "2-digit",
            hour12: false,
            minute: "2-digit",
          }}
          nowIndicator={true}
          initialView="resourceTimeGridDay"
          height={"500px"}
          resources={isLoading ? [] : resources}
          editable={true}
          selectable={true}
          selectMirror={true}
          unselectAuto={true}
          longPressDelay={200}
          selectLongPressDelay={200}
          eventResizableFromStart={true}
          dayMaxEvents={true}
          weekends={true}
          events={stableEvents}
          select={handleTimeSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          dayMinWidth={200}
          eventResize={handleEventResize}
          eventDrop={handleEventDrop}
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
