"use client"

import { useState } from "react"
import CheckoutModal from "./checkout";
import { Button } from "./ui/button";

export default function modalHandler({ }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <>
            <Button variant={"default"} onClick={() => setIsOpen(!isOpen)}>Conviertete en PRO</Button>
            <CheckoutModal onClose={() => setIsOpen(false)} open={isOpen}></CheckoutModal>
        </>);
}