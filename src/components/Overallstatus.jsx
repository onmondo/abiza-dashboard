import React, { useContext, useState, useLayoutEffect } from "react"
import { EarningsSectionContext } from "../context/EarningsSectionContext"
import { amountFormatter } from "../util/currency"
import Big from "big.js"

export function Overallstatus() {
    const [totalCashPayments, setTotalCashPayments] = useState(null)
    const [totalBankTransfers, setTotalBankTransfers] = useState(null)

    const { bookings, currentMonth, getTotalRevenue, getTotalExpenditure, getNetIncome } = useContext(EarningsSectionContext)
    
    useLayoutEffect(() => {
        if (bookings) {
            setTotalCashPayments(bookings.filter((booking) => booking.modeOfPayment.toLowerCase().includes("cash")))
            setTotalBankTransfers(bookings.filter((booking) => booking.modeOfPayment.toLowerCase().includes("bpi")))
        }
    }, [bookings])
    
    
    const computeTotalPayments = (title, payments) => {
        const defaultValue = { totalPayments: 0, totalCount: 0 }
        const overall = (payments && payments.length > 0)
            ? payments.reduce((value, cashPayment) => {
                const bigTotal = Big(value.totalPayments)
                const bitTotalPayout = Big(cashPayment.totalPayout)
                return {
                    totalPayments: bigTotal.plus(bitTotalPayout).toNumber(),
                    totalCount: value.totalCount += 1
                }
            }, defaultValue)
            : defaultValue
        return (
            <>
                <h3>{amountFormatter.format(overall.totalPayments)}</h3>
                <sub>{overall.totalCount} {title}</sub>
            </>
        )
    }

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
            <ul className="dashboardboxlist">
                <li>
                    {computeTotalPayments("Cash Payments", totalCashPayments)}
                </li>
                <li>
                    {computeTotalPayments("Bank Transfers", totalBankTransfers)}
                </li>
            </ul>      
        </>
    )
}