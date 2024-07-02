import axios from "axios"

export const fetchAllShareholders = async (fn) => {
    try {
        const res = await axios.get(`${process.env.DEV_SHARES_API_URL}/api/v1/shares/holders`)
        fn(res.data.data)
    } catch (err) {
        console.log(err)
    }
}

export const addNewShareholder = async (shareholder) => {
    try {
        await axios.post(`${process.env.DEV_SHARES_API_URL}/api/v1/shares/holders`, shareholder)
    } catch (err) {
        console.log(err)
    }
}

export const fetchShareholdersById = async (fn, shareholderId) => {
    try {
        const res = await axios.get(`${process.env.DEV_SHARES_API_URL}/api/v1/shares/holders/${shareholderId}`)
        fn(res.data.data)
    } catch (err) {
        console.log(err)
    }
}

export const updateShareholder = async (shareholderId, shareholder) => {
    try {
        await axios.put(`${process.env.DEV_SHARES_API_URL}/api/v1/shares/holders/${shareholderId}`, shareholder)
    } catch (err) {
        console.log(err)
    }
}

export const deleteShareholder = async (shareholderId) => {
    try {
        await axios.delete(`${process.env.DEV_SHARES_API_URL}/api/v1/shares/holders/${shareholderId}`)
    } catch (err) {
        console.log(err)
    }
}