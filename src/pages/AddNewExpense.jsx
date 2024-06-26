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
            <input type="text" placeholder="Particulars" ref={inputParticularsRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusBill() }} />
            <input type="number" ref={inputBillRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusDate() }} />
            <input type="date" ref={inputDateRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusRemarks() }} />
            <input type="text" placeholder="Remarks" ref={inputRemarksRef} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}/>
            
            <button onClick={handleSubmit}>Add Expense</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}