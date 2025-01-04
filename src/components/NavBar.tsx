import { useState } from "react";

interface NavBarProps {
  pathname: string;
  style: "transparent" | "opaque";
}

const links = [
  { name: "Photos", href: "/photos" },
  { name: "Guides", href: "/guides" },
  { name: "Gear", href: "/gear" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

export default function NavBar({ pathname, style }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isTransparent = style === "transparent";
  const textColor = isTransparent ? "text-white" : "text-dark";
  const positioning = isTransparent ? "absolute" : "relative";
  const backgroundColor = isTransparent ? "bg-transparent" : "bg-white";
  const selectedColor = isTransparent ? "bg-gray-900" : "bg-gray-100";
  const hoverColor = isTransparent ? "hover:bg-gray-900" : "hover:bg-gray-100";

  return (
    <nav className={`${backgroundColor} p-4 ${positioning} z-50 w-full`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className={`flex-shrink-0 ${textColor} text-2xl`}>
          <a href="/">Nicholas Eager</a>
        </div>
        <div className="hidden md:flex space-x-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${textColor} px-3 py-2 rounded-md text-lg font-medium ${
                pathname === link.href ? selectedColor : hoverColor
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button className={textColor} onClick={() => setIsOpen(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-gray-100 space-y-4`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`block text-dark bg-blue px-3 py-2 rounded-md text-lg font-medium ${
              pathname === link.href ? selectedColor : hoverColor
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
