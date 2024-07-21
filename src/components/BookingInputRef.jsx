import React, { forwardRef, useImperativeHandle, useState } from "react"
import { BookingInput } from "./BookingInput"

export const BookingInputRef = forwardRef((props, ref) => {
    const [value, setValue] = useState("")

    useImperativeHandle(ref, () => ({
        changeValue(value) {
            setValue(value)
        },
        getValue() {
            return value
        }
    }))
    
    return (
        <BookingInput {...props} value={value} />
    )
})
