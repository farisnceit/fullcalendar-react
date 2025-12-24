import { useSelector } from 'react-redux'
import './EventDrawer.css'

function EventDrawer({ isOpen, onClose, eventId }) {
  const { events, resources } = useSelector((state) => state.calendar)
  
  if (!eventId) return null
  
  const event = events.find(e => e.id === eventId)
  if (!event) return null

  const resource = resources.find(r => r.id === event.resourceId)

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateDuration = () => {
    const start = new Date(event.start)
    const end = new Date(event.end)
    const diffMs = end - start
    const diffMins = Math.floor(diffMs / 60000)
    const hours = Math.floor(diffMins / 60)
    const minutes = diffMins % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`event-drawer ${isOpen ? 'open' : ''}`}>
        {/* Handle Bar */}
        <div className="drawer-handle">
          <div className="handle-bar"></div>
        </div>

        {/* Header */}
        <div className="drawer-header">
          <div className="event-color-indicator" style={{ backgroundColor: event.backgroundColor }}></div>
          <h2>{event.title}</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {/* Time Section */}
          <div className="info-section">
            <div className="info-icon">🕐</div>
            <div className="info-details">
              <h3>Time</h3>
              <p className="time-range">
                {formatTime(event.start)} - {formatTime(event.end)}
              </p>
              <p className="date-info">{formatDateTime(event.start).split(',')[0]}, {formatDateTime(event.start).split(',')[1]}</p>
            </div>
          </div>

          {/* Duration Section */}
          <div className="info-section">
            <div className="info-icon">⏱️</div>
            <div className="info-details">
              <h3>Duration</h3>
              <p>{calculateDuration()}</p>
            </div>
          </div>

          {/* Resource Section */}
          <div className="info-section">
            <div className="info-icon">📍</div>
            <div className="info-details">
              <h3>Resource</h3>
              <p>{resource?.title || 'Unknown'}</p>
            </div>
          </div>

          {/* Event ID Section */}
          <div className="info-section">
            <div className="info-icon">🔖</div>
            <div className="info-details">
              <h3>Event ID</h3>
              <p className="event-id">{event.id}</p>
            </div>
          </div>

          {/* Color Info */}
          <div className="info-section">
            <div className="info-icon">🎨</div>
            <div className="info-details">
              <h3>Color</h3>
              <div className="color-swatches">
                <div className="color-swatch">
                  <div className="swatch" style={{ backgroundColor: event.backgroundColor }}></div>
                  <span>Background</span>
                </div>
                <div className="color-swatch">
                  <div className="swatch" style={{ backgroundColor: event.borderColor }}></div>
                  <span>Border</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="drawer-actions">
            <button className="action-button edit-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Event
            </button>
            <button className="action-button delete-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDrawer
