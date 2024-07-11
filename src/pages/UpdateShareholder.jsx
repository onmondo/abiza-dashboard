import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import { fetchAllPaymentsByCashAdvanceId, fetchCashAdvancesByShareholderId, fetchShareholdersById, updateShareholder } from "../integrations/Sharesholders"
import { useLocation, useNavigate } from "react-router-dom";
import { amountFormatter, toDecimal, toPercentage } from "../util/currency";
import { AddCashAdvanceModal } from "../features/EarningSection/popovers/AddCashAdvanceModal";
import { TransactionDetails } from "../components/TransactionDetails";
import { StatsBox } from "../components/StatsBox";

export function UpdateShareholder({ placeholder }) {
    const location = useLocation()
    const shareholderId = location.pathname.split("/")[2]

    const [shareholder, setShareholder] = useState({})
    const [cashAdvances, setCashAdvances] = useState([])
    const [payments, setPayments] = useState([])

    const nameRef = useRef("")
    const percentageRef = useRef(0)
    const ownerRef = useRef(false)
    const activeRef = useRef(false)

    const navigate = useNavigate()

    useLayoutEffect(() => {
        fetchShareholdersById(setShareholder, shareholderId)
        fetchCashAdvancesByShareholderId(setCashAdvances, shareholderId)
    }, [])

    useEffect(() => {
        nameRef.current.value = shareholder.name
        percentageRef.current.value = toPercentage(shareholder.percentage)
        ownerRef.current.checked = shareholder.isOwner
        activeRef.current.checked = shareholder.isActive
    }, [shareholder])

    const handleUpdateShareholder = async () => {
        await updateShareholder(shareholderId, {
            name: nameRef.current.value,
            percentage: toDecimal(percentageRef.current.value),
            isActive: true,
            isOwner: ownerRef.current.checked 
        })
        navigate("/", { state: location.state})
    }

    const handleCancel = () => {
        navigate("/", { state: location.state})
    }

    const handleOnClickCashAdvanceBox = async (cashAdvanceId) => {
        await fetchAllPaymentsByCashAdvanceId(setPayments, cashAdvanceId)
    }

    return (
        <div className="form">
            <section className="shareholderdetails">
                <header>
                    <h1>Update shareholder</h1>
                </header>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder={placeholder} ref={nameRef} />
                <label htmlFor="sharepercentage">Share percentage</label>
                <input type="number" placeholder="0.0" ref={percentageRef} />
                <div className="tickbox">
                <input type="checkbox" name="owner" id="owner" ref={ownerRef} />                    
                <label htmlFor="isowner">Owned?</label>                
                </div>                
                <div className="tickbox">
                <input type="checkbox" name="active" id="active" ref={activeRef} />
                <label htmlFor="isactive">Active?</label>
                </div>
                <p>
                <button onClick={handleUpdateShareholder}>Update</button>
                <button popovertarget="newcashadvanceform">Cash advance</button>
                <button className="cancel" onClick={handleCancel}>Cancel</button>
                </p>
            </section>
            <AddCashAdvanceModal />
            <section className="cashadvances">
                <header>
                    <h2>Cash advances</h2>
                </header>
                <ul className="dashboardboxlist">
                {cashAdvances.map(cashAdvance => 
                    <StatsBox 
                        key={cashAdvance._id}
                        label={cashAdvance.date} 
                        value={amountFormatter.format(cashAdvance.amount)}>
                        <p><sub>{cashAdvance.remarks}</sub></p>
                        <button onClick={() => {handleOnClickCashAdvanceBox(cashAdvance._id); console.log("fetching payments")}}>View payments</button>
                    </StatsBox>
                )}
                </ul>

            </section>
            <section className="payments">
                <header>
                    <h2>Payments</h2>
                </header>
                <ol>
                {payments.map((payment, i) => 
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
        </div>

    )
}