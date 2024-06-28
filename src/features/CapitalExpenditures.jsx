import React, { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { deleteExpenditure, fetchAllExpenditures } from "../integrations/CapitalExpenditures";
import { DashboardContext } from "../context/DashboardContext"
import { amountFormatter, computeTotalExpenditure } from "../util/currency"

export function CapitalExpenditures() {
    const searchKeys = ["particulars", "remarks", "date"]
    const [expenditures, setExpenditures] = useState([])
    const [query, setQuery] = useState("")

    const { searchDate } = useContext(DashboardContext)

    useEffect(() => {
        fetchAllExpenditures(setExpenditures, searchDate)
    }, [searchDate])

    const navigate = useNavigate()

    const getTotalExpenditure = useMemo(() => computeTotalExpenditure(expenditures), [expenditures])

    const handleNewExpense = () => {
        navigate("/addExpense", { state: { searchDate }})
    }
    
    const handleUpdateExpense = (expenditureId) => {
        navigate(`/updateExpense/${expenditureId}`, { state: { searchDate }})
    }

    const handleDeleteExpense = async (expenditureId) => {
        await deleteExpenditure(expenditureId)
        await fetchAllExpenditures(setExpenditures, searchDate)
    }

    return (
        <section className="dashboardbox">
            <header>
                <h1>Expenditures</h1>
                <p><strong>{amountFormatter.format(getTotalExpenditure)}</strong> total expenditures <button className="newexpense" onClick={handleNewExpense}>Add new expense</button></p>
                <input type="text" placeholder="Search..." className="searchbox" onChange={(e) => setQuery(e.target.value.toLowerCase())} /> <br />
            </header>
            <ol>
                {expenditures
                    .filter(expenditure => 
                        searchKeys.some(searchKey => {
                            if (Array.isArray(expenditure[searchKey])) {
                                return expenditure[searchKey].join(",").toLowerCase().includes(query)
                            } else {
                                return expenditure[searchKey].toLowerCase().includes(query)
                            }
                        })
                    )
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