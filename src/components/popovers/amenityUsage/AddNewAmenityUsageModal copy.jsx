import React, { useContext, useRef } from "react"
import { DashboardContext } from "../../../context/DashboardContext";
import { addNewAmenityIncome } from "../../../integrations/GuestBookings";

export function AddNewAmenityUsageModal() {
    const inputParticularsRef = useRef("")
    const inputDatePaidRef = useRef(new Date())
    const inputAmountPaidRef = useRef(0)

    const { searchDate, openBookingForm, setOpenBookingForm, bookingFormId } = useContext(DashboardContext)

    const handleFocusDatePaid = () => {
        inputDatePaidRef.current.focus()
    }

    const handleFocusAmountPaid = () => {
        inputAmountPaid.current.focus()
    }

    const handleSubmit = async () => {
        const inputParticulars = inputParticularsRef.current.value
        const inputDatePaid = inputDatePaidRef.current.value
        const inputAmountPaid = inputAmountPaidRef.current.value

        await addNewAmenityIncome(searchDate, [{ 
            datePaid: inputDatePaid,
            particulars: inputParticulars,
            amountPaid: Number(inputAmountPaid),
        }], bookingFormId)

        inputParticularsRef.current.value = ""
        inputDatePaidRef.current.value = new Date()
        inputAmountPaidRef.current.value = 0
        
        setOpenBookingForm(!openBookingForm)
    }

    return (
        <div id="newamenityusage" popover="">
            <section>
            <header><h1>Add new amenity usage</h1></header>
            <label htmlFor="particulars">Particulars</label>
            <input type="text" placeholder="Particulars" ref={inputParticularsRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusAmountPaid() }} />
            <label htmlFor="bill">Bill</label>
            <input type="number" ref={inputAmountPaidRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusDatePaid() }} />
            <label htmlFor="billingdate">Date</label>
            <input type="date" ref={inputDatePaidRef} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }} />

            <p>
            <button popovertarget="newamenityusage" onClick={handleSubmit}>Add</button>
            <button className="cancel" popovertarget="newamenityusage">Cancel</button>                
            </p>            
            </section>
        </div>
    )
}