'use client'

import { useEffect, useState } from "react"
import Card from "../layout/Card"
import { useFormState } from "react-dom"
import SubmitButton from "./SubmitButton"
import { ErrorResponse } from "@/types/types"

interface FormProps<T> {
    children: React.ReactNode,
    serverAction: (prevState: T, formData: FormData) => Promise<T>,
    localDataKey: string,
    submitLabel: string,
}

export default function Form<T extends {} | ErrorResponse>({ children, serverAction, localDataKey, submitLabel }: FormProps<T>) {
    const [state, formAction] = useFormState(serverAction, {} as Awaited<T>)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if ('error' in state && state.error) return setError(state.error);

        setError(null);

        // If the state is empty, we don't want to store it
        if (Object.keys(state).length === 0) return;

        const prevStoredData = localStorage.getItem(localDataKey);

        const prevDataParsed: Array<T> = prevStoredData ? JSON.parse(prevStoredData) : [];

        const updatedData = prevDataParsed.length >= 50 ? [...prevDataParsed.slice(0, 49)] : [...prevDataParsed, state];

        localStorage.setItem(localDataKey, JSON.stringify(updatedData));

        // Need to manually dispatch the event since when listening in LocalDataDisplay storage events are only triggered from different contexts (browser tabs/windows)
        window.dispatchEvent(new StorageEvent('storage', {
            key: localDataKey,
            newValue: JSON.stringify(updatedData),
        }))
    }, [state])
    
    return (
        <Card className="bg-white p-6">
            {error && <p className="text-red-500 mb-8">{error}</p>}
            <form action={formAction} className="flex flex-col gap-6">
                {children}

                <SubmitButton label={submitLabel}/>
            </form>
        </Card>
    )
}