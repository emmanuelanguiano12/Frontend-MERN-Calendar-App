import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarApi } from "../api"
import { converEventsToDateEvents } from "../helpers"
import Swal from "sweetalert2"

export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const {events, activeEvent} = useSelector(state => state.calendar) //esto es lo que viene en la interfaz de redux
    const {user} = useSelector(state => state.auth) //esto es lo que viene en la interfaz de redux

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }
    
    const startSavingEvent = async(calendarEvent) => {

        try {
            if(calendarEvent.id){
                //se está actualizando un evento
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}))
                Swal.fire('Evento actualizado', '', 'success')
                return;
            } 

            //se está creando un evento
            const {data} = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({ ...calendarEvent, _id: data.evento.id, user }))
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data?.msg, 'error')
        }

        
    }

    const startDeletingEvent = async({id}) => {

        try {
            await calendarApi.delete(`/events/${id}`, id)
            dispatch(onDeleteEvent())
            Swal.fire('Evento eliminado', '', 'warning')
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
        }

    }

    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarApi.get('/events')
            const events = converEventsToDateEvents(data.msg)
            dispatch(onLoadEvent(events))
        } catch (error) {
            console.log("Error cargando eventos")
            console.log(error)
        }
    }
    
    //store -> slice -> useSlice -> page.jsx
    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //? Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,

    }
}
