interface CardProps {
    children: React.ReactNode,
    className?: string
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={`rounded-xl border border-gray-300 ${className ?? ''}`}>
            {children}
        </div>
    )
}