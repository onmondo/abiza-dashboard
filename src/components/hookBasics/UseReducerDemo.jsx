import React, { useReducer } from "react"

export function UseReducerDemo() {
    const [state, dispatch] = useReducer((state, {type, args}) => {
        console.log(args)
        switch(type) {
            case "SUBMIT":
                return {
                    ...state,
                    isSubmitPressed: !state.isSubmitPressed
                }
            case "CANCEL":
                return {
                    ...state,
                    isCancelPressed: !state.isCancelPressed
                }
            default:
                return state
        }
    }, {
        isSubmitPressed: false,
        isCancelPressed: false,
    })

    console.log(state)

    const handleSubmitClick = () => {
        dispatch({type: "SUBMIT", args: { increment: 1}})
    }

    const handleCancelClick = () => {
        dispatch({type:"CANCEL"})
    }
    return (
        <>
            <button onClick={handleSubmitClick}>Submit</button>
            <button onClick={handleCancelClick}>Cancel</button>
        </>
    )
}
