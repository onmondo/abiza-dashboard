import React, { useContext } from "react"
import { EarningsSectionContext } from "../context/EarningsSectionContext"
import { amountFormatter } from "../util/currency"

export function Overallstatus() {
    const { currentMonth, getTotalRevenue, getTotalExpenditure, getNetIncome } = useContext(EarningsSectionContext)
    return (
        <>
            <header>
                <h1>💵 Earnings as of {currentMonth}</h1>
            </header>
            <ul className="dashboardboxlist">
                <li>
                    <h3>{amountFormatter.format(getTotalRevenue)}</h3>
                    <sub>Bookings</sub>
                </li>
                <li>
                    <h3>{amountFormatter.format(getTotalExpenditure)}</h3>
                    <sub>Expense</sub>
                </li>
                <li className="dbboxhighlight">
                    <h3>{amountFormatter.format(getNetIncome)}</h3>
                    <sub>Total Net</sub>
                </li>
            </ul>        
        </>
    )
}