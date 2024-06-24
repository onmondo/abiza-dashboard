import React, { useState } from "react";
import { addNewBooking } from "../integrations/GuestBookings";
import { useLocation, useNavigate } from "react-router-dom";

export function Add() {
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

    const navigate = useNavigate()
    const location = useLocation()

    const handleOnChange = (e) =>{
        setBooking((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleNewBooking = async (e) => {
        e.preventDefault()
        await addNewBooking(booking)
        navigate("/", { state: location.state})
    }

    const handleCancelBooking = async (e) => {
        e.preventDefault()
        navigate("/", { state: location.state})
    }

    return (
        <div className="form">
            <h1>Add new booking</h1>
            <input type="text" placeholder="Guest Name" onChange={handleOnChange} name="guestName" />
            <input type="text" placeholder="Booking From" onChange={handleOnChange} name="from" />
            <input type="text" placeholder="Room/s Taken" onChange={handleOnChange} name="rooms" />
            <input type="date" placeholder="Check In Date" onChange={handleOnChange} name="checkIn" />
            <input type="date" placeholder="Check Out Date" onChange={handleOnChange} name="checkOut" />
            <input type="number" placeholder="Nightly Price" onChange={handleOnChange} name="nightlyPrice" />
            <input type="number" placeholder="No of Pax" onChange={handleOnChange} name="noOfPax" />
            <input type="number" placeholder="No of Stay" onChange={handleOnChange} name="noOfStay" />
            <input type="number" placeholder="Total Payment" onChange={handleOnChange} name="totalPayout" />
            <input type="date" placeholder="Date Paid" onChange={handleOnChange} name="datePaid" />
            <input type="text" placeholder="Mode of Payment" onChange={handleOnChange} name="modeOfPayment" />
            <input type="text" placeholder="Remarks" onChange={handleOnChange} name="remarks" />
            <button onClick={handleNewBooking}>Add</button>
            <button onClick={handleCancelBooking}>Cancel</button>
        </div>
    )
}
