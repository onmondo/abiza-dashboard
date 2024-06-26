import React, { useEffect } from "react"

export function Child({ returnComment }) {
    useEffect(() => {
        console.log("Function was called")
    }, [returnComment])
    return (
        <section>{returnComment()}</section>
    )
}