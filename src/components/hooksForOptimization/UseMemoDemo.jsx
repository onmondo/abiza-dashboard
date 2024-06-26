import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

export function UseMemoDemo() {
    const [data, setData] = useState(null)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/comments")
            .then((response) => {
                setData(response.data)
            })
    }, [])

    const findLongestName = (comments) => {
        if (!comments) return null;

        let longestName = "";

        for (let i = 0; i < comments.length; i++) {
            let currentName = comments[i].name
            if (currentName.length > longestName.length) {
                longestName = currentName
            }
        }

        console.log("THIS WAS COMPUTED")

        return longestName
    }

    /**
     * Sets a memoized function getLongestName, invokes the findLongestName function 
     * and runs it again whenever the data changes. Meaning the dependeny "data",
     * if so happen that there is an update, then the findLongestName will again
     * be invoked. Otherwise, the function will not execute again and again even if
     * the other state of the same component changes.
     */
    const getLongestName = useMemo(() => findLongestName(data), [data])
    
    return (
        <section>
            {getLongestName}
            <button onClick={() => { setToggle(!toggle) }}>Toggle</button>
            {toggle && <h1>toggle</h1>}
        </section>
    )
}