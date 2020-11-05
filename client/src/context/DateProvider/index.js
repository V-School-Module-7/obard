// DATE PROVIDER - INDEX
// ==============================

// imports
import react, { createContext } from "react"
import useBooking from "./hooks"

// context
export const DateContext = createContext();

// provider
const DateProvider = props => {
    const value = useBooking()

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

// exports
export default DateProvider