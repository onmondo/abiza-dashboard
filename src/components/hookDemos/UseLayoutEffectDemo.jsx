import React, { useEffect, useLayoutEffect } from "react";

export function UseLayoutEffectDemo() {
    useEffect(() => {
        console.log('use effect') // do something after the component is rendered
    }, [])

    useLayoutEffect(() => {
        console.log("Use layout effect") // do something before the component is rendered
        /**
         * Possible applications such is
         * 1. Laying out first the UI appearance before setting the value
         * 2. ...
         */
    }, [])

    return (
        <section></section>
    )
}