interface InputProps {
    type: 'text' | 'number' | 'email' | 'password',
    name: string,
    label: string,
    placeholder?: string,
    required?: boolean,
    max?: number
}

export default function Input({ type, label, placeholder, name, required, max }: InputProps) {
    return (
        <label className="flex flex-col gap-2 cursor-pointer">
            <p className="text-sm font-semibold">{label}</p>
            <input type={type} placeholder={placeholder} name={name} required={required ?? true} max={max} className="focus:outline-none py-2 px-4 border border-gray-300 focus:border-gray-400 rounded-md transition-colors"/>
        </label>
    )
}