import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import { fetchShareholdersById, updateShareholder } from "../integrations/Sharesholders"
import { useLocation, useNavigate } from "react-router-dom";

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
        percentageRef.current.value = shareholder.percentage
        ownerRef.current.checked = shareholder.isOwner
        activeRef.current.checked = shareholder.isActive
    }, [shareholder])

    const handleUpdateShareholder = async () => {
        await updateShareholder(shareholderId, {
            name: nameRef.current.value,
            percentage: Number(percentageRef.current.value),
            isActive: true,
            isOwner: ownerRef.current.checked 
        })
        navigate("/", { state: location.state})
    }

    const handleCancel = () => {
        navigate("/", { state: location.state})
    }

    return (
        <section>
            <input type="text" placeholder={placeholder} ref={nameRef} />
            <input type="number" placeholder="0.0" ref={percentageRef} />
            <input type="checkbox" name="owner" id="owner" ref={ownerRef} />
            <input type="checkbox" name="active" id="active" ref={activeRef} />
            <button onClick={handleUpdateShareholder}>Update shareholder</button>
            <button onClick={handleCancel}>Cancel</button>
        </section>
    )
}