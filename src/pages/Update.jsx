import React, { useState, useEffect } from "react";
import { getBookingId, updateBooking } from "../integrations/GuestBookings";
import { useLocation, useNavigate } from "react-router-dom";

export function Update() {
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

    useEffect(() => {
        const bookingId = location.pathname.split("/")[2]
        getBookingId(setBooking, bookingId)
    }, [])    

    const handleOnChange = (e) =>{
        setBooking((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleUpdateBooking = async (e) => {
        e.preventDefault()
        await updateBooking(booking, bookingId)
        navigate("/")
    }

    const handleCancelBooking = async (e) => {
        e.preventDefault()
        navigate("/",{ state: location.state})
    }

    return (
        <div className="form">
            <h1>Update booking</h1>
            <input type="text" placeholder="Guest Name" onChange={handleOnChange} name="guestName" value={booking.guestName} />
            <input type="text" placeholder="Booking From" onChange={handleOnChange} name="from" value={booking.from} />
            <input type="text" placeholder="Room/s Taken" onChange={handleOnChange} name="rooms" value={booking.rooms} />
            <input type="date" placeholder="Check In Date" onChange={handleOnChange} name="checkIn" value={(booking.checkIn) ? booking.checkIn.split("T")[0]: ""} />
            <input type="date" placeholder="Check Out Date" onChange={handleOnChange} name="checkOut" value={(booking.checkOut) ? booking.checkOut.split("T")[0]: ""} />
            <input type="number" placeholder="Nightly Price" onChange={handleOnChange} name="nightlyPrice" value={booking.nightlyPrice} />
            <input type="number" placeholder="No of Pax" onChange={handleOnChange} name="noOfPax" value={booking.noOfPax} />
            <input type="number" placeholder="No of Stay" onChange={handleOnChange} name="noOfStay" value={booking.noOfStay} />
            <input type="number" placeholder="Total Payment" onChange={handleOnChange} name="totalPayout" value={booking.totalPayout} />
            <input type="date" placeholder="Date Paid" onChange={handleOnChange} name="datePaid" value={(booking.datePaid) ? booking.datePaid.split("T")[0]: ""} />
            <input type="text" placeholder="Mode of Payment" onChange={handleOnChange} name="modeOfPayment" value={booking.modeOfPayment} />
            <input type="text" placeholder="Remarks" onChange={handleOnChange} name="remarks" value={booking.remarks} />
            <button onClick={handleUpdateBooking}>Update</button>
            <button onClick={handleCancelBooking}>Cancel</button>
        </div>
    )
}
