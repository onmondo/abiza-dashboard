export const getCurrentDate = (state) => {
    const now = new Date()
    const currentYear = Intl.DateTimeFormat('en', { year: "numeric"}).format(now)
    const currentMonth = Intl.DateTimeFormat('en', { month: "numeric"}).format(now)
    const currentDate = (state?.searchDate) ? state.searchDate : `${currentYear}-${(currentMonth.length > 1) ? currentMonth : `0${currentMonth}`}`;
    return currentDate
}