import React, { useContext, useEffect, useRef, useState } from "react";
import { deleteBooking, getBookingId } from "../../../integrations/GuestBookings";
import { DashboardContext } from "../../../context/DashboardContext";

const defaultBookingState = {
    guestName: "",
    from: "",
    rooms: [],
    checkIn: "",
    checkOut: "",
    nightlyPrice: 0,
    noOfPax: 0,
    noOfStay: 0,
    totalPayout: 0,
    datePaid: "",
    modeOfPayment: "",
    remarks: ""
}

export function DeleteBookingModal() {
    const inputGuestNameRef = useRef("")
    const [booking, setBooking] = useState(defaultBookingState)
    const [buttonActive, setButtonActive] = useState(false)
    const { searchDate, bookingFormId, openBookingForm, setOpenBookingForm } = useContext(DashboardContext)

    useEffect(() => {
        if(bookingFormId) {
            getBookingId(setBooking, bookingFormId)
        }
    }, [bookingFormId])

    const handleGuestNameChange = (e) => {
        if(e.target.value === booking.guestName) {
            setButtonActive(true)
        }
    }

    const handleDeleteBooking = async (e) => {
        await deleteBooking(searchDate, bookingFormId)
        setOpenBookingForm(!openBookingForm)
        inputGuestNameRef.current.value = ""
        setBooking(defaultBookingState)
        setButtonActive(false)
    }

    return (
        <div id="deletebookingform" popover="">
            <header><h1>Delete booking</h1></header>
            <section>
            <label htmlFor="guestName">Type <strong>{booking.guestName}</strong> to confirm removal of booking record.</label>
            <input type="text" name="guestName" ref={inputGuestNameRef} required onChange={handleGuestNameChange} />
            <span>This field is required</span>
            </section>
            <p>
                {
                (buttonActive) 
                    ? <button popovertarget="deletebookingform" onClick={handleDeleteBooking}>Confirm</button>
                    : <button popovertarget="deletebookingform" disabled>Confirm</button>
                }
                <button className="cancel" popovertarget="deletebookingform" >Cancel</button>
            </p>
            

        </div>
    )
}
