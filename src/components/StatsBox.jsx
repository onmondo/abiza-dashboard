import React from "react"

export function StatsBox({label, value, className, children}) {
    return (
        <li className={className}>
            <h3>{value}</h3>
            <sub>{label}</sub>
            {children}
        </li>
    )
}