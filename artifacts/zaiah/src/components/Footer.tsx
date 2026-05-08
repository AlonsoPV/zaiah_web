import { Link } from "wouter";

const footerLinks = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/modelo", label: "Modelo ZH" },
  { href: "/portafolio", label: "Portafolio" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#060606" }} data-testid="footer">
      {/* Top border line */}
      <div className="h-px" style={{ background: "linear-gradient(to right, transparent, #CAAA57, transparent)" }} />

      <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 pb-14 border-b border-white/6">
          {/* Brand */}
          <div className="md:col-span-5">
            <img
              src="/logo-zaiah.png"
              alt="ZAIAH"
              style={{
                height: "34px",
                width: "auto",
                display: "block",
                filter: "invert(1) brightness(10)",
                marginBottom: "0.5rem",
              }}
            />
            <p className="text-[#CAAA57] eyebrow mb-7">Regeneración Urbana Estructurada</p>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Empresa privada de transformación urbana dedicada a identificar, adquirir y regenerar activos inmobiliarios estratégicos en ciudades emergentes.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <p className="text-[#CAAA57] eyebrow mb-7">Navegación</p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-white/40 text-sm hover:text-white transition-colors duration-300 tracking-wide">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-[#CAAA57] eyebrow mb-7">Contacto</p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:mkt@zaiah.com.mx"
                className="text-white/40 text-sm hover:text-[#CAAA57] transition-colors tracking-wide"
                data-testid="link-footer-email"
              >
                mkt@zaiah.com.mx
              </a>
              <a
                href="https://wa.me/+5215551452047"
                className="text-white/40 text-sm hover:text-[#CAAA57] transition-colors tracking-wide"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-whatsapp"
              >
                55 5145 2047
              </a>
              <p className="text-white/40 text-sm tracking-wide">Ciudad de México</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs tracking-widest">
            © 2026 ZAIAH — Empresa privada de regeneración urbana estructurada.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#CAAA57]/40" />
            <p className="text-white/15 eyebrow">Ciudad de México · MX</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
