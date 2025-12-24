import { Provider } from 'react-redux'
import { store } from './store/store'
import Calendar from './components/Calendar'
import EventList from './components/EventList'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <header className="app-header">
          <h1>FullCalendar Resource Timeline</h1>
          <p>Drag, drop, and resize events across resources - Powered by Redux</p>
        </header>

        <div className="calendar-section">
          <Calendar />
        </div>

        <div className="event-list-section">
          <EventList />
        </div>

        <div className="info-panel">
          <h3>Features Enabled:</h3>
          <ul>
            <li>✅ Resource Timeline Day View</li>
            <li>✅ Drag & Drop Events</li>
            <li>✅ Resize Events (from both ends)</li>
            <li>✅ Move Events Between Resources</li>
            <li>✅ Click to Select Time Slots</li>
            <li>✅ Multiple View Options</li>
            <li>✅ Redux State Management</li>
          </ul>
          
          <div className="redux-info">
            <h4>🔄 Redux Integration</h4>
            <p>Events and resources are managed through Redux store with the following actions:</p>
            <ul className="redux-actions">
              <li><code>addEvent</code> - Add new events</li>
              <li><code>updateEvent</code> - Update event details</li>
              <li><code>deleteEvent</code> - Remove events</li>
              <li><code>addResource</code> - Add new resources</li>
              <li><code>updateResource</code> - Update resources</li>
              <li><code>deleteResource</code> - Remove resources</li>
            </ul>
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default App
