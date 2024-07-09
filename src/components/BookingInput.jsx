import React, { useContext, useLayoutEffect, useState } from "react"
import { DashboardContext } from "../context/DashboardContext"

export function BookingInput({  name, label, errorSpiel, onChange, ...inputTypeProps }) {

    const [focused, setFocused] = useState(false)

    const { openBookingForm } = useContext(DashboardContext)

    useLayoutEffect(() => {
        setFocused(false)
    }, [openBookingForm])

    const handleFocus = (e) => {
        setFocused(true)
    }

    return (
        <>
        <label htmlFor={name}>{label}</label>
        <input 
            {...inputTypeProps} 
            name={name} 
            onChange={onChange} 
            onBlur={handleFocus}
            onFocus={() => inputTypeProps.name==="remarks" && setFocused(false)}
            focused={focused.toString()}
            />
        <span>{errorSpiel}</span>        
        </>
    )
}