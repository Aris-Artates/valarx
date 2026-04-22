"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavBox from "./NavBox";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // { href: '/team', label: 'Team' },
  { href: "/event", label: "Events" },
  { href: "/connect", label: "Connect" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden bg-[#300a86]/95 backdrop-blur">
      <nav className="relative flex w-full min-h-24 items-center px-6">
        {/* Logo — pinned left, hidden on small screens */}
        <Link href="/" className="hidden sm:flex items-center">
          <Image
            src="/valarx.png"
            alt="VALARX"
            width={64}
            height={16}
            priority
            className="object-contain"
          />
        </Link>

        {/* Fake border — sits behind NavBoxes, covered by active tab's bg */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-[#0f005c] z-0" />

        {/* Nav links — one NavBox per link */}
        <ul className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end gap-2">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <NavBox isActive={pathname === href}>
                <Link
                  href={href}
                  className={`block px-7 py-3 text-sm sm:text-base font-medium transition-[padding,color] duration-200 ease-out group-hover:px-10 group-hover:py-4 ${
                    pathname === href
                      ? "text-white/70 group-hover:text-[#a7ff04]"
                      : "text-white/70 group-hover:text-violet-700"
                  }`}
                >
                  {label}
                </Link>
              </NavBox>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
