import React, { useContext, useState, useLayoutEffect } from "react"
import { EarningsSectionContext } from "../../context/EarningsSectionContext"
import { amountFormatter } from "../../util/currency"
import Big from "big.js"
import { StatsBox } from "../../components/StatsBox"

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
        return (<StatsBox label={`${overall.totalCount} ${title}`} value={amountFormatter.format(overall.totalPayments)} />)
    }

    return (
        <>
            <header>
                <h1>💵 Earnings as of {currentMonth}</h1>
            </header>
            <ul className="dashboardboxlist">
                <StatsBox label={"Bookings"} value={amountFormatter.format(getTotalRevenue)} />
                <StatsBox label={"Expense"} value={amountFormatter.format(getTotalExpenditure)} />
                <StatsBox label={"Total Net"} value={amountFormatter.format(getNetIncome)} className="dbboxhighlight" />
            </ul>  
            <ul className="dashboardboxlist">
                {computeTotalPayments("Cash Payments", totalCashPayments)}
                {computeTotalPayments("Bank Transfers", totalBankTransfers)}
            </ul>      
        </>
    )
}