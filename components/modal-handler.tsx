"use client"

import { useState } from "react"
import CheckoutModal from "./checkout";

export default function modalHandler({ }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "True" : "False"}</button>
            <CheckoutModal onClose={() => setIsOpen(false)} open={isOpen}></CheckoutModal>
        </>);
}