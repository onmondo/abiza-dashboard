import React, { useContext, useLayoutEffect, useState } from "react";
import { addNewBooking } from "../../../integrations/GuestBookings";
import { BookingInput } from "../../BookingInput";
import { DashboardContext } from "../../../context/DashboardContext";
import { inputs } from "./inputs";
import Big from "big.js";

const defaultBookingState = {
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
}

export function AddNewBookingModal() {
    const [booking, setBooking] = useState(defaultBookingState)

    const { openBookingForm, setOpenBookingForm } = useContext(DashboardContext)

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

    const handleNewBooking = async (e) => {
        await addNewBooking(booking)
        // navigate("/", { state: location.state})
        setOpenBookingForm(!openBookingForm)
        setBooking(defaultBookingState)
    }

    return (
        <div id="newbookingform" popover="">
            <header><h1>Add new booking</h1></header>
            <section className="bookingentry">
            {inputs.map((input, i) => 
                <BookingInput key={i} {...input} onChange={handleOnChange} value={booking[input.name]}/>
            )}
            </section>
            <p>
                <button popovertarget="newbookingform" onClick={handleNewBooking}>Add new booking</button>
                <button className="cancel" popovertarget="newbookingform" >Close</button>
            </p>
            

        </div>
    )
}
