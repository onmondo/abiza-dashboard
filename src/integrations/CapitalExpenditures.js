import axios from "axios"

export const fetchAllExpenditures = async (fn, date) => {
    try {
        let res;
        let year = Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date());
        let month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date());

        if (date && date.length > 0) {
            const dateDetails = date.split("-")
            year = dateDetails[0]
            month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(dateDetails[1]));
        }

        res = await axios.get(`http://localhost:3001/api/v1/cost/${year}/${month}`)
        fn(res.data.data)
    } catch (err) {
        console.log(err)
    }
}

export const addNewExpenditure = async (date, expense) => {
    try {
        let year = Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date());
        let month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date());

        if (date && date.length > 0) {
            const dateDetails = date.split("-")
            year = dateDetails[0]
            month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(dateDetails[1]));
        }

        await axios.post(`http://localhost:3001/api/v1/cost/${year}/${month}`, expense)
    } catch (err) {
        console.log(err)
    }
}

export const getExpenditureById = async (fn, expenditureId) => {
    try {
        const res = await axios.get(`http://localhost:3001/api/v1/cost/${expenditureId}`)
        fn(res.data.data)
    } catch (err) {
        console.log(err)
    }
}

export const updateExpenditure = async (expenditureId, date, expense) => {
    try {
        let year = Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date());
        let month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date());

        if (date && date.length > 0) {
            const dateDetails = date.split("-")
            year = dateDetails[0]
            month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(dateDetails[1]));
        }

        await axios.put(`http://localhost:3001/api/v1/cost/${expenditureId}`, { ...expense, year, month })
    } catch (err) {
        console.log(err)
    }
}

export const deleteExpenditure = async (expenditureId) => {
    try {
        await axios.delete(`http://localhost:3001/api/v1/cost/${expenditureId}`)
    } catch (err) {
        console.log(err)
    }
}