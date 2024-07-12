import React, { useContext, useEffect, useLayoutEffect } from "react"
import { ShareholderContext } from "../../context/ShareholderContext"
import { TransactionDetails } from "../../components/TransactionDetails"
import { amountFormatter } from "../../util/currency"
import { cancelPaymentByCashAdvanceId, fetchAllPaymentsByCashAdvanceId } from "../../integrations/Sharesholders"

export function CashAdvancePayments() {
    const { cashAdvanceId, cashAdvances, payments, setPayments } = useContext(ShareholderContext)

    useEffect(() => {
        if (cashAdvanceId) {
            fetchAllPaymentsByCashAdvanceId(setPayments, cashAdvanceId)
        }
    }, [cashAdvances])

    const handleCancelPayment = async ({amountPaid, paidAt, remarks}) => {
        console.log(amountPaid, paidAt, remarks)
        await cancelPaymentByCashAdvanceId(cashAdvanceId, {
            amountPaid, paidAt, remarks: "Cancelled"
        })

        await fetchAllPaymentsByCashAdvanceId(setPayments, cashAdvanceId)
    }
    return (
        <section className="payments">
            <header>
                <h2>Payments for {`...${cashAdvanceId.substring(cashAdvanceId.length - 4)}`}</h2>
            </header>
            {
                (payments && payments.length > 0)
                ?
                <ol>
                {payments.map((payment, i) => 
                <li key={i}>
                    <article className="dashboarddetails">
                        <header className={(payment.remarks.toLowerCase().includes("cancel")) ? "cancelledpayments":""}>
                        <TransactionDetails 
                            title={amountFormatter.format(payment.amountPaid)} 
                            subtitles={[ payment.remarks, `${amountFormatter.format(payment.originalAmount)}`]}
                            />
                            <p>
                            {
                                (payment.remarks.toLowerCase().includes("cancel"))
                                ? ""
                                : <button onClick={() => {handleCancelPayment(payment)}}>Cancel payment</button>
                            }
                            </p>
    
                            
                        </header>
                        <section>
                        <TransactionDetails 
                            title={amountFormatter.format(payment.remaining)} 
                            subtitles={[ "remaining", `Paid on: ${payment.paidAt}` ]}
                            />
                        </section>
                    </article>
                </li>
                )}
                </ol>
                :
                <section>No selected cash advance</section>
            }


            <p>
                {
                    (payments && payments.length > 0 && payments[payments.length - 1].remaining === 0)
                    ? "" : <button popovertarget="newpaymentforcashadvance">Add new payment</button>
                }
            
            </p>
        </section>        
    )
}