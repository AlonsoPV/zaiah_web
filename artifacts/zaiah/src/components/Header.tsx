import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#D5D3CE]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <span
              className={`font-bold text-xl tracking-[0.12em] transition-colors duration-300 ${
                scrolled ? "text-[#00246B]" : "text-white"
              }`}
            >
              ZAIAH
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span
                  className={`text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-300 relative group ${
                    scrolled ? "text-[#00246B]" : "text-white/90"
                  } ${location === link.href ? "text-[#CAAA57]" : ""}`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#CAAA57] transition-all duration-300 ${
                      location === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </Link>
            ))}
            <Link href="/contacto" data-testid="nav-cta">
              <span
                className={`text-xs font-semibold tracking-[0.12em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                  scrolled
                    ? "border-[#00246B] text-[#00246B] hover:bg-[#00246B] hover:text-white"
                    : "border-white/60 text-white hover:border-[#CAAA57] hover:text-[#CAAA57]"
                }`}
              >
                Contacto
              </span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors duration-300 ${
              scrolled ? "text-[#00246B]" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#00246B] overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        data-testid="nav-mobile"
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className="text-white/90 font-medium tracking-[0.1em] uppercase text-sm hover:text-[#CAAA57] transition-colors">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
