import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store"
import { useCalendarStore } from "./useCalendarStore"

export const useUiStore = () => {
    const dispatch = useDispatch()
    const {setActiveEvent} = useCalendarStore()

    const {isDateModalOpen} = useSelector(state => state.ui)

    const openDateModal = () => {
        dispatch(onOpenDateModal()) //Mandar a llamr onOpenDateModal que viene del store usando siempre un dispatch
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
        setActiveEvent(null)
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
        ? openDateModal()
        : closeDateModal();
    }
    

    return {
        //* Propiedades
        isDateModalOpen,

        //? Metodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
}
