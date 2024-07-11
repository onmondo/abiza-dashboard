import React, { useRef } from "react"

export function AddCashAdvanceModal() {
    const inputAmountRef = useRef(0)
    const inputDateRef = useRef(new Date())
    const inputRemarksRef = useRef("")

    const handleFocusDate = () => {
        inputDateRef.current.focus()
    }

    const handleFocusRemarks = () => {
        inputRemarksRef.current.focus()
    }

    const handleSubmit = async () => {
        const inputAmountRef = inputParticularsRef.current.value
        const inputDate = inputDateRef.current.value
        const inputRemarks = inputRemarksRef.current.value

        await addNewCashAdvance(searchDate, { 
            date: inputDate,
            particulars: inputParticulars,
            totalBill: Number(inputBill),
            remarks: inputRemarks
        })

        inputAmountRef.current.value = 0
        inputDateRef.current.value = new Date()
        inputRemarksRef.current.value = ""        
    }

    return (
        <div id="newcashadvanceform" popover="">
            <section>
            <header><h1>Add new cash advance</h1></header>
            <label htmlFor="amount">Amount</label>
            <input type="number" placeholder="Amount" ref={inputAmountRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusDate() }} />
            <label htmlFor="date">Date</label>
            <input type="date" ref={inputDateRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusRemarks() }} />
            <label htmlFor="remarks">Remarks</label>
            <input type="text" placeholder="Remarks" ref={inputRemarksRef} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}/>
            <p>
            <button popovertarget="newcashadvanceform" onClick={handleSubmit}>Add</button>
            <button className="cancel" popovertarget="newcashadvanceform">Cancel</button>                
            </p>            
            </section>
        </div>
    )
}