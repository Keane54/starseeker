'use client'

interface ButtonProps {
    label: string,
    type?: 'button' | 'submit' | 'reset',
    onClick?: () => void,
    className?: string
    disabled?: boolean,
}

export default function Button({ type, label, onClick, className, disabled = false}: ButtonProps) {
    return (
        <button onClick={onClick} className={`py-2 px-4 transition-all text-white rounded-lg hover:opacity-80 ${disabled ? 'bg-gray-400' : 'bg-blue-chill-950'} ${className ?? ''}`} disabled={disabled} type={type ?? 'button'}>
            {label}
        </button>
    )
}