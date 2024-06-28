import React, { useRef } from "react"
import { addNewShareholder } from "../integrations/Sharesholders"
import { useLocation, useNavigate } from "react-router-dom";

export function AddShareholder({ placeholder }) {
    const nameRef = useRef("")
    const percentageRef = useRef(0)
    const ownerRef = useRef(false)

    const location = useLocation()
    const navigate = useNavigate()

    const handleAddNewShareholder = async () => {
        await addNewShareholder({
            name: nameRef.current.value,
            percentage: Number(percentageRef.current.value),
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
                    <h1>Add new shareholder</h1>
                </header>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder={placeholder} ref={nameRef} />
                <label htmlFor="sharepercentage">Share percentage</label>
                <input type="number" placeholder="0.0" ref={percentageRef} />
                <div className="tickbox">
                <input type="checkbox" name="owner" id="owner" ref={ownerRef} />                    
                <label htmlFor="isowner">Owned?</label>
                </div>
                <p>
                <button onClick={handleAddNewShareholder}>Add new shareholder</button>
                <button className="cancel" onClick={handleCancel}>Cancel</button>                    
                </p>
            </section>
        </div>

    )
}