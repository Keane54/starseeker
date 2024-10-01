'use client'

import { useEffect, useRef, useState } from "react"
import HoverBox from "./HoverBox"

interface ToastProps {
    children: React.ReactNode
    afterClose?: () => void
}

export default function Toast({ children, afterClose }: ToastProps) {
    const [open, setOpen] = useState(false)
    // Track timeout in a ref to prevent rerenders
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (children) {
            if (timeoutRef.current) {
                // Clear the timeout and ref to stop toast closing if it's opened/closed quickly.
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }

            return setOpen(true)
        }

        return setOpen(false)
    }, [children])

    const closeToast = () => {
        setOpen(false)
        
        if (afterClose) {
            timeoutRef.current = setTimeout(() => {
                afterClose()
                timeoutRef.current = null
            }, 200)
        }
    }

    return (
        <div className={`fixed bottom-0 w-full border-t border-t-gray-300 left-0 transition-transform ${open ? 'translate-y-0' : 'translate-y-full'}`} role="alert" aria-label="Toast" aria-live='polite' aria-atomic='true'>
            <div className="relative p-4 lg:py-6 lg:px-12 shadow-lg bg-white">
                <HoverBox className="absolute right-12">
                    <button onClick={() => closeToast()} className="block p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </HoverBox>

                {children}
            </div>
        </div>
    )
}