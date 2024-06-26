import React, { createContext, useState } from "react";
import { Login } from "./Login";
import { User } from "./User";

export const AppContext = createContext(null);

export function ContextDemo() {
    const [username, setUsername] = useState("")
    return (
        <AppContext.Provider value={{ username, setUsername }}>
            <Login /> 
            <User />
        </AppContext.Provider>
    )
}