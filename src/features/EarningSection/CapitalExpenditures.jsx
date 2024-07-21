import React, { useState, useContext, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../../context/DashboardContext"
import { amountFormatter } from "../../util/currency"
import { EarningsSectionContext } from "../../context/EarningsSectionContext";
import { computeFilteredList } from "../../util/search";
import { AddNewExpenseModal } from "./popovers/AddNewExpenseModal";
import { UpdateExpenseModal } from "./popovers/UpdateExpenseModal";
import { TransactionDetails } from "../../components/TransactionDetails";

export function CapitalExpenditures() {
    const searchKeys = ["particulars", "remarks", "date"]
    const [query, setQuery] = useState("")

    const { setExpenseId } = useContext(DashboardContext)
    const { expenditures, getTotalExpenditure, handleDeleteExpense } = useContext(EarningsSectionContext)

    // const navigate = useNavigate()

    // const handleNewExpense = () => {
    //     navigate("/addExpense", { state: { searchDate }})
    // }
    
    const handleUpdateExpense = (expenditureId) => {
        // navigate(`/updateExpense/${expenditureId}`, { state: { searchDate }})
        setExpenseId(expenditureId)
    }

    const getFilteredExpenditures = useMemo(() => computeFilteredList(expenditures, searchKeys, query), [expenditures, query])

    return (
        <section className="dashboardbox">
            <header>
                <h1>💸 Expenditures</h1>
                <p>
                    <strong>{amountFormatter.format(getTotalExpenditure)}</strong>&nbsp;
                    total expenditures&nbsp;
                    <button 
                        popovertarget="newexpenseform" 
                        className="newexpense" 
                        // onClick={handleNewExpense}
                    >
                        Add new expense
                    </button>
                </p>
                <input type="text" placeholder="Search..." className="searchbox" onChange={(e) => setQuery(e.target.value.toLowerCase())} /> <br />
                <sub>found {getFilteredExpenditures.length} records</sub> 
            </header>
            <ol>
                {getFilteredExpenditures
                .map(expenditure => {
                    const expenseDate = new Intl.DateTimeFormat('en', {
                        dateStyle: 'full',
                    }).format(new Date(expenditure.date))
                    return (<li key={expenditure._id}>
                        <article className="dashboarddetails">
                            <header>
                                <TransactionDetails 
                                    title={expenditure.particulars}
                                    subtitles={[expenditure.remarks]}
                                />
                            </header>
                            <section>
                                <TransactionDetails
                                    title={amountFormatter.format(expenditure.totalBill)} 
                                    subtitles={[expenseDate]}
                                />
                            </section>
                        </article>
                        <p className="buttongroup">
                            <button className="update" popovertarget="editexpenseform" onClick={() => {handleUpdateExpense(expenditure._id)}}>Update</button>
                            <button className="delete" onClick={() => {handleDeleteExpense(expenditure._id)}}>Delete</button>
                        </p>
                    </li>)
                }
                )}
            </ol>
            <AddNewExpenseModal />
            <UpdateExpenseModal />
        </section>
    )
}