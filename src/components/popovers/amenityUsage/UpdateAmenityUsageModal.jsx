import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { DashboardContext } from "../../../context/DashboardContext";
import { getBookingId, updateAmenityIncome } from "../../../integrations/GuestBookings";

export function UpdateAmenityUsageModal() {
    const [booking, setBooking] = useState({
        amenityUsage: [],
    })

    const inputParticularsRef = useRef("")
    const inputDatePaidRef = useRef(new Date())
    const inputAmountPaidRef = useRef(0)

    const { searchDate, openBookingForm, setOpenBookingForm, bookingFormId, amenityId } = useContext(DashboardContext)

    useLayoutEffect(() => {
        if(bookingFormId) {
            getBookingId(setBooking, bookingFormId)
        }
    }, [bookingFormId, openBookingForm])

    useEffect(() => {
        if (booking.amenityUsage && booking.amenityUsage.length > 0) {
            console.log("booking.amenityUsage", booking.amenityUsage, bookingFormId, amenityId)
            const selectedAmenity = booking.amenityUsage.find((amenity) => amenity._id === amenityId)
            console.log("selectedAmenity", selectedAmenity)
            if (selectedAmenity) {
                inputParticularsRef.current.value = selectedAmenity.particulars
                inputDatePaidRef.current.value = selectedAmenity.datePaid.split("T")[0]
                inputAmountPaidRef.current.value = selectedAmenity.amountPaid
            }
        }
    }, [booking])

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

        await updateAmenityIncome(searchDate, { 
            datePaid: inputDatePaid,
            particulars: inputParticulars,
            amountPaid: Number(inputAmountPaid),
        }, bookingFormId, amenityId)

        inputParticularsRef.current.value = ""
        inputDatePaidRef.current.value = new Date()
        inputAmountPaidRef.current.value = 0
        
        setOpenBookingForm(!openBookingForm)
    }

    return (
        <div id="updateamenityusage" popover="">
            <section>
            <header><h1>Add new amenity usage</h1></header>
            <label htmlFor="particulars">Particulars</label>
            <input type="text" placeholder="Particulars" ref={inputParticularsRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusAmountPaid() }} />
            <label htmlFor="bill">Bill</label>
            <input type="number" ref={inputAmountPaidRef} onKeyDown={(e) => { if (e.key === "Enter") handleFocusDatePaid() }} />
            <label htmlFor="billingdate">Date</label>
            <input type="date" ref={inputDatePaidRef} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }} />

            <p>
            <button popovertarget="updateamenityusage" onClick={handleSubmit}>Update</button>
            <button className="cancel" popovertarget="updateamenityusage">Cancel</button>                
            </p>            
            </section>
        </div>
    )
}