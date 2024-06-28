import React, { useState } from "react";
import { addNewBooking } from "../integrations/GuestBookings";
import { useLocation, useNavigate } from "react-router-dom";

export function AddNewBooking() {
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
            
            <section>
            <header><h1>Add new booking</h1></header>
            <label htmlFor="guestName">Guest Name</label>
            <input type="text" placeholder="Guest Name" onChange={handleOnChange} name="guestName" />
            <label htmlFor="from">Booking From</label>
            <input type="text" placeholder="Booking From" onChange={handleOnChange} name="from" />
            <label htmlFor="rooms">Room/s Taken</label>
            <input type="text" placeholder="Room/s Taken" onChange={handleOnChange} name="rooms" />
            <label htmlFor="checkIn">Check In Date</label>
            <input type="date" placeholder="Check In Date" onChange={handleOnChange} name="checkIn" />
            <label htmlFor="checkOut">Check Out Date</label>
            <input type="date" placeholder="Check Out Date" onChange={handleOnChange} name="checkOut" />
            <label htmlFor="nightlyPrice">Nightly Price</label>
            <input type="number" placeholder="Nightly Price" onChange={handleOnChange} name="nightlyPrice" />
            <label htmlFor="noOfPax">No of Pax</label>
            <input type="number" placeholder="No of Pax" onChange={handleOnChange} name="noOfPax" />
            <label htmlFor="noOfStay">No of Stay</label>
            <input type="number" placeholder="No of Stay" onChange={handleOnChange} name="noOfStay" />
            <label htmlFor="totalPayout">Total Payment</label>
            <input type="number" placeholder="Total Payment" onChange={handleOnChange} name="totalPayout" />
            <label htmlFor="datePaid">Date Paid</label>
            <input type="date" placeholder="Date Paid" onChange={handleOnChange} name="datePaid" />
            <label htmlFor="modeOfPayment">Mode of Payment</label>
            <input type="text" placeholder="Mode of Payment" onChange={handleOnChange} name="modeOfPayment" />
            <label htmlFor="remarks">Remarks</label>
            <input type="text" placeholder="Remarks" onChange={handleOnChange} name="remarks" />
            <p>
            <button onClick={handleNewBooking}>Add</button>
            <button className="cancel" onClick={handleCancelBooking}>Cancel</button>                
            </p>
            </section>

        </div>
    )
}
