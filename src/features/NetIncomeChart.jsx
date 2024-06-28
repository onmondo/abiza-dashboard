import React, { useState, useEffect, useMemo, useContext } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DashboardContext } from "../context/DashboardContext";
import { computeTotalExpenditure, computeTotalRevenue } from "../util/currency";
import Big from "big.js";
import { fetchAllBookings } from "../integrations/GuestBookings";
import { fetchAllExpenditures } from "../integrations/CapitalExpenditures";


let monthlyIncome = 
    [
        { month:"Jan", amount: 0 },
        { month:"Feb", amount: 0 },
        { month:"Mar", amount: 0 },
        { month:"Ap", amount: 0 },
        { month:"May", amount: 0 },
        { month:"Jun", amount: 0 },
        { month:"Jul", amount: 0 },
        { month:"Aug", amount: 0 },
        { month:"Sep", amount: 0 },
        { month:"Oct", amount: 0 },
        { month:"Nov", amount: 0 },
        { month:"Dec", amount: 0 },

    ]

export function NetIncomeChart() {
    const [bookings, setBookings] = useState([])
    const [expenditures, setExpenditures] = useState([])
    const [setTotalBookings] = useState(0)
    const { searchDate } = useContext(DashboardContext)
    // const [monthlyIncome, setMonthlyIncome] = useState([
    //     { month:"Jan", amount: 0 },
    //     { month:"Feb", amount: 0 },
    //     { month:"Mar", amount: 0 },
    //     { month:"Ap", amount: 0 },
    //     { month:"May", amount: 0 },
    //     { month:"Jun", amount: 0 },
    //     { month:"Jul", amount: 0 },
    //     { month:"Aug", amount: 0 },
    //     { month:"Sep", amount: 0 },
    //     { month:"Oct", amount: 0 },
    //     { month:"Nov", amount: 0 },
    //     { month:"Dec", amount: 0 },

    // ])


    useEffect(() => {
        fetchAllBookings(setBookings, setTotalBookings, searchDate)
        fetchAllExpenditures(setExpenditures, searchDate)
    }, [searchDate])

    const getTotalRevenue = useMemo(() => computeTotalRevenue(bookings), [bookings])
    const getTotalExpenditure = useMemo(() => computeTotalExpenditure(expenditures), [expenditures])

    const computeTotalNetIncome = () => {
        const bigTotalRevenue = Big(getTotalRevenue)
        const bitTotalExpense = Big(getTotalExpenditure)
        const bigNetIncome = bigTotalRevenue.minus(bitTotalExpense)
        const currentMonth = Intl.DateTimeFormat('en', { month: "short"}).format(new Date(searchDate))
        monthlyIncome = ([ ...monthlyIncome.map(month => {
            if (month.month === currentMonth) {
                return { ...month, amount: bigNetIncome.toNumber() }
            } else {
                return month
            }
        }) ])
        return monthlyIncome
    }

    const getNetIncome = useMemo(() => computeTotalNetIncome(), [bookings, expenditures])
    console.log(monthlyIncome)
    return (
        <section className="dashboardbox">
        {/* <div className="chart"> */}
            <header><h1>Sales Analytics</h1></header>
            {/* <h3 className="chartTitle">Sales Analytics</h3> */}
            <ResponsiveContainer aspect={4 / 2} minWidth={"400px"}>
            <LineChart
            width={500}
            height={300}
            data={getNetIncome}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
            </ResponsiveContainer>
        {/* </div> */}
        </section>

    )
}