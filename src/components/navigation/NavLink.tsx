import Link from "next/link";

interface NavLinkProps {
    href: string,
    children: React.ReactNode,
    className?: string
}

export default function NavLink({ href, children, className }: NavLinkProps) {
    return (
        <Link href={href} className={className ?? ''}>
            {children}
        </Link>
    )
} 