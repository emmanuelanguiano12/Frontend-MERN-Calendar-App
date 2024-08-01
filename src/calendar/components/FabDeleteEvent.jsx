import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDeleteEvent = () => {

  const {startDeletingEvent, hasEventSelected, activeEvent} = useCalendarStore()
  const {isDateModalOpen} = useUiStore()

  const handleDelete = () => {
    startDeletingEvent(activeEvent)
  }

  return (
    <button 
        className="btn btn-danger fab-danger"
        onClick={handleDelete}
        style={{display: hasEventSelected && !isDateModalOpen ? '' : 'none'}}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
