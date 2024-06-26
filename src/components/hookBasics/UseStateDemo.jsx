import React, { useState } from "react";

export function UseStateDemo() {
    const [data, setData] = useState(null)

    return (
        <>
        <h1>{data}</h1>
        <button onClick={() => { setData("Test") }}>Press</button>        
        </>
    )
}
