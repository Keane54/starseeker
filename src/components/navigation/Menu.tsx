import NavLink from "./NavLink";
import HoverBox from "../layout/HoverBox";
import useClickedOutside from "@/hooks/useClickedOutside";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import useHandleResize from "@/hooks/useHandleResize";
import usePathChange from "@/hooks/usePathChange";

export default function Menu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const path = usePathname();

    const toggleMenu = () => {
        setMenuOpen((prev) => {
            const newMenuOpen = !prev;
            document.body.className = newMenuOpen ? 'overflow-y-hidden' : '';
            return newMenuOpen;
        });
    };

    const updateMenuState = (isOpen: boolean) => {
        setMenuOpen(isOpen);
        document.body.className = isOpen ? 'overflow-y-hidden' : '';
    }

    useClickedOutside(ref, () => updateMenuState(false));
    useHandleResize(() => updateMenuState(false));
    usePathChange(path, () => updateMenuState(false));
    
    return (
        <div ref={ref}>
            <button onClick={() => toggleMenu()} className="w-8 h-8 relative [&_span]:transition-all lg:hidden" aria-expanded={menuOpen}>
                <span className={`block absolute top-0 w-full h-0.5 bg-black ${menuOpen ? 'rotate-45 translate-y-[calc(1rem-1px)]' : 'translate-y-0'}`}></span>

                <span className={`block w-2/3 h-0.5 bg-black ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>

                <span className={`block absolute bottom-0 h-0.5 bg-black ${menuOpen ? '-rotate-45 -translate-y-[calc(1rem-1px)] w-full' : 'translate-y-0 w-1/3'}`}></span>
            </button>

            <ul className={`
                py-6 px-4 text-lg flex flex-col gap-4 absolute z-50 h-[calc(100vh-4rem)] w-full top-[4.25rem] right-0 transition-transform shadow-lg bg-white
                lg:shadow-none lg:static lg:h-auto lg:p-0 lg:flex-row lg:gap-12 
                ${menuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`
            } aria-label="Nav Menu">
                <li>
                    <HoverBox>
                        <NavLink href='journey-planner' className="p-2 px-4 block">
                            Journey Planner
                        </NavLink>
                    </HoverBox>
                </li>

                <li>
                    <HoverBox>
                        <NavLink href='route-finder' className="p-2 px-4 block">
                            Route Finder
                        </NavLink>
                    </HoverBox>
                </li>
            </ul>
        </div>
    )
}