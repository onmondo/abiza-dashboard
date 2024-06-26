import React, { useRef } from "react";
import { Button } from "./Button";

export function UseImperativeHandleDemo() {
    const buttonRef = useRef(null)
    /**
     * Use this if there is a scenario wherein 
     * a component(outsider) reqiures to handle 
     * the data inside a component without 
     * exposing the the current component's state.
     */
    return (
        <section>
            <button onClick={() => { buttonRef.current.alterToggle() }}>Button from parent</button>
            <Button ref={buttonRef}/>
        </section>
    )
}