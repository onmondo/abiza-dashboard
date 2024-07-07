import React, { useContext, useRef } from "react"
import { DashboardContext } from "../../../context/DashboardContext";
import { addNewExpenditure } from "../../../integrations/CapitalExpenditures";

export function AddNewExpenseModal() {
    const inputParticularsRef = useRef("")
    const inputDateRef = useRef(new Date())
    const inputBillRef = useRef(0)
    const inputRemarksRef = useRef("")

    const { searchDate, openBookingForm, setOpenBookingForm } = useContext(DashboardContext)

    const handleFocusDate = () => {
        inputDateRef.current.focus()
    }

    const handleFocusBill = () => {
        inputBillRef.current.focus()
    }

    const handleFocusRemarks = () => {
        inputRemarksRef.current.focus()
    }

    const handleSubmit = async () => {
        const inputParticulars = inputParticularsRef.current.value
        const inputDate = inputDateRef.current.value
        const inputBill = inputBillRef.current.value
        const inputRemarks = inputRemarksRef.current.value

        await addNewExpenditure(searchDate, { 
            date: inputDate,
            particulars: inputParticulars,
            totalBill: Number(inputBill),
            remarks: inputRemarks
        })
        
        setOpenBookingForm(!openBookingForm)
    }

    return (
        <div id="newexpenseform" popover="">
            <section>
            <header><h1>Add new expense</h1></header>
            <label htmlFor="particulars">Particulars</label>
            <input type="text" placeholder="Particulars" ref={inputParticularsRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusBill() }} />
            <label htmlFor="bill">Bill</label>
            <input type="number" ref={inputBillRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusDate() }} />
            <label htmlFor="billingdate">Date</label>
            <input type="date" ref={inputDateRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusRemarks() }} />
            <label htmlFor="remarks">Remarks</label>
            <input type="text" placeholder="Remarks" ref={inputRemarksRef} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}/>
            <p>
            <button popovertarget="newexpenseform" onClick={handleSubmit}>Add</button>
            <button className="cancel" popovertarget="newexpenseform">Cancel</button>                
            </p>            
            </section>
        </div>
    )
}