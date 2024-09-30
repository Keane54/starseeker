interface HoverBoxProps {
    children: React.ReactNode,
    className?: string,
}

export default function HoverBox({ children, className }: HoverBoxProps) {
    return (
        <div className={`transition-colors hover:bg-blue-chill-50 rounded-md ${className ?? ''}`}>
            {children}
        </div>
    )
}