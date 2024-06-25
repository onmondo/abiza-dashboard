import React from "react"
import { render, screen } from "@testing-library/react"
import { App } from "./App"
import { fireEvent } from "@testing-library/react"

test("Renders Guest bookings header", () => {
    render(<App />)
    const linkElement = screen.getByText(/Guest bookings/i)
    expect(linkElement).toBeInTheDocument()
})

// test("Renders search bar", () => {
//     render(<App />)
//     const searchElement = screen.getAllByRole("input")
//     expect(searchElement).toBeInTheDocument()
// })

test("Renders the current date", () => {
    render(<App />)
    const now = new Date().getMonth();
    const searchDateElement = screen.getByTitle("monthselector")
    fireEvent.change(searchDateElement, { target: { value: "2024-06" } })
    // console.log(searchDateElement.value)
    expect(new Date(searchDateElement.value).getMonth()).toEqual(now)
})

test("Renders total of 0 revenue on current date", () => {
    render(<App />)
    const total = screen.getByTitle("totalrevenue")
    expect(total.textContent).toBe("₱0.00")
})

test("Renders search bar", () => {
    render(<App />)
    const searchElement = screen.getByPlaceholderText(/search.../i);
    expect(searchElement).toBeInTheDocument()
})

test("Search bar should change", () => {
    render(<App />)
    const searchElement = screen.getByPlaceholderText(/search.../i);
    const testSearchText = "BP"
    fireEvent.change(searchElement, { target: { value: testSearchText } })
    expect(searchElement.value).toBe(testSearchText)
})

test("Renders 2 add new button", () => {
    render(<App />)
    const addNewBookingButton = screen.getAllByText("Add new booking");
    expect(addNewBookingButton.length).toBe(2)
})