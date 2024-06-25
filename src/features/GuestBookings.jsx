import React, { useState, useEffect  } from "react";
import { deleteBooking, fetchAllBookings } from "../integrations/GuestBookings";
import { useLocation, useNavigate } from "react-router-dom";
import Big from "big.js";

export function GuestBookings() {
    const location = useLocation()

    const now = new Date()
    const currentYear = Intl.DateTimeFormat('en', { year: "numeric"}).format(now)
    const currentMonth = Intl.DateTimeFormat('en', { month: "numeric"}).format(now)
    const currentDate = (location.state?.searchDate) ? location.state.searchDate : `${currentYear}-${(currentMonth.length > 1) ? currentMonth : `0${currentMonth}`}`;
    
    const searchKeys = ["guestName", "from", "rooms", "modeOfPayment", "remarks"]
    const [bookings, setBookings] = useState([])
    const [totalBookings, setTotalBookings] = useState(0)
    const [searchDate, setSearchDate] = useState(currentDate)
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchAllBookings(setBookings, setTotalBookings, searchDate)
    }, [searchDate])

    const handleOnChange = (e) =>{
        setSearchDate(e.target.value)
    }

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

    const amountFormatter = new Intl.NumberFormat("PH", {
        style: "currency",
        currency: "PHP",
    });

    return (
        <section className="guestbooking">
            <header>
                <h1>Guest bookings</h1>
                <p>
                    {totalBookings} total bookings this month of&nbsp;
                    <input title="monthselector" type="month" onChange={handleOnChange} value={searchDate} />
                </p>
                <p>
                with the total revenue of&nbsp;
                    <strong title="totalrevenue">
                        {amountFormatter.format(bookings.reduce((total, booking) => {
                            const bigTotal = Big(total)
                            const bigPayout = Big(booking.totalPayout)
                            total =  bigTotal.plus(bigPayout).toNumber()
                            return total
                        }
                        , 0))}
                    </strong>
                </p>
                <input type="text" placeholder="Search..." className="searchbox" onChange={(e) => setQuery(e.target.value.toLowerCase())} /> <br />
                <button className="newbooking" onClick={handleNewBooking}>Add new booking</button>
            </header>
            <section>
                
                <ul className="guestbookinglist">
                    {bookings
                        // .filter(booking => booking.guestName.toLowerCase().includes(query)) 
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
                                        ? <p>The guest confirmed payment using {booking.modeOfPayment} as mode of payment on {datePaid} <input type="date" readOnly value={booking.datePaid.split("T")[0]} /> for a total of <strong>{amountFormatter.format(booking.totalPayout)}</strong>.</p>
                                        : <p>The guest have not confirmed on payment yet</p>
                                    }
                                    <button className="delete" onClick={() => handleDelete(booking._id)}>Delete booking</button>
                                    <button className="updatebooking" onClick={() => handleUpdateBooking(booking._id)}>Update booking</button>
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
