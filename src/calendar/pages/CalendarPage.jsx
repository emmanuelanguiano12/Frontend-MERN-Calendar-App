import { CalendarEvent, CalendarModal, FabAddEvent, FabDeleteEvent, Navbar } from ".."
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from "../../helpers"
import { useEffect, useState } from "react"
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks"


export const CalendarPage = () => {
  const {openDateModal} = useUiStore();
  const {user} = useAuthStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    
    const style = {
      backgroundColor: isMyEvent ? '#247CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    
    return {
      style
    }
  }


const onDoubleClick = (event) => {
  openDateModal()
}

const onSelect = (event) => {
  setActiveEvent(event) //mandar el evento (payload) a setActiveEvent que viene del useCalendarSlice
}

const onViewChangues = (event) => {
  localStorage.setItem('lastView', event)
  setLastView(event)
}

useEffect(() => {
  startLoadingEvents()
}, []);

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        culture='es'
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChangues}
      />

      <CalendarModal />
      <FabAddEvent />
      <FabDeleteEvent />
    </>
  )
}
