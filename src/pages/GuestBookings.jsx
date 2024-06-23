import React, { useState, useEffect  } from "react";
import { deleteBooking, fetchAllBookings } from "../integrations/GuestBookings";
import { Link } from "react-router-dom";

export function GuestBookings() {
    const [bookings, setBookings] = useState([])
    const [searchDate, setSearchDate] = useState("")

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

    return (
        <div className="guestbookings">
            <h1>Guest bookings</h1>
            <input type="date" onChange={handleOnChange}></input>
            <ul className="listguestbookings">
                {bookings.map(booking => 
                    <li key={booking._id} className="book">
                        <article className="guestbooking">
                            <h2>{booking.guestName}</h2>
                            <p>
                                Booked {booking.rooms.join(" and ")} from {booking.from}, {booking.checkIn}, {booking.checkOut}
                            </p>
                            <button className="delete" onClick={() => handleDelete(booking._id)}>Delete booking</button>
                            <button className="update"><Link to={`/update/${booking._id}`}>Update booking</Link></button>
                        </article>
                    </li>
                )}
            </ul>
            <button><Link to="/add">Add new booking</Link></button>
        </div>
    )
}
