
interface SelectProps {
    name: string;
    children: React.ReactNode;
}

export default function Select({ name, children }: SelectProps) {
    return (
        <div className="relative border border-gray-300 rounded-md overflow-hidden">
            <select name={name} className="w-full px-4 py-2 appearance-none cursor-pointer focus:outline-none">
                {children}
            </select>

            <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
            </svg>
        </div>
    )
}