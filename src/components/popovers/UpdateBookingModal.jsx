import React, { useState, useEffect, useContext } from "react";
import { getBookingId, updateBooking } from "../../integrations/GuestBookings";
import { inputs } from "./inputs";
import { DashboardContext } from "../../context/DashboardContext";
import { BookingInput } from "../BookingInput";

export function UpdateBookingModal() {
    const [booking, setBooking] = useState({
        guestName: "",
        from: "",
        rooms: "",
        checkIn: "",
        checkOut: "",
        nightlyPrice: 0,
        noOfPax: 0,
        noOfStay: 0,
        totalPayout: 0,
        datePaid: "",
        modeOfPayment: "",
        remarks: ""
    })
    const { bookingFormId, openBookingForm, setOpenBookingForm } = useContext(DashboardContext)

    useEffect(() => {
        if(bookingFormId) {
            getBookingId(setBooking, bookingFormId)
        }
    }, [bookingFormId])

    const handleOnChange = (e) =>{
        setBooking((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleUpdateBooking = async (e) => {
        await updateBooking(bookingFormId, booking)
        setOpenBookingForm(!openBookingForm)
    }

    return (
        <div id="updatebookingform" popover="">
            <header><h1>Update booking</h1></header>
            <section className="bookingentry">
            {inputs.map((input, i) => {
                let value = booking[input.name]
                if (input.name === "checkIn" || input.name === "checkOut" || input.name === "datePaid") {
                    value = booking[input.name].split("T")[0]
                }
                
                return (
                    <BookingInput key={i} {...input} onChange={handleOnChange} value={value}/>
                )
            })}
            </section>
            <p>
                <button popovertarget="updatebookingform" onClick={handleUpdateBooking}>Update</button>
                <button className="cancel" popovertarget="updatebookingform" >Close</button>
            </p>
        </div>
    )
}
