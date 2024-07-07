import React, { useState } from "react"

export function BookingInput({  name, label, errorSpiel, onChange, ...inputTypeProps }) {

    const [focused, setFocused] = useState(false)

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
            onFocus={() => inputTypeProps.name==="remarks" && setFocused(true)}
            focused={focused.toString()}
            />
        <span>{focused && errorSpiel}</span>        
        </>
    )
}