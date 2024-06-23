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
        <div className="guestbookings">
            <h1>Guest bookings</h1>
            <label>Search Date</label>
            <input type="date" onChange={handleOnChange} value={location.state?.searchDate} />
            <ul className="listguestbookings">
                {bookings.map(booking => 
                    <li key={booking._id} className="book">
                        <article className="guestbooking">
                            <h2>{booking.guestName}</h2>
                            <p>
                                Booked {booking.rooms.join(" and ")} from {booking.from}, {booking.checkIn}, {booking.checkOut}
                            </p>
                            <button className="delete" onClick={() => handleDelete(booking._id)}>Delete booking</button>
                            <button className="updatebooking" onClick={() => handleUpdateBooking(booking._id)}>Update booking</button>
                        </article>
                    </li>
                )}
            </ul>
            <button className="newbooking" onClick={handleNewBooking}>Add new booking</button>
        </div>
    )
}
