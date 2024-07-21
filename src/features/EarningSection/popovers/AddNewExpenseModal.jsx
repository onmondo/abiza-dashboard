import React, { useContext, useRef } from "react"
import { DashboardContext } from "../../../context/DashboardContext";
import { addNewExpenditure } from "../../../integrations/CapitalExpenditures";
import { BookingInputRef } from "../../../components/BookingInputRef";

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
        const inputParticulars = inputParticularsRef.current.getValue()
        const inputDate = inputDateRef.current.getValue()
        const inputBill = inputBillRef.current.getValue()
        const inputRemarks = inputRemarksRef.current.getValue()

        await addNewExpenditure(searchDate, { 
            date: inputDate,
            particulars: inputParticulars,
            totalBill: Number(inputBill),
            remarks: inputRemarks
        })
        
        inputParticularsRef.current.changeValue("")
        inputDateRef.current.changeValue(new Date())
        inputBillRef.current.changeValue(0)
        inputRemarksRef.current.changeValue("")
        
        setOpenBookingForm(!openBookingForm)
    }

    return (
        <div id="newexpenseform" popover="">
            <section>
            <header><h1>Add new expense</h1></header>
            <BookingInputRef 
                name="particulars"
                type="text" 
                label="Particulars" 
                placeholder="Particulars" 
                ref={inputParticularsRef} 
                onKeyDown={(e) => { if (e.key === "Enter") handleFocusBill() }} 
                required={true} 
                onChange={(e) => { inputParticularsRef.current.changeValue(e.target.value) }}
            />
            <BookingInputRef 
                name="bill"
                type="number" 
                label="Bill" 
                placeholder="Bill" 
                ref={inputBillRef} 
                onKeyDown={(e) => { if (e.key === "Enter") handleFocusDate() }}
                required={true} 
                onChange={(e) => { inputBillRef.current.changeValue(e.target.value) }}
            />
            <BookingInputRef 
                name="billingdate"
                type="date"
                label="Date" 
                ref={inputDateRef} 
                onKeyDown={(e) => { if (e.key === "Enter") handleFocusRemarks() }}
                required={true} 
                onChange={(e) => { inputDateRef.current.changeValue(e.target.value) }}
            />
            <BookingInputRef 
                name="remarks"
                type="text" 
                label="Remarks" 
                placeholder="Remarks" 
                ref={inputRemarksRef} 
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
                required={true} 
                onChange={(e) => { inputRemarksRef.current.changeValue(e.target.value) }}
            />            
            <p>
            <button popovertarget="newexpenseform" onClick={handleSubmit}>Add</button>
            <button className="cancel" popovertarget="newexpenseform">Cancel</button>                
            </p>            
            </section>
        </div>
    )
}