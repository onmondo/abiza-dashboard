import React, { useId, useRef, useState } from "react";
import { Button } from "./Button";

export function UseRefDemo() {

    const [todos, setTodos] = useState([])

    const inputRef = useRef("");
    const buttonRef = useRef(null)

    const handleClick = () => {
        const todo = inputRef.current.value
        setTodos(todos.concat(todo))
        inputRef.current.value = ""
        inputRef.current.focus()
        console.log(buttonRef.current)
        buttonRef.current.alterToggle()
    }
    const id = useId()
    return (
        <section>
            <h1>Todo</h1>
            <ul id={id}>
                {todos.map((todo, i) => <li key={i}>{todo}</li> )}
            </ul>
            <input type="text" placeholder="Meh..." ref={inputRef} onKeyDown={(e) => { if (e.key === "Enter") handleClick() }} />
            <button onClick={handleClick}>Add</button>
            <Button ref={buttonRef}/> 
            {/* You can also control the properties of a user defined component, 
            provided that it uses useImperativeHandle */}
        </section>
    )
}