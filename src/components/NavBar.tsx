import Dropdown from "./ui/Dropdown";

interface NavBarProps {
  pathname: string;
  style: "transparent" | "opaque";
}

const links = [
  { name: "Photos", href: "/photos/" },
  { name: "Guides", href: "/guides/" },
  { name: "Gear", href: "/gear/" },
  { name: "Contact", href: "/contact/" },
  { name: "About", href: "/about/" },
];

export default function NavBar({ pathname, style }: NavBarProps) {
  const isTransparent = style === "transparent";
  const textColor = isTransparent ? "text-content-inverse" : "text-content";
  const positioning = isTransparent ? "absolute" : "relative";
  const backgroundColor = isTransparent ? "bg-transparent" : "bg-surface";
  const selectedColor = isTransparent
    ? "bg-surface-tertiary/20"
    : "bg-surface-secondary";
  const hoverColor = isTransparent
    ? "hover:bg-surface-secondary/20"
    : "hover:bg-surface-secondary";

  const dropdownItems = links.map((link) => ({
    id: link.href,
    label: link.name,
    href: link.href,
  }));

  const currentPage =
    links.find((link) => link.href === pathname)?.name || "Menu";

  return (
    <header role="banner">
      <nav className={`${backgroundColor} p-4 ${positioning} z-50 w-full`}>
        <div className="mx-auto flex items-center justify-between">
          <div className={`flex-shrink-0 ${textColor} text-2xl`}>
            <h1>
              <a href="/">Nicholas Eager</a>
            </h1>
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

          <Dropdown
            className="md:hidden"
            items={dropdownItems}
            activeItemId={pathname}
            currentLabel={currentPage}
          />
        </div>
      </nav>
    </header>
  );
}
