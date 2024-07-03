import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext"
import { amountFormatter } from "../util/currency"
import { EarningsSectionContext } from "../context/EarningsSectionContext";
import { computeFilteredList } from "../util/search";

export function CapitalExpenditures() {
    const searchKeys = ["particulars", "remarks", "date"]
    const [query, setQuery] = useState("")

    const { searchDate } = useContext(DashboardContext)
    const { expenditures, getTotalExpenditure, handleDeleteExpense } = useContext(EarningsSectionContext)

    const navigate = useNavigate()

    const handleNewExpense = () => {
        navigate("/addExpense", { state: { searchDate }})
    }
    
    const handleUpdateExpense = (expenditureId) => {
        navigate(`/updateExpense/${expenditureId}`, { state: { searchDate }})
    }

    const getFilteredExpenditures = useMemo(() => computeFilteredList(expenditures, searchKeys, query), [expenditures, query])

    return (
        <section className="dashboardbox">
            <header>
                <h1>💸 Expenditures</h1>
                <p>
                    <strong>{amountFormatter.format(getTotalExpenditure)}</strong> total expenditures <button className="newexpense" onClick={handleNewExpense}>Add new expense</button>
                </p>
                <input type="text" placeholder="Search..." className="searchbox" onChange={(e) => setQuery(e.target.value.toLowerCase())} /> <br />
                <sub>found {getFilteredExpenditures.length} records</sub> 
            </header>
            <ol>
                {getFilteredExpenditures
                .map(expenditure => 
                    <li key={expenditure._id}>
                        <article className="dashboarddetails">
                            <header>
                                <h3>{expenditure.particulars}</h3>
                                <sub>{expenditure.remarks}</sub>
                            </header>
                            <section>
                                <h3>{amountFormatter.format(expenditure.totalBill)}</h3>
                                <sub>{expenditure.date}</sub>
                            </section>
                        </article>
                        <p className="buttongroup">
                            <button className="update" onClick={() => {handleUpdateExpense(expenditure._id)}}>Update</button>
                            <button className="delete" onClick={() => {handleDeleteExpense(expenditure._id)}}>Delete</button>
                        </p>
                    </li>
                )}
            </ol>
        </section>
    )
}