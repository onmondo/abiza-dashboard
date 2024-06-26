import React, { useContext } from "react";
import { AppContext } from "./ContextDemo";

export function Login() {
    const { setUsername } = useContext(AppContext)
    return (
        <section>
            <input type="text" onChange={(e) => { setUsername(e.target.value) }}/>
        </section>
    )
}