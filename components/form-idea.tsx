"use client"
import { marked } from "marked";

import { sendIdea } from "@/app/actions";
import { useState } from "react";

export function FormIdea() {
    const [mensaje, setMensaje] = useState("");
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        setMensaje(await sendIdea(formData));
    }
    return (
        <form className="flex-1 w-full flex flex-col gap-12" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col gap-2 items-start">
                <h2 className="font-bold text-2xl mb-4">Escribe tu idea:</h2>
                <textarea id="idea" name="idea" className="flex h-10 w-full rounded-md border border-input 
        bg-background px-3 py-2 
        text-sm ring-offset-background 
        file:border-0 file:bg-transparent 
        file:text-sm file:font-medium 
        placeholder:text-muted-foreground 
        focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring 
        focus-visible:ring-offset-2 
        disabled:cursor-not-allowed 
        disabled:opacity-50">
                </textarea>
            </div>
            <button className="p-1 border rounded-xl bg-secondary">Enviar idea</button>
            {mensaje && <div className=" p-5 border rounded-xl shadow-xl text-l flex flex-col gap-2" dangerouslySetInnerHTML={{ __html: marked(mensaje) }} />}
        </form>
    );
}
