import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { GuestBookings } from "../features/GuestBookings";
// import "./Dashboard.scss";
import { CapitalExpenditures } from "../features/CapitalExpenditures";
import { DashboardContext } from "../context/DashboardContext";
import { getCurrentDate } from "../util/searchDate"
import { EarningsSection } from "../features/EarningsSection";
import { NetIncomeChart } from "../features/NetIncomeChart";
import logo from '../assets/logo-transparent.png';
// import { UseRefDemo } from "../components/hookDemos/UseRefDemo";
// import { UseLayoutEffectDemo } from "../components/hookDemos/UseLayoutEffectDemo"
// import { UseImperativeHandleDemo } from "../components/hookDemos/UseImperativeHandleDemo"
// import { ContextDemo } from "../components/hookDemos/ContextDemo";
// import { UseMemoDemo } from "../components/hooksForOptimization/UseMemoDemo";
// import { UseCallbackDemo } from "../components/hooksForOptimization/UseCallbackDemo";
// import { UseStateDemo } from "../components/hookBasics/UseStateDemo";
// import { UseReducerDemo } from "../components/hookBasics/UseReducerDemo";

export function Dashboard() {
    const location = useLocation()
    const currentDate = getCurrentDate(location.state)
    const [searchDate, setSearchDate] = useState(currentDate)
    const [openBookingForm, setOpenBookingForm] = useState(false)
    const [hasDeletion, setHasDeletion] = useState(false)
    const [bookingFormId, setBookingFormId] = useState("")
    const [expenseId, setExpenseId] = useState("")
    const [amenityId, setAmenityId] = useState(null)

    const handleOnChange = (e) =>{
        setSearchDate(e.target.value)
    }

    return (
        <DashboardContext.Provider value={{
                searchDate, setSearchDate, 
                openBookingForm, setOpenBookingForm, 
                hasDeletion, setHasDeletion,
                bookingFormId, setBookingFormId,
                expenseId, setExpenseId,
                amenityId, setAmenityId,
            }}>
            <header className="headernav fullbleed">
                <p>
                    <img src={logo} role="presentation" fetchpriority="high" alt="Abiza Homestay Logo" />
                    <input title="monthselector" type="month" onChange={handleOnChange} value={searchDate} />
                </p>
            </header>
            <section className="dashboardrows dashboardrowcolumn1">
                <EarningsSection />
            </section>
            <section className="dashboardrows dashboardrowcolumn2">
                <GuestBookings />
                
                {/* <UseRefDemo /> */}
                {/* <UseLayoutEffectDemo /> */}
                {/* <UseImperativeHandleDemo /> */}
                {/* <ContextDemo /> */}
                {/* <UseMemoDemo /> */}
                {/* <UseCallbackDemo /> */}
                {/* <UseStateDemo /> */}
                {/* <UseReducerDemo /> */}
            </section>
        </DashboardContext.Provider>
    )
}