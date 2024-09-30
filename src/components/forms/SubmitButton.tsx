import { useFormStatus } from "react-dom";
import Button from "../layout/Button";

interface SubmitButtonProps {
    label: string
}

export default function SubmitButton({ label }: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return <Button type="submit" disabled={pending} label={label}/>
}