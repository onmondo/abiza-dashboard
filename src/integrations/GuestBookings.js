import axios from "axios"

export const fetchAllBookings = async (fn, date) => {
    try {
        let res;
        let year = Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date());
        let month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date());

        if (date && date.length > 0) {
            const dateDetails = date.split("-")
            year = dateDetails[0]
            month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(dateDetails[1]));
        }

        res = await axios.get(`http://localhost:3000/api/v1/bookings/${year}/${month}?sort=asc&page=1&limit=10`)
        fn(res.data.monthlyBookings.data)
    } catch (err) {
        console.log(err)
    }
}

export const addNewBooking = async (booking) => {
    try {
        await axios.post("http://localhost:3000/api/v1/bookings", booking)
    } catch (err) {
        console.log(err)
    }
}

export const deleteBooking = async (date, bookingId) => {
    try {
        let year = Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date());
        let month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date());
        if (date && date.length > 0) {
            const dateDetails = date.split("-")
            year = dateDetails[0]
            month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(dateDetails[1]));
        }

        await axios.delete(`http://localhost:3000/api/v1/bookings/${year}/${month}/${bookingId}`)
    } catch (err) {
        console.log(err)
    }
}

export const updateBooking = async (date, bookingId) => {
    try {
        let year = Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date());
        let month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date());
        if (date && date.length > 0) {
            const dateDetails = date.split("-")
            year = dateDetails[0]
            month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(dateDetails[1]));
        }

        await axios.put(`http://localhost:3000/api/v1/bookings/${year}/${month}/${bookingId}`)
    } catch (err) {
        console.log(err)
    }
}

export const getBookingId = async (fn, bookingId) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/v1/bookings/${bookingId}`)
        fn(res.data.booking)
    } catch (err) {
        console.log(err)
    }
}