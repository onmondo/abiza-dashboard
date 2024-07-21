import React, { useEffect, useRef, useState, useLayoutEffect, useContext } from "react"
// import { useLocation, useNavigate } from "react-router-dom";
import { updateExpenditure, getExpenditureById } from "../../../integrations/CapitalExpenditures"
import { DashboardContext } from "../../../context/DashboardContext"

export function UpdateExpenseModal() {
    // const location = useLocation()
    // const expenditureId = location.pathname.split("/")[2]
    // const navigate = useNavigate()
    const { searchDate, expenseId, openBookingForm, setOpenBookingForm } = useContext(DashboardContext)
    
    const [expenditure, setExpenditure] = useState({})

    const inputParticularsRef = useRef("")
    const inputDateRef = useRef(new Date())
    const inputBillRef = useRef(0)
    const inputRemarksRef = useRef("")

    useLayoutEffect(() => {
        if (expenseId) {
            getExpenditureById(setExpenditure, expenseId)
        }
    }, [expenseId])


    useEffect(() => {
        inputParticularsRef.current.value = expenditure.particulars
        inputDateRef.current.value = expenditure.date
        inputBillRef.current.value = expenditure.totalBill
        inputRemarksRef.current.value = expenditure.remarks
    }, [expenditure])

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

        await updateExpenditure(expenditure._id, searchDate, { 
            date: inputDate,
            particulars: inputParticulars,
            totalBill: Number(inputBill),
            remarks: inputRemarks
        })
        
        setOpenBookingForm(!openBookingForm)
        // navigate("/", { state: location.state})
    }

    // console.log(expenditure)
    return (
        <div id="editexpenseform" popover="">
            <section>
                <header>
                    <h1>Update expense</h1>
                </header>
            <label htmlFor="particulars">Particulars</label>
            <input type="text" placeholder="Particulars" ref={inputParticularsRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusBill() }} />
            <label htmlFor="bill">Bill</label>
            <input type="number" ref={inputBillRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusDate() }} />
            <label htmlFor="billingdate">Date</label>
            <input type="date" ref={inputDateRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusRemarks() }} />
            <label htmlFor="remarks">Remarks</label>
            <input type="text" placeholder="Remarks" ref={inputRemarksRef} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }} />                
            <p>
            <button popovertarget="editexpenseform" onClick={handleSubmit}>Update</button>
            <button className="cancel" popovertarget="editexpenseform">Cancel</button>                
            </p>
            </section>
        </div>
    )
}