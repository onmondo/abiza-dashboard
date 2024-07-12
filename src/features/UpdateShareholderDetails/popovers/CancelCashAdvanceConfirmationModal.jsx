import React, { useContext, useRef, useState } from "react"
import { cancelCashAdvance } from "../../../integrations/Sharesholders"
import { ShareholderContext } from "../../../context/ShareholderContext"

export function CancelCashAdvanceConfirmationModal() {

    const inputConfirmRef = useRef("")

    const { cashAdvanceId, toggleForm, setToggleForm } = useContext(ShareholderContext)
    const [answer, setAnswer] = useState("")

    const handleInputChange = (e) => {
        setAnswer(e.target.value)
    }

    const handleSubmit = async () => {
        if (answer === "Yes") {
            await cancelCashAdvance(cashAdvanceId)

            inputConfirmRef.current.value = ""
            
        }
        setToggleForm(!toggleForm)
    }

    return (
        <div id="cancelcashadvanceconfirm" popover="">
            <header><h1>Conrim cancellation?</h1></header>
            <section>
            <label htmlFor="anwser">Type <strong>Yes</strong> to confirm</label>
            <input 
                type="text" 
                name="anwser" 
                ref={inputConfirmRef} required 
                onChange={handleInputChange} 
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
                />
            <span>This field is required</span>
            <p>
            <button popovertarget="cancelcashadvanceconfirm" onClick={handleSubmit}>Confirm</button>
            <button className="cancel" popovertarget="cancelcashadvanceconfirm">Cancel</button>                
            </p>            
            </section>
        </div>
    )
}