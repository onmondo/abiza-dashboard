import React, { useState, useEffect, useMemo, useContext, forwardRef, useImperativeHandle } from "react";
import { deleteBooking, fetchAllBookings } from "../integrations/GuestBookings";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import { amountFormatter, computeTotalRevenue } from "../util/currency"

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
        <section className="dashboardbox">
            <header className="dashboardheader">
                <h1>{totalBookings} total guest bookings this month</h1>
                <p>
                    with the total revenue of&nbsp; <strong title="totalrevenue">{amountFormatter.format(getTotalRevenue)}</strong> <button className="newbooking" onClick={handleNewBooking}>Add new booking</button>
                </p>
                <input type="text" placeholder="Search..." className="searchbox" onChange={(e) => setQuery(e.target.value.toLowerCase())} /> <br />
                
            </header>
            <section>
                
                <ol className="guestbookinglist">
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
                                <article className="dashboarddetails">
                                    <header>
                                    <h3>{booking.guestName}, {booking.rooms.join(" and ")}</h3>
                                    <sub>Booked from {booking.from}, {booking.noOfPax} pax, {booking.noOfStay} night/s of stay</sub><br />
                                    <sub>Checked-in: {checkInDate}</sub><br />
                                    <sub>Checked-out: {checkOutDate}</sub>
                                    </header>
                                    {/* <input type="date" readOnly value={booking.checkIn.split("T")[0]} /> */}
                                    {/* <input type="date" readOnly value={booking.checkOut.split("T")[0]} /> */}
                                    {
                                    (booking.remarks.toLowerCase().includes('confirmed')) 
                                        ?   <section className="confirmed">
                                                <h3>{amountFormatter.format(booking.totalPayout)}</h3>
                                                <sub>Paid {booking.modeOfPayment} on {datePaid}</sub><br />
                                                <sub>Nightly price of {amountFormatter.format(booking.nightlyPrice)}</sub>
                                            </section> 
                                        :   ""
                                    }
                                    {/* <input type="date" readOnly value={booking.datePaid.split("T")[0]} /> */}
                                </article>
                                <p className="buttongroup">
                                    <button className="update" onClick={() => handleUpdateBooking(booking._id)}>Update</button>
                                    <button className="delete" onClick={() => handleDelete(booking._id)}>Delete</button>
                                </p>
                            </li>
                        )
                    })}
                </ol>
                
            </section>
        </section>
    )
}
