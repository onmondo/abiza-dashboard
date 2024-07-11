import React, { useEffect, useState, memo, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { deleteShareholder, fetchAllShareholders } from "../../integrations/Sharesholders"
import { DashboardContext } from "../../context/DashboardContext";
import Big from "big.js";
import { amountFormatter } from "../../util/currency";
import { EarningsSectionContext } from "../../context/EarningsSectionContext";
import { StatsBox } from "../../components/StatsBox";

export const Shareholders = memo(function Shareholders() {
    const { searchDate } = useContext(DashboardContext)
    const { getNetIncome } = useContext(EarningsSectionContext)
    const [shareholders, setShareholders] = useState([])

    useEffect(() => {
        fetchAllShareholders(setShareholders)
    }, [])
    
    const navigate = useNavigate()

    const handleAddNewShareholder = () => {
        navigate("/shareholder", { state: { searchDate }})
    }

    const handleUpdateShareholder = (shareholderId) => {
        navigate(`/shareholder/${shareholderId}`, { state: { searchDate }})
    }

    const handleDeleteShareholder = async (shareholderId) => {
        await deleteShareholder(shareholderId)
        await fetchAllShareholders(setShareholders)
    }
    
    const computeShares = (percentage) => {
        const bigNetIncome = Big(getNetIncome)
        const bigPercentage = Big(percentage)
        const bigShare = bigNetIncome.times(bigPercentage)
        return bigShare.round(2).toNumber()
    }

    return (
        <section className="dashboardbox">
            <header>
                <h1>🦸🏻 Shareholders</h1>
            </header>
            <ul className="dashboardboxlist sharesection">
                {shareholders.map(shareholder => 
                    <StatsBox 
                        key={shareholder._id} 
                        label={`${shareholder.name} ${(shareholder.isOwner) ? "Owner" : "Host" } ${(shareholder.percentage * 100)}%`}
                        value={amountFormatter.format(computeShares(shareholder.percentage))}
                        className={(shareholder.isOwner) ? "dbboxhighlight" : "" }>
                        <p className="buttongroup">
                        <button onClick={() => { handleUpdateShareholder(shareholder._id) }}>Update</button>
                        <button onClick={() => { handleDeleteShareholder(shareholder._id) }}>Delete</button>
                        </p>
                    </StatsBox>
                )}
            </ul>
            <footer>
                <button onClick={handleAddNewShareholder}>Add</button>
            </footer>
        </section>        
    )
})