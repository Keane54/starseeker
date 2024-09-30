"use client";

import Menu from "./Menu";
import NavLink from "./NavLink";

export default function Nav() {
    return (
        <nav className="fixed z-[999] w-full h-20 top-0 p-4 flex justify-between items-center lg:px-12 bg-white shadow-md" role="navigation" aria-label="Main Nav">
          <NavLink href="/" className="transition-opacity hover:opacity-75">
            <h1 className="text-4xl font-bold">Star Seeker</h1>
          </NavLink>

          <Menu/>
        </nav>
    )
}