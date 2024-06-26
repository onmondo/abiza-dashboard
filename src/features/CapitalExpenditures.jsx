import React, { useEffect, useState, useContext, useMemo } from "react";
import Big from "big.js";
import { useNavigate } from "react-router-dom";
import { deleteExpenditure, fetchAllExpenditures } from "../integrations/CapitalExpenditures";
import { DashboardContext } from "../context/DashboardContext"
import { amountFormatter } from "../util/currency"

export function CapitalExpenditures() {
    const searchKeys = ["particulars", "remarks", "date"]
    const [expenditures, setExpenditures] = useState([])
    const [query, setQuery] = useState("")

    const { searchDate } = useContext(DashboardContext)

    useEffect(() => {
        fetchAllExpenditures(setExpenditures, searchDate)
    }, [searchDate])

    const navigate = useNavigate()

    const computeTotalExpenditure = () => {
        console.log("total expenditure computed")
        return amountFormatter.format(expenditures.reduce((total, expenditure) => {
            const bigTotal = Big(total)
            const bigBill = Big(expenditure.totalBill)
            total =  bigTotal.plus(bigBill).toNumber()
            
            return total
        }, 0))
    }

    const getTotalExpenditure = useMemo(() => computeTotalExpenditure(), [expenditures])

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
        <section className="expenditures">
            <header>
                <h1>Expenditures</h1>
                <p>{getTotalExpenditure} total expenditures</p>
                <input type="text" placeholder="Search..." className="searchbox" onChange={(e) => setQuery(e.target.value.toLowerCase())} /> <br />
                <button className="newexpense" onClick={handleNewExpense}>Add new expense</button>
            </header>
            <ul>
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
                        <article>
                            <h3>{expenditure.particulars}</h3>
                            <p>Date: {expenditure.date}</p>
                            <p>Total bill: {expenditure.totalBill}</p>
                            <p>Remarks: {expenditure.remarks}</p>
                            <button className="updateexpense" onClick={() => {handleUpdateExpense(expenditure._id)}}>Update expense</button>
                            <button className="deleteexpense" onClick={() => {handleDeleteExpense(expenditure._id)}}>Delete expense</button>
                        </article>
                    </li>
                )}
            </ul>
        </section>
    )
}