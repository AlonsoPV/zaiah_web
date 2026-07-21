import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/modelo", label: "Modelo" },
  { href: "/portafolio", label: "Portafolio" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isLight = scrolled;

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isLight
          ? "bg-white/97 backdrop-blur-sm border-b border-[#D5D3CE]/70"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <img
              src="/logo-zaiah.png"
              alt="ZAIAH"
              style={{
                height: "30px",
                width: "auto",
                display: "block",
                filter: isLight
                  ? "brightness(0) saturate(100%) invert(11%) sepia(98%) saturate(2600%) hue-rotate(210deg) brightness(85%)"
                  : "invert(1) brightness(10)",
                transition: "filter 0.5s ease",
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            {navLinks.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span
                    className={`text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 relative group ${
                      isLight
                        ? active ? "text-[#00246B]" : "text-[#00246B]/55 hover:text-[#00246B]"
                        : active ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-[#CAAA57] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </Link>
              );
            })}

            <Link href="/contacto" data-testid="nav-cta">
              <span
                className={`text-[11px] font-bold tracking-[0.14em] uppercase px-5 py-2 border transition-all duration-300 ${
                  isLight
                    ? "border-[#00246B] text-[#00246B] hover:bg-[#00246B] hover:text-white"
                    : "border-white/40 text-white/90 hover:border-[#CAAA57] hover:text-[#CAAA57]"
                }`}
              >
                Agendar cita
              </span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex flex-col gap-[5px] p-2 transition-colors duration-300 ${
              isLight ? "text-[#00246B]" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            <span className={`block w-5 h-px bg-current transition-transform duration-300 origin-center ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block w-5 h-px bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-current transition-transform duration-300 origin-center ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#00246B] overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        data-testid="nav-mobile"
      >
        <div className="px-6 py-10 flex flex-col gap-7 border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className="text-white/80 font-medium tracking-[0.12em] uppercase text-sm hover:text-[#CAAA57] transition-colors">
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/contacto">
            <span className="inline-block mt-2 px-6 py-3 bg-[#CAAA57] text-black text-xs font-bold tracking-[0.15em] uppercase">
              Agendar cita
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
