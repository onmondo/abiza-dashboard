import React, { useState, useEffect, useMemo, useContext, forwardRef, useImperativeHandle } from "react";
import { deleteBooking, fetchAllBookings } from "../integrations/GuestBookings";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import { amountFormatter, computeTotalRevenue } from "../util/currency"
import "./GuestBookings.scss"

export function GuestBookings() {
    const searchKeys = ["guestName", "from", "rooms", "modeOfPayment", "remarks"]
    const [bookings, setBookings] = useState([])
    const [totalBookings, setTotalBookings] = useState(0)
    const { searchDate } = useContext(DashboardContext)
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchAllBookings(setBookings, setTotalBookings, searchDate)
    }, [searchDate])

    const handleDelete = async (bookingId) => {
        await deleteBooking(searchDate, bookingId)
        await fetchAllBookings(setBookings, setTotalBookings, searchDate)
    }

    const navigate = useNavigate()
    
    const handleNewBooking = () => {
        navigate("/add", { state: { searchDate }})
    }

    const handleUpdateBooking = (bookingId) => {
        navigate(`/update/${bookingId}`, { state: { searchDate }})
    }

    const getTotalRevenue = useMemo(() => computeTotalRevenue(bookings), [bookings])

    return (
        <section className="guestbooking">
            <header>
                <h1>Guest bookings</h1>
                <p>
                {totalBookings} total bookings this month with the total revenue of&nbsp;
                    <strong title="totalrevenue">{amountFormatter.format(getTotalRevenue)}</strong>
                </p>
                <input type="text" placeholder="Search..." className="searchbox" onChange={(e) => setQuery(e.target.value.toLowerCase())} /> <br />
                <button className="newbooking" onClick={handleNewBooking}>Add new booking</button>
            </header>
            <section>
                
                <ul className="guestbookinglist">
                    {bookings
                        .filter(booking => 
                            searchKeys.some(searchKey => {
                                if (Array.isArray(booking[searchKey])) {
                                    return booking[searchKey].join(",").toLowerCase().includes(query)
                                } else {
                                    return booking[searchKey].toLowerCase().includes(query)
                                }
                            })
                        )
                        .map(booking => {
                        const checkInDate = new Intl.DateTimeFormat('en', {
                            dateStyle: 'full',
                        }).format(new Date(booking.checkIn))
                        const checkOutDate = new Intl.DateTimeFormat('en', {
                            dateStyle: 'full',
                            }).format(new Date(booking.checkOut))
                        const datePaid = new Intl.DateTimeFormat('en', {
                            dateStyle: 'full',
                            }).format(new Date(booking.datePaid))
                        return (
                            <li key={booking._id} className="guestbookingitem">
                                <article className="guestbookingdetails">
                                    <h3>{booking.guestName}</h3>
                                    <p>Booked in {booking.rooms.join(" and ")} from {booking.from}, {booking.noOfPax} pax, {booking.noOfStay} night/s of stay for a nightly price of {amountFormatter.format(booking.nightlyPrice)}</p>
                                    <p>The guest checked-in {checkInDate} <input type="date" readOnly value={booking.checkIn.split("T")[0]} /> and checked-out {checkOutDate} <input type="date" readOnly value={booking.checkOut.split("T")[0]} />.</p>
                                    {
                                    (booking.remarks.toLowerCase().includes('confirmed')) 
                                        ? <p className="confirmed">The guest confirmed payment using {booking.modeOfPayment} as mode of payment on {datePaid} <input type="date" readOnly value={booking.datePaid.split("T")[0]} /> for a total of <strong>{amountFormatter.format(booking.totalPayout)}</strong>.</p>
                                        : <p className="pending">The guest have not confirmed on payment yet</p>
                                    }
                                    <button className="updatebooking" onClick={() => handleUpdateBooking(booking._id)}>Update booking</button>
                                    <button className="deletebooking" onClick={() => handleDelete(booking._id)}>Delete booking</button>
                                </article>
                            </li>
                        )
                    })}
                </ul>
                
            </section>
            <footer>
                <button className="newbooking" onClick={handleNewBooking}>Add new booking</button>
            </footer>
        </section>
    )
}
