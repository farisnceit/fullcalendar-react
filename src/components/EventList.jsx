import { useSelector } from 'react-redux'
import './EventList.css'

function EventList() {
  const { events, resources } = useSelector((state) => state.calendar)

  const getResourceName = (resourceId) => {
    const resource = resources.find(r => r.id === resourceId)
    return resource ? resource.title : 'Unknown'
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="event-list">
      <h3>📅 All Events ({events.length})</h3>
      <div className="event-items">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="event-item"
            style={{ borderLeftColor: event.borderColor }}
          >
            <div className="event-item-header">
              <span 
                className="event-color-dot" 
                style={{ backgroundColor: event.backgroundColor }}
              />
              <h4>{event.title}</h4>
            </div>
            <div className="event-item-details">
              <p>
                <strong>📍 Resource:</strong> {getResourceName(event.resourceId)}
              </p>
              <p>
                <strong>🕐 Start:</strong> {formatDateTime(event.start)}
              </p>
              <p>
                <strong>🕐 End:</strong> {formatDateTime(event.end)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventList
