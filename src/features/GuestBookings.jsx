import React, { useState, useEffect  } from "react";
import { deleteBooking, fetchAllBookings } from "../integrations/GuestBookings";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function GuestBookings() {
    const location = useLocation()

    const [bookings, setBookings] = useState([])
    const [searchDate, setSearchDate] = useState(location.state?.searchDate)

    useEffect(() => {
        fetchAllBookings(setBookings, searchDate)
    }, [searchDate])

    const handleOnChange = (e) =>{
        setSearchDate(e.target.value)
    }

    const handleDelete = async (bookingId) => {
        await deleteBooking(searchDate, bookingId)
        await fetchAllBookings(setBookings, searchDate)
    }

    const navigate = useNavigate()
    
    const handleNewBooking = () => {
        navigate("/add", { state: { searchDate }})
    }

    const handleUpdateBooking = (bookingId) => {
        navigate(`/update/${bookingId}`, { state: { searchDate }})
    }
    return (
        <section className="guestbooking">
            <header>
                <h1>Guest bookings</h1>
                <label>Search Date</label>
                <input type="month" onChange={handleOnChange} value={searchDate} />
            </header>
            <button className="newbooking" onClick={handleNewBooking}>Add new booking</button>
            <ul className="guestbookinglist">
                {bookings.map(booking => {
                    const checkInDate = new Intl.DateTimeFormat('en', {
                        dateStyle: 'full',
                      }).format(new Date(booking.checkIn))
                    const checkOutDate = new Intl.DateTimeFormat('en', {
                        dateStyle: 'full',
                        }).format(new Date(booking.checkOut))
                    const datePaid = new Intl.DateTimeFormat('en', {
                        dateStyle: 'full',
                        }).format(new Date(booking.datePaid))
                    const amountFormatter = new Intl.NumberFormat("PH", {
                        style: "currency",
                        currency: "PHP",
                        });
                    return (
                        <li key={booking._id} className="guestbookingitem">
                            <article className="guestbookingdetails">
                                <h3>{booking.guestName}</h3>
                                <p>Booked in {booking.rooms.join(" and ")} from {booking.from}, {booking.noOfPax} pax, {booking.noOfStay} night/s of stay for a nightly price of {amountFormatter.format(booking.nightlyPrice)}</p>
                                <p>The guest checked-in {checkInDate} <input type="date" readOnly value={booking.checkIn.split("T")[0]} /> and checked-out {checkOutDate} <input type="date" readOnly value={booking.checkOut.split("T")[0]} />.</p>
                                {
                                (booking.remarks.toLowerCase().includes('confirmed')) 
                                    ? <p>The guest confirmed payment using {booking.modeOfPayment} as mode of payment on {datePaid} <input type="date" readOnly value={booking.datePaid.split("T")[0]} /> for a total of {amountFormatter.format(booking.totalPayout)}.</p>
                                    : <p>The guest have not confirmed on payment yet</p>
                                }
                                <button className="delete" onClick={() => handleDelete(booking._id)}>Delete booking</button>
                                <button className="updatebooking" onClick={() => handleUpdateBooking(booking._id)}>Update booking</button>
                            </article>
                        </li>
                    )
                })}
            </ul>
            <button className="newbooking" onClick={handleNewBooking}>Add new booking</button>
        </section>
    )
}
