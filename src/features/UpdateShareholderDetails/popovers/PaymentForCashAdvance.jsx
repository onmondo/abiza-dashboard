import React, { useContext, useRef } from "react"
import { createPaymentByCashAdvanceId } from "../../../integrations/Sharesholders"
import { ShareholderContext } from "../../../context/ShareholderContext"

export function PaymentForCashAdvance() {
    const { cashAdvanceId, toggleForm, setToggleForm } = useContext(ShareholderContext)
    const inputPaidAmountRef = useRef(0)
    const inputDateRef = useRef(new Date())
    const inputRemarksRef = useRef("")

    const handleFocusDate = () => {
        inputDateRef.current.focus()
    }

    const handleFocusRemarks = () => {
        inputRemarksRef.current.focus()
    }

    const handleSubmit = async () => {
        
        const inputAmount = inputPaidAmountRef.current.value
        const inputDate = inputDateRef.current.value
        const inputRemarks = inputRemarksRef.current.value

        await createPaymentByCashAdvanceId(cashAdvanceId, { 
            paidAt: inputDate,
            amountPaid: Number(inputAmount),
            remarks: inputRemarks
        })

        inputPaidAmountRef.current.value = 0
        inputDateRef.current.value = new Date()
        inputRemarksRef.current.value = ""   
        
        setToggleForm(!toggleForm)
    }

    return (
        <div id="newpaymentforcashadvance" popover="">
            <section>
            <header><h1>Add new cash advance</h1></header>
            <label htmlFor="amountPaid">Amount</label>
            <input type="number" placeholder="Amount" ref={inputPaidAmountRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusDate() }} />
            <label htmlFor="paidAt">Date</label>
            <input type="date" ref={inputDateRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusRemarks() }} />
            <label htmlFor="remarks">Remarks</label>
            <input type="text" placeholder="Remarks" ref={inputRemarksRef} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}/>
            <p>
            <button popovertarget="newpaymentforcashadvance" onClick={handleSubmit}>Add</button>
            <button className="cancel" popovertarget="newpaymentforcashadvance">Cancel</button>                
            </p>            
            </section>
        </div>
    )
}