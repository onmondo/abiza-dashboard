// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo, useContext } from 'react'
import { deleteAmenityIncome, fetchAllBookings } from '../integrations/GuestBookings'
import { DashboardContext } from '../context/DashboardContext'
import { amountFormatter, computeTotalRevenue } from '../util/currency'
import { computeFilteredList } from '../util/search'
import { AddNewBookingModal } from '../components/popovers/booking/AddNewBookingModal'
import { UpdateBookingModal } from '../components/popovers/booking/UpdateBookingModal'
import { AddNewAmenityUsageModal } from '../components/popovers/amenityUsage/AddNewAmenityUsageModal copy'
// import { UpdateAmenityUsageModal } from "../components/popovers/amenityUsage/UpdateAmenityUsageModal";
import { DeleteBookingModal } from '../components/popovers/booking/DeleteBookingModal'
import Big from 'big.js'
import { TransactionDetails } from '../components/TransactionDetails'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import PlusIcon from '@mui/icons-material/Add'

export function GuestBookings() {
  const searchKeys = ['guestName', 'from', 'rooms', 'modeOfPayment', 'remarks']
  const [bookings, setBookings] = useState([])
  const [totalBookings, setTotalBookings] = useState(0)
  const { searchDate, openBookingForm, hasDeletion, setHasDeletion, setBookingFormId } = useContext(DashboardContext)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchAllBookings(setBookings, setTotalBookings, searchDate)
  }, [searchDate, openBookingForm])

  const handleDeleteAmenity = async (bookingId, amenityId) => {
    await deleteAmenityIncome(searchDate, amenityId, bookingId)
    await fetchAllBookings(setBookings, setTotalBookings, searchDate)
    setHasDeletion(!hasDeletion) // triggers the update to earnings section component
  }

  const handleUpdateBooking = (bookingId) => {
    setBookingFormId(bookingId)
  }

  // const handleUpdateAmenity = (bookingId, amenityId) => {
  //     // navigate(`/update/${bookingId}`, { state: { searchDate }})
  //     // setOpenBookingForm(!openBookingForm)
  //     console.log("bookingId", bookingId)
  //     console.log("amenityId", amenityId)
  //     setBookingFormId(bookingId)
  //     setAmenityId(amenityId)
  // }

  const getTotalRevenue = useMemo(() => computeTotalRevenue(bookings), [bookings])
  const getFilteredBookings = useMemo(() => computeFilteredList(bookings, searchKeys, query), [bookings, query])

  const computeDiscount = (booking) => {
    if (booking.nightlyPrice !== booking.totalPayout) {
      const bigNoOfPax = Big(booking.noOfPax).minus(Big(1))
      const bigNightlyPrice = Big(booking.nightlyPrice)
      const bigTotalPayout = bigNoOfPax.times(bigNightlyPrice).times(Big(booking.noOfStay))
      const discount = bigTotalPayout.minus(Big(booking.totalPayout)).toNumber()
      return amountFormatter.format(discount)
    }
    return amountFormatter.format(0)
  }

  const caption = `with the total revenue of ${amountFormatter.format(getTotalRevenue)}`.toLocaleUpperCase()
  return (
    <section className="dashboardbox">
      <header className="dashboardheader">
        <Typography variant="h5" gutterBottom>
          <strong>📚 {totalBookings} total guest bookings this month</strong>
        </Typography>
        <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
          {caption}
        </Typography>
        <p>
          <Button 
            popoverTarget='newbookingform' 
            variant="contained" 
            color="primary"
            startIcon={<PlusIcon />}>
            Add new booking
          </Button>
        </p>
        {/* <input type="text" placeholder="Search..." className="searchbox" onChange={(e) => setQuery(e.target.value.toLowerCase())} /> <br /> */}
        <TextField
          id="input-with-icon-textfield"
          label="Search bookings"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          variant="standard"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          helperText={`found ${getFilteredBookings.length} records`}
        />
      </header>
      <AddNewBookingModal />
      <UpdateBookingModal />
      <DeleteBookingModal />
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
                      <TransactionDetails 
                        title={`📜${booking.guestName}, ${booking.rooms.join(' and ')}`}
                        subtitles={[
                          `From ${booking.from}, ${booking.noOfPax} pax, ${booking.noOfStay} night/s of stay`,
                          `Checked-in: ${checkInDate}`,
                          `Checked out: ${checkOutDate}`
                        ]}
                      />
                      {/* <h3>📜{booking.guestName}, {booking.rooms.join(" and ")}</h3> */}
                      {/* <sub>From {booking.from}, {booking.noOfPax} pax, {booking.noOfStay} night/s of stay</sub><br /> */}
                      {/* <sub>Checked-in: {checkInDate}</sub><br />
                                    <sub>Checked out: {checkOutDate}</sub> */}
                    </header>
                    {
                      (booking.remarks.toLowerCase().includes('pending')) 
                        ?   <section className="deliquent">
                          <TransactionDetails 
                            title={amountFormatter.format(booking.totalPayout)}
                            subtitles={[`Nightly price of ${amountFormatter.format(booking.nightlyPrice)}`]}
                          />
                        </section>
                        :   <section className="confirmed">
                          <TransactionDetails 
                            title={amountFormatter.format(booking.totalPayout)}
                            subtitles={[
                              `Paid ${booking.modeOfPayment} on ${datePaid}`,
                              `Nightly price of ${amountFormatter.format(booking.nightlyPrice)}`,
                              `Discount ${computeDiscount(booking)}`
                            ]}
                          />
                        </section> 
                    }
                  </article>
                  <section className="amenities">
                    {(booking.amenityUsage && booking.amenityUsage.length > 0) 
                      ?   <ul>
                        {booking.amenityUsage.map(amenity => {
                          const datePaid = new Intl.DateTimeFormat('en', {
                            dateStyle: 'full',
                          }).format(new Date(amenity.datePaid))
                          return (
                            <li key={amenity._id}>
                              <header>
                                <h4>🪔{amenity.particulars}</h4>
                                <p className="buttongroup">
                                  {/* <button className="update" popovertarget="updateamenityusage" onClick={() => handleUpdateAmenity(booking._id, amenity._id)}>📝 Update usage</button> */}
                                  <button className="delete" onClick={() => handleDeleteAmenity(booking._id, amenity._id)}>🚽 Delete usage</button>
                                </p>
                              </header>
                              <section>
                                <h4>{amountFormatter.format(amenity.amountPaid)}</h4>
                                <sub>{datePaid}</sub>
                              </section>
                            </li>
                          )
                        })}
                      </ul>
                      : ''
                    }
                  </section>
                  <p className="buttongroup">
                    <button className="update" popovertarget="updatebookingform" onClick={() => handleUpdateBooking(booking._id)}>📝 Update booking</button>
                    <button className="update" popovertarget="newamenityusage" onClick={() => handleUpdateBooking(booking._id)}>✨ Add amenity usage</button>
                    <button className="delete" popovertarget="deletebookingform" onClick={() => handleUpdateBooking(booking._id)}>🚽 Delete</button>
                  </p>                                
                </li>
              )
            })}
        </ol>
        <AddNewAmenityUsageModal />
        {/* <UpdateAmenityUsageModal /> */}
      </section>
    </section>
  )
}
