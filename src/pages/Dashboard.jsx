import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { GuestBookings } from "../features/GuestBookings";
// import "./Dashboard.scss";
import { CapitalExpenditures } from "../features/CapitalExpenditures";
import { DashboardContext } from "../context/DashboardContext";
import { getCurrentDate } from "../util/searchDate"
import { EarningsSection } from "../features/EarningsSection";

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

    const handleOnChange = (e) =>{
        setSearchDate(e.target.value)
    }

    return (
        <DashboardContext.Provider value={{searchDate, setSearchDate}}>
            <header>
                <h1>Abiza Dashboard</h1>
                <p>
                    <input title="monthselector" type="month" onChange={handleOnChange} value={searchDate} />
                </p>
            </header>
            <section className="overstats">
                <EarningsSection />
            </section>
            <section className="dashboard">
                <GuestBookings />
                <CapitalExpenditures />
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