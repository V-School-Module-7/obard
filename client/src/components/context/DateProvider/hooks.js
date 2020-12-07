// DATE PROVIDER - HOOKS
// ==============================

// imports
import React, { useState } from "react"

// hooks
const useDate = () => {
    const [date, setDate] = useState({
        startDate: null,
        endDate: null
    })

    return {
        date,
        setDate
    }  
}


// exports
export default useDate