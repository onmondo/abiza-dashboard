import Big from "big.js";

export const amountFormatter = new Intl.NumberFormat("PH", {
    style: "currency",
    currency: "PHP",
});

export const computeTotalRevenue = (bookings) => {
    console.log("total revenue computed")
    return bookings.reduce((total, booking) => {
        const bigTotal = Big(total)
        const bigPayout = Big(booking.totalPayout)
        total = bigTotal.plus(bigPayout).toNumber()

        return total
    }, 0)
}

export const computeTotalExpenditure = (expenditures) => {
    console.log("total expenditure computed")
    return expenditures.reduce((total, expenditure) => {
        const bigTotal = Big(total)
        const bigBill = Big(expenditure.totalBill)
        total = bigTotal.plus(bigBill).toNumber()

        return total
    }, 0)
}