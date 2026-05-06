import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

export default function Home() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <main>
      {/* ── HERO — SPLIT LAYOUT ───────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden"
        style={{ backgroundColor: "#060d1a" }}
        data-testid="section-hero"
      >
        {/* LEFT — Content */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[55%] px-8 md:px-14 lg:px-20 pt-32 pb-20 lg:py-0">
          {/* Subtle left accent line */}
          <div
            className={`absolute left-0 top-1/4 h-1/2 w-px bg-[#CAAA57]/30 hidden lg:block transition-all duration-1500 ${vis ? "opacity-100" : "opacity-0"}`}
          />

          <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.35em] uppercase mb-10">
              Regeneración Urbana Estructurada
            </p>
          </div>

          <div className={`transition-all duration-700 delay-150 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-white font-bold text-[2.6rem] md:text-[3.2rem] lg:text-[3.6rem] leading-[1.08] tracking-[-0.01em] mb-7 max-w-xl">
              Transformamos activos urbanos en patrimonio estructurado.
            </h1>
          </div>

          <div className={`transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-10 h-px bg-[#CAAA57] mb-7" />
            <p className="text-white/55 text-base font-light leading-relaxed max-w-sm mb-10">
              ZAIAH identifica, adquiere y regenera edificios subutilizados para convertirlos en nodos productivos con impacto económico, urbano y patrimonial.
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row items-start gap-3 transition-all duration-700 delay-450 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Link href="/contacto" data-testid="button-hero-agendar">
              <span className="inline-block px-7 py-3.5 bg-[#CAAA57] text-black text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-all duration-300">
                Agendar conversación
              </span>
            </Link>
            <Link href="/portafolio" data-testid="button-hero-portafolio">
              <span className="inline-block px-7 py-3.5 border border-white/25 text-white/80 text-[11px] font-semibold tracking-[0.18em] uppercase hover:border-white/60 hover:text-white transition-all duration-300">
                Ver portafolio
              </span>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className={`flex items-center gap-3 mt-16 transition-all duration-700 delay-700 ${vis ? "opacity-100" : "opacity-0"}`}>
            <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
            <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</p>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div className="relative w-full lg:w-[45%] min-h-[50vh] lg:min-h-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85"
            alt="Regeneración urbana"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Blue overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #00246B99 0%, #00246B44 50%, transparent 100%)" }} />
          {/* Blend with left panel on mobile */}
          <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to top, #060d1a 30%, transparent 70%)" }} />
          {/* Subtle left gradient to blend panels */}
          <div className="absolute inset-y-0 left-0 w-24 hidden lg:block" style={{ background: "linear-gradient(to right, #060d1a, transparent)" }} />
        </div>
      </section>

      {/* ── METRICS STRIP ────────────────────────────────────────────── */}
      <section
        className="py-16 border-b border-[#D5D3CE]/40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-metrics"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "1,000", label: "Activos a regenerar", sub: "Visión a 20 años" },
              { num: "3", label: "Ciudades activas", sub: "Economías emergentes" },
              { num: "ZH-01", label: "Zona en desarrollo", sub: "Edison 58" },
              { num: "100%", label: "Modelo estructurado", sub: "Capital + diseño + ejecución" },
            ].map((m, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="border-l-2 border-[#CAAA57] pl-5">
                  <p className="text-[#00246B] font-bold text-2xl md:text-3xl tracking-tight mb-1">{m.num}</p>
                  <p className="text-[#00246B] text-xs font-semibold tracking-wide mb-0.5">{m.label}</p>
                  <p className="text-[#00246B]/40 text-xs">{m.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-manifesto"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase">
                  Manifiesto
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-10 space-y-5">
              {[
                { text: "No compramos edificios en oferta.", dim: false },
                { text: "Regeneramos zonas.", dim: true },
                { text: "No vendemos metros.", dim: false },
                { text: "Creamos patrimonio estructurado.", dim: false, gold: true },
              ].map((line, i) => (
                <FadeIn key={i} delay={i * 120}>
                  <p
                    className={`font-bold leading-tight tracking-tight text-3xl md:text-5xl ${
                      line.gold ? "text-[#CAAA57]" : line.dim ? "text-white/20" : "text-white"
                    }`}
                  >
                    {line.text}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MODELO ZH ────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-model"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left label col */}
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                  Arquitectura de regeneración
                </p>
                <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-6">
                  Modelo ZH
                </h2>
                <p className="text-[#00246B]/55 text-sm leading-relaxed mb-8">
                  Un sistema replicable de transformación urbana. No actuamos por intuición. Ejecutamos sobre activos, zonas y estructuras con potencial medible.
                </p>
                <Link href="/modelo" data-testid="button-model-link">
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#00246B] border-b border-[#CAAA57] pb-0.5 hover:text-[#CAAA57] transition-colors">
                    Ver modelo completo
                    <span className="text-[#CAAA57]">→</span>
                  </span>
                </Link>
              </FadeIn>
            </div>

            {/* Steps col */}
            <div className="lg:col-span-8">
              <div className="space-y-px bg-[#D5D3CE]">
                {[
                  {
                    num: "01",
                    title: "Identificamos activos",
                    body: "Edificios subutilizados con potencial jurídico, urbano y financiero. Detectamos zonas donde otros ven deterioro — nosotros vemos estructura.",
                  },
                  {
                    num: "02",
                    title: "Estructuramos la regeneración",
                    body: "Integramos capital, diseño, remodelación y gobernanza privada. Cada proyecto es una arquitectura financiera aplicada a ciudad.",
                  },
                  {
                    num: "03",
                    title: "Activamos ecosistemas",
                    body: "Convertimos activos en nodos productivos. No renovamos fachadas. Reactivamos economías locales con impacto patrimonial de largo plazo.",
                  },
                ].map((card, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <div
                      className="bg-white p-8 md:p-10 flex gap-8 items-start group hover:bg-[#00246B] transition-all duration-500 cursor-default"
                      data-testid={`card-model-${i + 1}`}
                    >
                      <div className="flex-shrink-0 w-10">
                        <p className="text-[#CAAA57] text-xs font-bold tracking-[0.2em]">{card.num}</p>
                      </div>
                      <div>
                        <h3 className="text-[#00246B] font-bold text-lg tracking-tight mb-3 group-hover:text-white transition-colors duration-500">
                          {card.title}
                        </h3>
                        <p className="text-[#00246B]/55 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                          {card.body}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIADORES ──────────────────────────────────────────── */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-differentiators"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10">
            {[
              {
                label: "No somos",
                title: "Una desarrolladora tradicional",
                body: "No construimos por volumen ni seguimos ciclos especulativos. Cada activo responde a un modelo, no a una intuición.",
              },
              {
                label: "No somos",
                title: "Un fondo inmobiliario convencional",
                body: "No buscamos rendimientos pasivos. Orquestamos capital, diseño y gobernanza para crear ecosistemas productivos.",
              },
              {
                label: "Somos",
                title: "Una arquitectura de regeneración",
                body: "Un sistema replicable que convierte deterioro urbano en patrimonio estructurado. Ciudad como ecosistema. Activos como nodos.",
                highlight: true,
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div
                  className={`p-10 md:p-12 h-full ${item.highlight ? "bg-[#CAAA57]" : "bg-[#00246B]"}`}
                  data-testid={`card-diff-${i + 1}`}
                >
                  <p className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-5 ${item.highlight ? "text-black/50" : "text-white/30"}`}>
                    {item.label}
                  </p>
                  <h3 className={`font-bold text-xl tracking-tight mb-4 leading-snug ${item.highlight ? "text-black" : "text-white"}`}>
                    {item.title}
                  </h3>
                  <div className={`w-8 h-px mb-5 ${item.highlight ? "bg-black/30" : "bg-[#CAAA57]/40"}`} />
                  <p className={`text-sm leading-relaxed ${item.highlight ? "text-black/65" : "text-white/45"}`}>
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIÓN ───────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-vision"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                  Visión a 20 años
                </p>
                <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-8">
                  1,000 activos urbanos estratégicos regenerados.
                </h2>
                <div className="w-10 h-px bg-[#CAAA57] mb-8" />
                <p className="text-[#00246B]/60 text-base leading-relaxed max-w-lg">
                  Liderar la regeneración de activos estratégicos en economías emergentes, redefiniendo el modelo privado de renovación urbana y posicionando a las grandes ciudades como motores globales de prosperidad.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-5">
              <FadeIn delay={150}>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80"
                    alt="Ciudad"
                    className="w-full aspect-[4/3] object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-[#00246B]/30" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="w-8 h-px bg-[#CAAA57] mb-3" />
                    <p className="text-white text-xs font-semibold tracking-[0.15em] uppercase">
                      Ciudades emergentes, nodos estratégicos
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNIDADES ─────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-units"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                  Arquitectura de marca
                </p>
                <h2 className="text-white font-bold text-4xl tracking-tight">
                  Unidades ZH
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
              {[
                {
                  tag: "ZAIAH Flipping",
                  sub: "Desarrollo",
                  body: "Unidad encargada del desarrollo de Zonas ZH, regeneradas y activadas económicamente. Detecta, adquiere y transforma activos subutilizados en nodos productivos.",
                  initial: "ZF",
                },
                {
                  tag: "ZAIAH Propiedades",
                  sub: "Comercialización",
                  body: "Unidad encargada de llevar al mercado activos regenerados con potencial patrimonial de alto impacto. Estructura la oferta para inversores y aliados estratégicos.",
                  initial: "ZP",
                },
              ].map((u, i) => (
                <FadeIn key={i} delay={i * 120}>
                  <div className="bg-[#0a1520] p-10 h-full" data-testid={`card-unit-${i + 1}`}>
                    <div className="flex items-center gap-4 mb-7">
                      <div className="w-9 h-9 bg-[#00246B] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#CAAA57] text-[9px] font-bold tracking-wider">{u.initial}</span>
                      </div>
                      <div>
                        <p className="text-[#CAAA57] text-[10px] tracking-[0.2em] uppercase font-bold">{u.tag}</p>
                        <p className="text-white/30 text-xs">{u.sub}</p>
                      </div>
                    </div>
                    <div className="w-full h-px bg-white/8 mb-7" />
                    <p className="text-white/45 text-sm leading-relaxed">{u.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-40 relative overflow-hidden"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-cta"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                  Siguiente paso
                </p>
                <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-8">
                  Construyamos el siguiente nodo urbano.
                </h2>
                <p className="text-[#00246B]/55 text-base leading-relaxed max-w-md mb-10">
                  Si buscas explorar inversión, presentar un activo o generar una alianza estratégica, podemos iniciar una conversación.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contacto" data-testid="button-cta-agendar">
                    <span className="inline-block px-8 py-4 bg-[#00246B] text-white text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#CAAA57] hover:text-black transition-all duration-300">
                      Agendar conversación
                    </span>
                  </Link>
                  <a
                    href="https://wa.me/525500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-cta-whatsapp"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-[#D5D3CE] text-[#00246B] text-[11px] font-semibold tracking-[0.18em] uppercase hover:border-[#CAAA57] transition-all duration-300"
                  >
                    {WA_ICON}
                    WhatsApp
                  </a>
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-5">
              <FadeIn delay={200}>
                <div className="border border-[#D5D3CE] p-8">
                  <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Iniciativas activas</p>
                  {[
                    { label: "Edison 58", status: "En desarrollo", color: "#CAAA57" },
                    { label: "Zona ZH Salud", status: "Estructuración", color: "#D5D3CE" },
                    { label: "Próxima Zona ZH", status: "En análisis", color: "#A0A0A0" },
                  ].map((p, i) => (
                    <div key={i} className={`flex items-center justify-between py-4 ${i < 2 ? "border-b border-[#D5D3CE]" : ""}`}>
                      <span className="text-[#00246B] text-sm font-medium">{p.label}</span>
                      <span className="text-xs font-semibold tracking-wide" style={{ color: p.color }}>{p.status}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
