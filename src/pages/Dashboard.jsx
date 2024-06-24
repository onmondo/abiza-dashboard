import React from "react";
import { GuestBookings } from "../features/GuestBookings";

export function Dashboard() {
    return (
        <section className="dashboard">
            <GuestBookings />
        </section>
    )
}