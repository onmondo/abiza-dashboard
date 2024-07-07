import React, { useState, useEffect, useMemo, useContext, forwardRef, useImperativeHandle } from "react";
import { deleteBooking, fetchAllBookings } from "../integrations/GuestBookings";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import { amountFormatter, computeTotalRevenue } from "../util/currency"
import { computeFilteredList } from "../util/search";
import { AddNewBookingModal } from "../components/popovers/AddNewBookingModal";
import { UpdateBookingModal } from "../components/popovers/UpdateBookingModal";

export function GuestBookings() {
    const searchKeys = ["guestName", "from", "rooms", "modeOfPayment", "remarks"]
    const [bookings, setBookings] = useState([])
    const [totalBookings, setTotalBookings] = useState(0)
    const { searchDate, openBookingForm, setOpenBookingForm, setBookingFormId } = useContext(DashboardContext)
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchAllBookings(setBookings, setTotalBookings, searchDate)
    }, [searchDate, openBookingForm])

    const handleDelete = async (bookingId) => {
        await deleteBooking(searchDate, bookingId)
        await fetchAllBookings(setBookings, setTotalBookings, searchDate)
    }

    const navigate = useNavigate()
    
    // const handleNewBooking = () => {
    //     // navigate("/add", { state: { searchDate }})
    //     setOpenBookingForm(!openBookingForm)
    // }

    const handleUpdateBooking = (bookingId) => {
        // navigate(`/update/${bookingId}`, { state: { searchDate }})
        // setOpenBookingForm(!openBookingForm)
        setBookingFormId(bookingId)
    }

    const getTotalRevenue = useMemo(() => computeTotalRevenue(bookings), [bookings])
    const getFilteredBookings = useMemo(() => computeFilteredList(bookings, searchKeys, query), [bookings, query])

    return (
        <section className="dashboardbox">
            <header className="dashboardheader">
                <h1>📅 {totalBookings} total guest bookings this month</h1>
                <p>
                    with the total revenue of&nbsp; <strong title="totalrevenue">{amountFormatter.format(getTotalRevenue)}</strong> 
                    &nbsp;
                    <button 
                        popovertarget="newbookingform" 
                        className="newbooking" 
                        // onClick={handleNewBooking}
                    >
                            Add new booking
                    </button>
                </p>
                <input type="text" placeholder="Search..." className="searchbox" onChange={(e) => setQuery(e.target.value.toLowerCase())} /> <br />
                <sub>found {getFilteredBookings.length} records</sub> 
            </header>
            <AddNewBookingModal />
            <section>            
                <ol className="guestbookinglist">
                    {getFilteredBookings
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
                                    <sub>From {booking.from}, {booking.noOfPax} pax, {booking.noOfStay} night/s of stay</sub><br />
                                    <sub>Checked-in: {checkInDate}</sub><br />
                                    <sub>Checked out: {checkOutDate}</sub>
                                    </header>
                                    {/* <input type="date" readOnly value={booking.checkIn.split("T")[0]} /> */}
                                    {/* <input type="date" readOnly value={booking.checkOut.split("T")[0]} /> */}
                                    {
                                    (booking.remarks.toLowerCase().includes('pending')) 
                                        ?   <section className="deliquent">
                                                <h3>{amountFormatter.format(booking.totalPayout)}</h3>
                                                <sub>Nightly price of {amountFormatter.format(booking.nightlyPrice)}</sub>
                                            </section>
                                        :   <section className="confirmed">
                                                <h3>{amountFormatter.format(booking.totalPayout)}</h3>
                                                <sub>Paid {booking.modeOfPayment} on {datePaid}</sub><br />
                                                <sub>Nightly price of {amountFormatter.format(booking.nightlyPrice)}</sub>
                                            </section> 
                                    }
                                    {/* <input type="date" readOnly value={booking.datePaid.split("T")[0]} /> */}
                                </article>
                                <p className="buttongroup">
                                    <button className="update" popovertarget="updatebookingform" onClick={() => handleUpdateBooking(booking._id)}>Update</button>
                                    <button className="delete" onClick={() => handleDelete(booking._id)}>Delete</button>
                                </p>
                            </li>
                        )
                    })}
                </ol>
                <UpdateBookingModal />
            </section>
        </section>
    )
}
