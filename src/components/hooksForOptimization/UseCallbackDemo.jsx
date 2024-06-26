import React, { useCallback, useState } from "react"
import { Child } from "./Child"

export function UseCallbackDemo() {
    const [data, setData] = useState(null)
    const [toggle, setToggle] = useState(false)

    const returnComment = useCallback(() => {
        return data
    }, [data])

    /**
     * Same concept as useMemo but instead of caching the data
     * it will cache a component which prevents rerendering 
     * child components
     */
    return (
        <section>
            <Child returnComment={returnComment} />
            <button onClick={() => { setToggle(!toggle) }}>Toggle</button>
            {toggle && <h1>toggle</h1>}
        </section>
    )
}