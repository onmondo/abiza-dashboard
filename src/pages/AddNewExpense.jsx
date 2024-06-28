import React, { useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { addNewExpenditure } from "../integrations/CapitalExpenditures"

export function AddNewExpense() {
    const inputParticularsRef = useRef("")
    const inputDateRef = useRef(new Date())
    const inputBillRef = useRef(0)
    const inputRemarksRef = useRef("")

    const location = useLocation()
    const navigate = useNavigate()

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

        await addNewExpenditure(location.state.searchDate, { 
            date: inputDate,
            particulars: inputParticulars,
            totalBill: Number(inputBill),
            remarks: inputRemarks
        })
        
        navigate("/", { state: location.state})
    }

    const handleCancel = async () => {
        navigate("/", { state: location.state})
    }

    return (
        <div className="form">
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
            <button onClick={handleSubmit}>Add</button>
            <button className="cancel" onClick={handleCancel}>Cancel</button>                
            </p>            
            </section>
        </div>
    )
}