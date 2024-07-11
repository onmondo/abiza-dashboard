import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { GuestBookings } from "./pages/GuestBookings";
// import { AddNewBooking } from "./pages/AddNewBooking";
// import { UpdateBooking } from "./pages/UpdateBooking";
import { Dashboard } from "./pages/Dashboard";
// import { AddNewExpense } from "./pages/AddNewExpense";
// import { UpdateExpense } from "./pages/UpdateExpense";
import "./App.scss"
import { AddShareholder } from "./pages/AddShareholder";
import { UpdateShareholder } from "./pages/UpdateShareholder";

export function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    {/* <Route path="/add" element={<AddNewBooking />}></Route> */}
                    {/* <Route path="/update/:id" element={<UpdateBooking />}></Route> */}
                    {/* <Route path="/addExpense" element={<AddNewExpense />}></Route> */}
                    {/* <Route path="/updateExpense/:id" element={<UpdateExpense />}></Route> */}
                    <Route path="/shareholder" element={<AddShareholder />}></Route>
                    <Route path="/shareholder/:id" element={<UpdateShareholder />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
