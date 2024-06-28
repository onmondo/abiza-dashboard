import React, { useEffect, useState, memo, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { deleteShareholder, fetchAllShareholders } from "../integrations/Sharesholders"
import { DashboardContext } from "../context/DashboardContext";
import Big from "big.js";
import { amountFormatter } from "../util/currency";

export const Shareholders = memo(function Shareholders({ netIncome }) {
    const { searchDate } = useContext(DashboardContext)
    const [shareholders, setShareholders] = useState([])

    useEffect(() => {
        fetchAllShareholders(setShareholders)
    }, [])
    
    const navigate = useNavigate()

    const handleAddNewShareholder = () => {
        navigate("/addShareholder", { state: { searchDate }})
    }

    const handleUpdateShareholder = (shareholderId) => {
        navigate(`/updateShareholder/${shareholderId}`, { state: { searchDate }})
    }

    const handleDeleteShareholder = async (shareholderId) => {
        await deleteShareholder(shareholderId)
        await fetchAllShareholders(setShareholders)
    }
    
    const computeShares = (percentage) => {
        const bigNetIncome = Big(netIncome)
        const bigPercentage = Big(percentage)
        const bigShare = bigNetIncome.times(bigPercentage)
        return bigShare.round(2).toNumber()
    }

    console.log("shareholders component re-renderd")
    return (
        <section className="dashboardbox">
            <header>
                <h1>Shareholders</h1>
            </header>
            <ul className="dashboardboxlist sharesection">
                {shareholders.map(shareholder => 
                    <li key={shareholder._id} className={(shareholder.isOwner) ? "dbboxhighlight" : "" }>
                        <h3>{amountFormatter.format(computeShares(shareholder.percentage))}</h3>
                        <sub>{shareholder.name} {(shareholder.isOwner) ? "Owner" : "Host" } {`${(shareholder.percentage * 100)}%`}</sub>
                        <p className="buttongroup">
                        <button onClick={() => { handleUpdateShareholder(shareholder._id) }}>Update</button>
                        <button onClick={() => { handleDeleteShareholder(shareholder._id) }}>Delete</button>
                        </p>
                    </li>
                )}
            </ul>
            <footer>
                <button onClick={handleAddNewShareholder}>Add</button>
            </footer>
        </section>        
    )
})