import React, { useMemo, useEffect, useState, useContext } from "react"
import { Shareholders } from "../components/Shareholders"
import { DashboardContext } from "../context/DashboardContext"
import { computeTotalExpenditure, computeTotalRevenue } from "../util/currency"
import { fetchAllBookings } from "../integrations/GuestBookings"
import { deleteExpenditure, fetchAllExpenditures } from "../integrations/CapitalExpenditures"
import Big from "big.js"
import { NetIncomeChart } from "./NetIncomeChart"
import { CapitalExpenditures } from "./CapitalExpenditures"
import { EarningsSectionContext } from "../context/EarningsSectionContext"
import { Overallstatus } from "../components/Overallstatus"

export const EarningsSection = function EarningsSection() {
    const [bookings, setBookings] = useState([])
    const [expenditures, setExpenditures] = useState([])
    const [setTotalBookings] = useState(0)
    const { searchDate, openBookingForm, hasDeletion } = useContext(DashboardContext)

    useEffect(() => {
        fetchAllBookings(setBookings, setTotalBookings, searchDate)
        fetchAllExpenditures(setExpenditures, searchDate)
    }, [searchDate, openBookingForm, hasDeletion])

    const getTotalRevenue = useMemo(() => computeTotalRevenue(bookings), [bookings])
    const getTotalExpenditure = useMemo(() => computeTotalExpenditure(expenditures), [expenditures])

    const computeTotalNetIncome = () => {
        const bigTotalRevenue = Big(getTotalRevenue)
        const bitTotalExpense = Big(getTotalExpenditure)
        const bigNetIncome = bigTotalRevenue.minus(bitTotalExpense)
        return bigNetIncome.toNumber()
    }

    const handleDeleteExpense = async (expenditureId) => {
        await deleteExpenditure(expenditureId)
        await fetchAllExpenditures(setExpenditures, searchDate)
    }

    const getNetIncome = useMemo(() => computeTotalNetIncome(), [bookings, expenditures])

    const currentMonth = Intl.DateTimeFormat('en', { month: "long"}).format(new Date(searchDate))
    return (
        <EarningsSectionContext.Provider value={{
            currentMonth,
            expenditures, setExpenditures, getTotalExpenditure, handleDeleteExpense,
            bookings, setBookings, setTotalBookings, getTotalRevenue,
            getNetIncome
            }}>
        <section className="earningssection">
            <section className="dashboardbox">
                <Overallstatus />
                <NetIncomeChart />
            </section> 
            <Shareholders /> 
            <CapitalExpenditures />
        </section>
        </EarningsSectionContext.Provider>
    )
}