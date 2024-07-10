export const inputs = [
    {
        name: "guestName",
        type: "text",
        placeholder: "Guest Name",
        label: "Guest Name",
        errorSpiel: "Guest name must be atleast 3 to 16 letters",
        pattern: "^[a-zA-Z\s-]{3,16}$",
        required: true
    },
    {
        name: "from",
        type: "text",
        placeholder: "Booking From",
        label: "Booking From",
        errorSpiel: "Booking from is required",
        required: true
    },
    {
        name: "rooms",
        type: "text",
        placeholder: "Room/s Taken",
        label: "Room/s Taken",
        errorSpiel: "Room is required",
        required: true
    },
    {
        name: "checkIn",
        type: "date",
        placeholder: "Check-in Date",
        label: "Check-inn Date",
        errorSpiel: "Check-in date is required",
        required: true
    },
    {
        name: "checkOut",
        type: "date",
        placeholder: "Check out Date",
        label: "Check out Date",
        errorSpiel: "Check out date is required",
        required: true
    },
    {
        name: "nightlyPrice",
        type: "number",
        placeholder: "Nightly Price",
        label: "Nightly Price",
        errorSpiel: "Nightly price is required",
    },
    {
        name: "noOfPax",
        type: "number",
        placeholder: "No of Pax",
        label: "No of Pax",
        errorSpiel: "No of pax is required",
        required: true
    },
    {
        name: "noOfStay",
        type: "number",
        placeholder: "No of Stay",
        label: "No of Stay",
        errorSpiel: "No of stay is required",
        required: true
    },
    {
        name: "totalPayout",
        type: "number",
        placeholder: "Total Payment",
        label: "Total Payment",
        errorSpiel: "Total payment is required",
    },
    {
        name: "datePaid",
        type: "date",
        placeholder: "Date Paid",
        label: "Date Paid",
        errorSpiel: "Date paid is required",
    },
    {
        name: "modeOfPayment",
        type: "text",
        placeholder: "Mode of Payment",
        label: "Mode of Payment",
        errorSpiel: "Mode of payment is required",
        required: true
    },
    {
        name: "remarks",
        type: "text",
        placeholder: "Remarks",
        label: "Remarks"
    }
]