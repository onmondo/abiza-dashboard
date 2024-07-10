import React, { useState, useEffect, useContext } from "react";
import { getBookingId, updateBooking } from "../../../integrations/GuestBookings";
import { inputs } from "./inputs";
import { DashboardContext } from "../../../context/DashboardContext";
import { BookingInput } from "../../BookingInput";
import Big from "big.js";

export function UpdateBookingModal() {
    const [booking, setBooking] = useState({
        guestName: "",
        from: "",
        rooms: [],
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
    const { bookingFormId, openBookingForm, setOpenBookingForm } = useContext(DashboardContext)

    useEffect(() => {
        if(bookingFormId) {
            getBookingId(setBooking, bookingFormId)
        }
    }, [bookingFormId])

    const handleOnChange = (e) =>{
        setBooking((prev) => {
            if (e.target.name === "rooms") {
                const enteredRooms = e.target.value.split(",")
                return {
                    ...prev, 
                    [e.target.name]: enteredRooms
                }
            } else if (e.target.name === "checkIn") {
                return {
                    ...prev, 
                    [e.target.name]: e.target.value,
                    checkOut: e.target.value,
                    datePaid: e.target.value
                }
            } else if (e.target.name === "nightlyPrice") {
                return {
                    ...prev, 
                    [e.target.name]: e.target.value,
                    totalPayout: e.target.value
                }
            } else if (e.target.name === "noOfPax") {
                const noOfPax = (e.target.value.length > 0) ? e.target.value : 0
                const bigNoOfPax =  (noOfPax == 1) ? Big(noOfPax) : Big(noOfPax).minus(Big(1))
                const bigNightlyPrice = Big(booking.nightlyPrice)
                const totalPayout = (noOfPax > 2) 
                    ? bigNoOfPax.times(bigNightlyPrice).toNumber()
                    : bigNightlyPrice.times(Big(1)).toNumber()
                return {
                    ...prev, 
                    [e.target.name]: noOfPax,
                    totalPayout
                }
            } else if (e.target.name === "noOfStay") {
                const noOfStay = (e.target.value.length > 0) ? e.target.value : 0
                const bigNoOfPax = (booking.noOfPax == 1) ? Big(booking.noOfPax) : Big(booking.noOfPax).minus(Big(1))
                const bigNightlyPrice = Big(booking.nightlyPrice)
                const totalPayout = bigNoOfPax.times(bigNightlyPrice).times(Big(noOfStay)).toNumber()
                return {
                    ...prev, 
                    [e.target.name]: noOfStay,
                    totalPayout
                }                  
            } else {
                return {
                    ...prev, 
                    [e.target.name]: e.target.value}
            }
            
        })
    }

    const handleUpdateBooking = async (e) => {
        await updateBooking(bookingFormId, booking)
        setOpenBookingForm(!openBookingForm)
    }

    return (
        <div id="updatebookingform" popover="">
            <header><h1>Update booking</h1></header>
            <section className="bookingentry">
            {inputs.map((input, i) => {
                let value = booking[input.name]
                if (input.name === "checkIn" || input.name === "checkOut" || input.name === "datePaid") {
                    value = booking[input.name].split("T")[0]
                }
                
                return (
                    <BookingInput key={i} {...input} onChange={handleOnChange} value={value}/>
                )
            })}
            </section>
            <p>
                <button popovertarget="updatebookingform" onClick={handleUpdateBooking}>Update</button>
                <button className="cancel" popovertarget="updatebookingform" >Close</button>
            </p>
        </div>
    )
}
