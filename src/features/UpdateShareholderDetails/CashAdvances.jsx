import React, { useContext } from "react"
import { ShareholderContext } from "../../context/ShareholderContext";
import { fetchAllPaymentsByCashAdvanceId } from "../../integrations/Sharesholders";
import { StatsBox } from "../../components/StatsBox";
import { amountFormatter } from "../../util/currency";

export function CashAdvances() {
    const { cashAdvances, setPayments, setCashAdvanceId } = useContext(ShareholderContext)

    const handleOnClickCashAdvanceBox = async (cashAdvanceId) => {
        setCashAdvanceId(cashAdvanceId)
        await fetchAllPaymentsByCashAdvanceId(setPayments, cashAdvanceId)
    }

    const handleCancelCashAdvance = (cashAdvanceId) => {
        setCashAdvanceId(cashAdvanceId)
    }

    return (
        <section className="cashadvances">
            <header>
                <h2>Cash advances</h2>
            </header>
            <ul className="dashboardboxlist">
            {cashAdvances.map(cashAdvance => 
                <StatsBox 
                    key={cashAdvance._id}
                    label={`...${cashAdvance._id.substring(cashAdvance._id.length - 4)} ${cashAdvance.date}`} 
                    value={amountFormatter.format(cashAdvance.amount)}>
                    <p><sub>{cashAdvance.remarks}</sub></p>
                    <p>
                    <button onClick={() => {handleOnClickCashAdvanceBox(cashAdvance._id)}}>View payments</button>
                    <button popovertarget="cancelcashadvanceconfirm" onClick={() => {handleCancelCashAdvance(cashAdvance._id)}}>Cancel</button>
                    </p>
                </StatsBox>
            )}
            </ul>
            <p>
            <button popovertarget="newcashadvanceform">Add new cash advance</button>
            </p>
        </section>        
    )
}