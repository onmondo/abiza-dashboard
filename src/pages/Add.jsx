import React, { useState } from "react";
import { addNewBooking } from "../integrations/GuestBookings";
import { useNavigate } from "react-router-dom";

export function Add() {
    const [booking, setBooking] = useState({
        guestName: "",
        from: "",
        rooms: "",
        checkIn: null,
        checkOut: null,
        nightlyPrice: null,
        noOfPax: null,
        noOfStay: null,
        totalPayout: null,
        datePaid: null,
        modeOfPayment: "",
        remarks: ""
    })

    const navigate = useNavigate()

    const handleOnChange = (e) =>{
        setBooking((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleNewBooking = async (e) => {
        e.preventDefault()
        await addNewBooking(booking)
        navigate("/")
    }

    const handleCancelBooking = async (e) => {
        e.preventDefault()
        navigate("/")
    }

    console.log(booking)
    return (
        <div className="form">
            <h1>Add new booking</h1>
            <input type="text" placeholder="Guest Name" onChange={handleOnChange} name="guestName"></input>
            <input type="text" placeholder="Booking From" onChange={handleOnChange} name="from"></input>
            <input type="text" placeholder="Room/s Taken" onChange={handleOnChange} name="rooms"></input>
            <input type="date" placeholder="Check In Date" onChange={handleOnChange} name="checkIn"></input>
            <input type="date" placeholder="Check Out Date" onChange={handleOnChange} name="checkOut"></input>
            <input type="number" placeholder="Nightly Price" onChange={handleOnChange} name="nightlyPrice"></input>
            <input type="number" placeholder="No of Pax" onChange={handleOnChange} name="noOfPax"></input>
            <input type="number" placeholder="No of Stay" onChange={handleOnChange} name="noOfStay"></input>
            <input type="number" placeholder="Total Payment" onChange={handleOnChange} name="totalPayout"></input>
            <input type="date" placeholder="Date Paid" onChange={handleOnChange} name="datePaid"></input>
            <input type="text" placeholder="Mode of Payment" onChange={handleOnChange} name="modeOfPayment"></input>
            <input type="text" placeholder="Remarks" onChange={handleOnChange} name="remarks"></input>
            <button onClick={handleNewBooking}>Add</button>
            <button onClick={handleCancelBooking}>Cancel</button>
        </div>
    )
}
