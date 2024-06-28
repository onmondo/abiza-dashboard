import React, { useMemo, useEffect, useState, useContext } from "react"
import { Shareholders } from "../components/Shareholders"
import { DashboardContext } from "../context/DashboardContext"
import { amountFormatter, computeTotalExpenditure, computeTotalRevenue } from "../util/currency"
import { fetchAllBookings } from "../integrations/GuestBookings"
import { fetchAllExpenditures } from "../integrations/CapitalExpenditures"
import Big from "big.js"

export const EarningsSection = function EarningsSection() {
    const [bookings, setBookings] = useState([])
    const [expenditures, setExpenditures] = useState([])
    const [totalBookings, setTotalBookings] = useState(0)
    const { searchDate } = useContext(DashboardContext)

    useEffect(() => {
        fetchAllBookings(setBookings, setTotalBookings, searchDate)
        fetchAllExpenditures(setExpenditures, searchDate)
    }, [searchDate])

    const getTotalRevenue = useMemo(() => computeTotalRevenue(bookings), [bookings])
    const getTotalExpenditure = useMemo(() => computeTotalExpenditure(expenditures), [expenditures])

    const computeTotalNetIncome = () => {
        console.log(getTotalRevenue, getTotalExpenditure)
        const bigTotalRevenue = Big(getTotalRevenue)
        const bitTotalExpense = Big(getTotalExpenditure)
        const bigNetIncome = bigTotalRevenue.minus(bitTotalExpense)
        return bigNetIncome.toNumber()
    }

    const getNetIncome = useMemo(() => computeTotalNetIncome(), [bookings, expenditures])

    
    return (
        <section className="earningssection">
            <section className="dashboardbox">
                <header>
                    <h1>Earnings</h1>
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
            </section>
            <Shareholders netIncome={getNetIncome}/>
        </section>

    )
}