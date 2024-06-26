import React, { useContext } from "react";
import { AppContext } from "./ContextDemo";

export function User() {
    const { username } = useContext(AppContext)
    return (
        <section>User:{username}</section>
    )
}