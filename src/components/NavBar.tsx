import { useState, useRef, useEffect } from "react";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isTransparent = style === "transparent";
  const textColor = isTransparent ? "text-white" : "text-dark";
  const positioning = isTransparent ? "absolute" : "relative";
  const backgroundColor = isTransparent ? "bg-transparent" : "bg-white";
  const selectedColor = isTransparent ? "bg-gray-900" : "bg-gray-100";
  const hoverColor = isTransparent ? "hover:bg-gray-900" : "hover:bg-gray-100";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentPage =
    links.find((link) => link.href === pathname)?.name || "Menu";

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

        <div className="md:hidden" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50"
          >
            <span>{currentPage}</span>
            <svg
              className={`w-5 h-5 ml-2 transform transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute left-4 right-4 mt-2 py-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`
                    block w-full text-left px-4 py-2 text-sm
                    ${
                      pathname === link.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }
                  `}
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
