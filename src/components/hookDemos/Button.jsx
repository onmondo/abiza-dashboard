import React, { forwardRef, useImperativeHandle, useState } from "react";

export const Button = forwardRef((props, ref) => {
    const [toggle, setToggle] = useState(false)

    // allows outside of this component take control
    useImperativeHandle(ref, () => ({
        alterToggle() {
            setToggle(!toggle)
        },
    }))
    /**
     * Use this if there is a scenario wherein 
     * a component(outsider) reqiures to handle 
     * the data inside a component without 
     * exposing the the current component's state.
     */
    return (
        <>
            {/* <button onClick={() => { setToggle(!toggle) }}>Button from child</button> */}
            <button>Button from child</button>
            {toggle && <span>Toggle</span>}
        </>

    )
})