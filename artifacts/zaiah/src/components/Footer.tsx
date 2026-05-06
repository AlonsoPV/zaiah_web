import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <p className="font-bold text-2xl tracking-[0.15em] text-white mb-4">ZAIAH</p>
            <p className="text-white/40 text-xs tracking-[0.15em] uppercase mb-4">
              Regeneración Urbana Estructurada
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Empresa privada de transformación urbana dedicada a identificar, adquirir y regenerar activos inmobiliarios estratégicos.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#CAAA57] text-xs tracking-[0.2em] uppercase font-semibold mb-6">
              Navegación
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Inicio" },
                { href: "/quienes-somos", label: "Quiénes Somos" },
                { href: "/portafolio", label: "Portafolio" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-white/50 text-sm hover:text-white transition-colors duration-300 tracking-wide">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#CAAA57] text-xs tracking-[0.2em] uppercase font-semibold mb-6">
              Contacto
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contacto@zaiah.mx"
                className="text-white/50 text-sm hover:text-white transition-colors tracking-wide"
                data-testid="link-footer-email"
              >
                contacto@zaiah.mx
              </a>
              <a
                href="https://wa.me/525500000000"
                className="text-white/50 text-sm hover:text-white transition-colors tracking-wide"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-whatsapp"
              >
                +52 55 0000 0000
              </a>
              <p className="text-white/50 text-sm tracking-wide">
                Ciudad de México
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs tracking-[0.1em]">
            © 2025 ZAIAH. Empresa privada de regeneración urbana.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-[#CAAA57]" />
            <p className="text-white/20 text-xs tracking-[0.15em] uppercase">
              Ciudad de México
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
