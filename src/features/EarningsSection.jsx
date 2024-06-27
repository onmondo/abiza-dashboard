import React, { memo, useEffect, useState } from "react"
import { Shareholders } from "../components/Shareholders"
import { fetchAllShareholders } from "../integrations/Sharesholders"

export const EarningsSection = function EarningsSection() {

    console.log("EarningsSection component re-renderd")
    return (
        <section className="earningssection">
            <section className="earnings">
                <header>
                    <h1>Earnings</h1>
                </header>
                <ul className="earningslist">
                    <li>Bookings: </li>
                    <li>Expense: </li>
                    <li>Total Net: </li>
                </ul>
            </section>
            <Shareholders />
        </section>

    )
}