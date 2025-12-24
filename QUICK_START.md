# Quick Start Guide

## 🚀 Running the Application

The application is **already running** at: `http://localhost:5173`

If you need to restart:

```bash
npm run dev
```

## 📖 What You Can Do

### 1. **Drag Events**

- Click and hold any event
- Drag to a new time slot or different resource
- Release to update

### 2. **Resize Events**

- Hover over event edges
- Drag the edge to resize
- Works from both start and end

### 3. **Create Events**

- Click and drag on empty time slots
- Enter event title in the prompt
- Event is added automatically

### 4. **Switch Views**

- Click buttons in top-right:
  - `resourceTimeGridDay` - Day view with resources
  - `resourceTimeGridWeek` - Week view with resources
  - `dayGridMonth` - Month view

### 5. **Navigate Dates**

- `prev` / `next` - Navigate through dates
- `today` - Jump to today

## 🔧 Key Files to Modify

### Add/Modify Events

**File:** `src/store/calendarSlice.js`
**Line:** 7-60 (events array)

```javascript
events: [
  {
    id: "7", // Unique ID
    resourceId: "a", // Which resource
    title: "Your Event",
    start: "2025-12-24T09:00:00",
    end: "2025-12-24T10:00:00",
    backgroundColor: "#3788d8",
    borderColor: "#2c6bb3",
  },
];
```

### Add/Modify Resources

**File:** `src/store/calendarSlice.js`
**Line:** 3-8 (resources array)

```javascript
resources: [{ id: "e", title: "Your New Resource" }];
```

### Customize Calendar Settings

**File:** `src/components/Calendar.jsx`
**Lines:** 80-110 (FullCalendar props)

```javascript
slotMinTime = "08:00:00"; // Start time
slotMaxTime = "18:00:00"; // End time
slotDuration = "00:30:00"; // Time slot duration
```

## 📚 Documentation Files

| File                        | Purpose                   |
| --------------------------- | ------------------------- |
| `README.md`                 | Main documentation        |
| `REDUX_GUIDE.md`            | Redux integration details |
| `REDUX_FLOW_DIAGRAM.md`     | Visual diagrams           |
| `IMPLEMENTATION_SUMMARY.md` | Complete feature list     |
| `QUICK_START.md`            | This file                 |

## 🎨 Customizing Styles

### Calendar Colors

**File:** `src/components/Calendar.css`

### App Layout

**File:** `src/App.css`

### Global Styles

**File:** `src/index.css`

## 🔄 Redux Actions Quick Reference

```javascript
import { useDispatch } from 'react-redux'
import { addEvent, updateEvent, deleteEvent } from './store/calendarSlice'

const dispatch = useDispatch()

// Add event
dispatch(addEvent({ id: '7', title: 'Meeting', ... }))

// Update event
dispatch(updateEvent({ id: '1', start: '10:00', ... }))

// Delete event
dispatch(deleteEvent('1'))
```

## 🐛 Troubleshooting

### Calendar not showing?

- Check browser console for errors
- Verify dev server is running
- Check `http://localhost:5173`

### Events not updating?

- Open Redux DevTools
- Check if actions are dispatched
- Verify state is updating

### Styling issues?

- Clear browser cache
- Check CSS files are imported
- Verify HMR is working

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## 🎯 Next Steps

1. ✅ Application is running
2. ✅ Redux is configured
3. ✅ Sample data is loaded
4. 🎨 Customize events and resources
5. 🔧 Add your own features
6. 🚀 Deploy to production

## 💡 Tips

- **Use Redux DevTools** - Install the browser extension for debugging
- **Check Console** - Event actions are logged to console
- **Hot Reload** - Changes auto-refresh the page
- **Responsive** - Works on mobile and desktop

## 📞 Need Help?

Check the documentation files or FullCalendar docs:

- https://fullcalendar.io/docs/react
- https://redux-toolkit.js.org/

---

**Happy Coding! 🎉**
