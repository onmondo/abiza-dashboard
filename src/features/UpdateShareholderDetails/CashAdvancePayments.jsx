import React, { useContext, useEffect, useLayoutEffect } from "react"
import { ShareholderContext } from "../../context/ShareholderContext"
import { TransactionDetails } from "../../components/TransactionDetails"
import { amountFormatter } from "../../util/currency"
import { fetchAllPaymentsByCashAdvanceId } from "../../integrations/Sharesholders"

export function CashAdvancePayments() {
    const { cashAdvances, payments, setPayments } = useContext(ShareholderContext)

    useEffect(() => {
        if (cashAdvances && cashAdvances.length > 0) {
            fetchAllPaymentsByCashAdvanceId(setPayments, cashAdvances[0]._id)
        }
    }, [cashAdvances])

    return (
        <section className="payments">
            <header>
                <h2>Payments</h2>
            </header>
            <ol>
            {payments && payments.map((payment, i) => 
            <li key={i}>
                <article className="dashboarddetails">
                    <header>
                    <TransactionDetails 
                        title={amountFormatter.format(payment.amountPaid)} 
                        subtitles={[`Paid on: ${payment.paidAt}`, `${amountFormatter.format(payment.originalAmount)}`]}
                        />
                    </header>
                    <section>
                    <TransactionDetails 
                        title={amountFormatter.format(payment.remaining)} 
                        subtitles={[ payment.remarks ]}
                        />
                    </section>
                </article>
            </li>

            )}
            </ol>
        </section>        
    )
}