import React, { useState, useEffect } from "react";
import { getBookingId, updateBooking } from "../integrations/GuestBookings";
import { useLocation, useNavigate } from "react-router-dom";

export function UpdateBooking() {
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
    const bookingId = location.pathname.split("/")[2]

    useEffect(() => {
        getBookingId(setBooking, bookingId)
    }, [])    

    const handleOnChange = (e) =>{
        setBooking((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleUpdateBooking = async (e) => {
        e.preventDefault()
        await updateBooking(bookingId, booking)
        navigate("/", { state: location.state})
    }

    const handleCancelBooking = async (e) => {
        e.preventDefault()
        navigate("/", { state: location.state})
    }

    return (
        <div className="form">
            <section>
            <h1>Update booking</h1>
            <label htmlFor="guestName">Guest Name</label>
            <input type="text" placeholder="Guest Name" onChange={handleOnChange} name="guestName" value={booking.guestName} />
            <label htmlFor="from">Booking From</label>
            <input type="text" placeholder="Booking From" onChange={handleOnChange} name="from" value={booking.from} />
            <label htmlFor="rooms">Room/s Taken</label>
            <input type="text" placeholder="Room/s Taken" onChange={handleOnChange} name="rooms" value={booking.rooms} />
            <label htmlFor="checkIn">Check In Date</label>
            <input type="date" placeholder="Check In Date" onChange={handleOnChange} name="checkIn" value={(booking.checkIn) ? booking.checkIn.split("T")[0]: ""} />
            <label htmlFor="checkOut">Check Out Date</label>
            <input type="date" placeholder="Check Out Date" onChange={handleOnChange} name="checkOut" value={(booking.checkOut) ? booking.checkOut.split("T")[0]: ""} />
            <label htmlFor="nightlyPrice">Nightly Price</label>
            <input type="number" placeholder="Nightly Price" onChange={handleOnChange} name="nightlyPrice" value={booking.nightlyPrice} />
            <label htmlFor="noOfPax">No of Pax</label>
            <input type="number" placeholder="No of Pax" onChange={handleOnChange} name="noOfPax" value={booking.noOfPax} />
            <label htmlFor="noOfStay">No of Stay</label>
            <input type="number" placeholder="No of Stay" onChange={handleOnChange} name="noOfStay" value={booking.noOfStay} />
            <label htmlFor="totalPayout">Total Payment</label>
            <input type="number" placeholder="Total Payment" onChange={handleOnChange} name="totalPayout" value={booking.totalPayout} />
            <label htmlFor="datePaid">Date Paid</label>
            <input type="date" placeholder="Date Paid" onChange={handleOnChange} name="datePaid" value={(booking.datePaid) ? booking.datePaid.split("T")[0]: ""} />
            <label htmlFor="modeOfPayment">Mode of Payment</label>
            <input type="text" placeholder="Mode of Payment" onChange={handleOnChange} name="modeOfPayment" value={booking.modeOfPayment} />
            <label htmlFor="remarks">Remarks</label>
            <input type="text" placeholder="Remarks" onChange={handleOnChange} name="remarks" value={booking.remarks} />
            <p>
            <button onClick={handleUpdateBooking}>Update</button>
            <button onClick={handleCancelBooking}>Cancel</button>
            </p>
            </section>

        </div>
    )
}
