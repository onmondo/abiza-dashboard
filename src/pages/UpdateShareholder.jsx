import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import { fetchShareholdersById, updateShareholder } from "../integrations/Sharesholders"
import { useLocation, useNavigate } from "react-router-dom";
import { toDecimal, toPercentage } from "../util/currency";

export function UpdateShareholder({ placeholder }) {
    const location = useLocation()
    const shareholderId = location.pathname.split("/")[2]

    const [shareholder, setShareholder] = useState({})

    const nameRef = useRef("")
    const percentageRef = useRef(0)
    const ownerRef = useRef(false)
    const activeRef = useRef(false)

    const navigate = useNavigate()

    useLayoutEffect(() => {
        fetchShareholdersById(setShareholder, shareholderId)
    }, [])

    useEffect(() => {
        nameRef.current.value = shareholder.name
        percentageRef.current.value = toPercentage(shareholder.percentage)
        ownerRef.current.checked = shareholder.isOwner
        activeRef.current.checked = shareholder.isActive
    }, [shareholder])

    const handleUpdateShareholder = async () => {
        await updateShareholder(shareholderId, {
            name: nameRef.current.value,
            percentage: toDecimal(percentageRef.current.value),
            isActive: true,
            isOwner: ownerRef.current.checked 
        })
        navigate("/", { state: location.state})
    }

    const handleCancel = () => {
        navigate("/", { state: location.state})
    }

    return (
        <div className="form">
            <section>
                <header>
                    <h1>Update shareholder</h1>
                </header>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder={placeholder} ref={nameRef} />
                <label htmlFor="sharepercentage">Share percentage</label>
                <input type="number" placeholder="0.0" ref={percentageRef} />
                <div className="tickbox">
                <input type="checkbox" name="owner" id="owner" ref={ownerRef} />                    
                <label htmlFor="isowner">Owned?</label>                
                </div>                
                <div className="tickbox">
                <input type="checkbox" name="active" id="active" ref={activeRef} />
                <label htmlFor="isactive">Active?</label>
                </div>
                <p>
                <button onClick={handleUpdateShareholder}>Update</button>
                <button className="cancel" onClick={handleCancel}>Cancel</button>
                </p>
            </section>
        </div>

    )
}