import React from "react"

export function TransactionDetails({ title, subtitles}) {
    return (
        <>
            <h3>{title}</h3>
            {subtitles.map(subtitle => <><sub>{subtitle}</sub><br /></>)}
        </>
    )
}