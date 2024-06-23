import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GuestBookings } from "./pages/GuestBookings";
import { Add } from "./pages/Add";
import { Update } from "./pages/Update";

export function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GuestBookings />}></Route>
                    <Route path="/add" element={<Add />}></Route>
                    <Route path="/update/:id" element={<Update />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
