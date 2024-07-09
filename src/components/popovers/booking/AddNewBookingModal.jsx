import React, { useContext, useState } from "react";
import { addNewBooking } from "../../../integrations/GuestBookings";
import { BookingInput } from "../../BookingInput";
import { DashboardContext } from "../../../context/DashboardContext";
import { inputs } from "./inputs";
// import { useLocation, useNavigate } from "react-router-dom";


export function AddNewBookingModal() {
    const [booking, setBooking] = useState({
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
    })

    const { openBookingForm, setOpenBookingForm } = useContext(DashboardContext)

    const handleOnChange = (e) =>{
        setBooking((prev) => {
            if (e.target.name === "rooms") {
                const enteredRooms = e.target.value.split(",")
                return {
                    ...prev, 
                    [e.target.name]: enteredRooms
                }
            } else {
                return {
                    ...prev, 
                    [e.target.name]: e.target.value}
            }
            
        })
    }

    const handleNewBooking = async (e) => {
        await addNewBooking(booking)
        // navigate("/", { state: location.state})
        setOpenBookingForm(!openBookingForm)
    }

    return (
        <div id="newbookingform" popover="">
            <header><h1>Add new booking</h1></header>
            <section className="bookingentry">
            {inputs.map((input, i) => 
                <BookingInput key={i} {...input} onChange={handleOnChange} value={booking[input.name]}/>
            )}
            </section>
            <p>
                <button popovertarget="newbookingform" onClick={handleNewBooking}>Add new booking</button>
                <button className="cancel" popovertarget="newbookingform" >Close</button>
            </p>
            

        </div>
    )
}
