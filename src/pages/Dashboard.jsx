import React from "react";
import { GuestBookings } from "../features/GuestBookings";
// import { UseRefDemo } from "../components/hookDemos/UseRefDemo";
// import { UseLayoutEffectDemo } from "../components/hookDemos/UseLayoutEffectDemo"
// import { UseImperativeHandleDemo } from "../components/hookDemos/UseImperativeHandleDemo"
// import { ContextDemo } from "../components/hookDemos/ContextDemo";
// import { UseMemoDemo } from "../components/hooksForOptimization/UseMemoDemo";
// import { UseCallbackDemo } from "../components/hooksForOptimization/UseCallbackDemo";
// import { UseStateDemo } from "../components/hookBasics/UseStateDemo";
// import { UseReducerDemo } from "../components/hookBasics/UseReducerDemo";

export function Dashboard() {

    return (
        <section className="dashboard">
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
    )
}