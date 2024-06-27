import React, { useEffect, useState, memo, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { deleteShareholder, fetchAllShareholders } from "../integrations/Sharesholders"
import { DashboardContext } from "../context/DashboardContext";

export const Shareholders = memo(function Shareholders() {
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

    console.log("shareholders component re-renderd")
    return (
        <section className="shareholders">
            <header>
                <h1>Shareholders</h1>
            </header>
            <ul className="shareholderlist">
                {shareholders.map(shareholder => 
                    <li key={shareholder._id}>
                        <h3>{shareholder.name}</h3>
                        {(shareholder.isOwner) ? <sub>Owner</sub> : <sub>Host</sub> }
                        <p>Shares percentage: {shareholder.percentage}</p>
                        <button onClick={() => { handleUpdateShareholder(shareholder._id) }}>Update shareholder</button>
                        <button onClick={() => { handleDeleteShareholder(shareholder._id) }}>Delete shareholder</button>
                    </li>
                )}
            </ul>
            <footer>
                <button onClick={handleAddNewShareholder}>Add new shareholder</button>
            </footer>
        </section>        
    )
})