import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

function useInView(threshold = 0.1) {
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

function FadeIn({
  children, delay = 0, className = "", from = "bottom"
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "none";
}) {
  const { ref, inView } = useInView();
  const hidden =
    from === "bottom" ? "opacity-0 translate-y-8" :
    from === "left" ? "opacity-0 -translate-x-6" :
    "opacity-0";
  const visible =
    from === "bottom" ? "opacity-100 translate-y-0" :
    from === "left" ? "opacity-100 translate-x-0" :
    "opacity-100";
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${inView ? visible : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const MARQUEE_ITEMS = [
  "Regeneración Urbana",
  "Capital Estructurado",
  "Zonas Estratégicas",
  "Patrimonio Activo",
  "Transformación Urbana",
  "Arquitectura Financiera",
  "Nodos Productivos",
  "Visión 2045",
  "Regeneración Urbana",
  "Capital Estructurado",
  "Zonas Estratégicas",
  "Patrimonio Activo",
  "Transformación Urbana",
  "Arquitectura Financiera",
  "Nodos Productivos",
  "Visión 2045",
];

export default function Home() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main style={{ backgroundColor: "#000" }}>

      {/* ═══════════════════════════════════════════════════════════
          HERO — CINEMATIC FULLSCREEN
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        data-testid="section-hero"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Gradient overlays — depth layers for legibility */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.15) 100%)" }} />
        {/* Subtle blue atmosphere */}
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 75% 35%, #00246B 0%, transparent 65%)" }} />

        {/* Content — vertically centered between header and bottom */}
        <div
          className="relative z-10 flex-1 flex flex-col justify-center w-full"
          style={{ paddingTop: "80px", paddingBottom: "80px" }}
        >
          <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20 w-full">
            <div style={{ maxWidth: "800px" }}>

              {/* Eyebrow */}
              <div
                className="flex items-center gap-4"
                style={{ marginBottom: "1.75rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: "opacity 0.8s ease, transform 0.8s ease", transitionDelay: "0ms" }}
              >
                <span style={{ width: "2rem", height: "1px", backgroundColor: "#CAAA57", flexShrink: 0 }} />
                <p className="eyebrow text-[#CAAA57]">Regeneración Urbana Estructurada</p>
              </div>

              {/* Title */}
              <div
                style={{ marginBottom: "1.75rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "opacity 1s ease, transform 1s ease", transitionDelay: "120ms" }}
              >
                <h1
                  className="text-white font-bold"
                  style={{
                    fontSize: "clamp(2.5rem, 4.8vw, 4.4rem)",
                    lineHeight: "1.04",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Transformamos activos urbanos en{" "}
                  <br className="hidden md:block" />
                  <span style={{ color: "#CAAA57" }}>patrimonio estructurado.</span>
                </h1>
              </div>

              {/* Divider accent */}
              <div
                style={{ marginBottom: "1.5rem", opacity: vis ? 0.5 : 0, transition: "opacity 0.8s ease", transitionDelay: "200ms" }}
              >
                <span style={{ display: "block", width: "2.5rem", height: "1px", backgroundColor: "#CAAA57" }} />
              </div>

              {/* Subtitle */}
              <div
                style={{ marginBottom: "2.25rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(12px)", transition: "opacity 1s ease, transform 1s ease", transitionDelay: "240ms" }}
              >
                <p
                  style={{
                    fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                    lineHeight: "1.75",
                    maxWidth: "480px",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 300,
                  }}
                >
                  Identificamos, adquirimos y regeneramos activos estratégicos en ciudades emergentes — creando patrimonio con impacto económico, urbano y estructural.
                </p>
              </div>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row items-start"
                style={{ gap: "0.75rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(12px)", transition: "opacity 1s ease, transform 1s ease", transitionDelay: "320ms" }}
              >
                {/* Primary CTA — gold, premium */}
                <Link href="/contacto" data-testid="button-hero-agendar">
                  <span
                    className="inline-flex items-center cursor-pointer"
                    style={{
                      backgroundColor: "#CAAA57",
                      color: "#000000",
                      padding: "0.9rem 2rem",
                      fontSize: "9.5px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      transition: "background-color 0.3s ease",
                      whiteSpace: "nowrap",
                      display: "inline-flex",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#CAAA57"; }}
                  >
                    Agendar conversación
                  </span>
                </Link>

                {/* Secondary CTA — ghost */}
                <Link href="/portafolio" data-testid="button-hero-portafolio">
                  <span
                    className="inline-flex items-center gap-2 cursor-pointer"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      padding: "0.9rem 2rem",
                      fontSize: "9.5px",
                      fontWeight: 600,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      border: "1px solid rgba(255,255,255,0.18)",
                      transition: "color 0.3s ease, border-color 0.3s ease",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "rgba(255,255,255,0.9)";
                      el.style.borderColor = "rgba(255,255,255,0.45)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "rgba(255,255,255,0.55)";
                      el.style.borderColor = "rgba(255,255,255,0.18)";
                    }}
                  >
                    Ver portafolio
                    <span style={{ color: "#CAAA57", fontSize: "11px" }}>→</span>
                  </span>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll cue — bottom right */}
        <div
          className={`absolute bottom-8 right-10 md:right-16 flex flex-col items-center gap-3 transition-all duration-1000 ${vis ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "900ms" }}
        >
          <div style={{ width: "1px", height: "56px", background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }} />
          <p className="eyebrow text-white/20" style={{ writingMode: "vertical-rl", letterSpacing: "0.4em" }}>Scroll</p>
        </div>

        {/* Bottom left: location tag */}
        <div
          className={`absolute bottom-8 left-8 md:left-14 lg:left-20 transition-all duration-1000 ${vis ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1000ms" }}
        >
          <div className="flex items-center gap-3">
            <span style={{ width: "1rem", height: "1px", backgroundColor: "rgba(202,170,87,0.4)" }} />
            <p className="eyebrow text-white/20">Ciudad de México · MX</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MARQUEE STRIP
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden py-4 border-y border-[#CAAA57]/20"
        style={{ backgroundColor: "#0a0a0a" }}
        data-testid="section-marquee"
      >
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="eyebrow text-white/20 whitespace-nowrap">{item}</span>
              <span className="w-1 h-1 rounded-full bg-[#CAAA57]/40 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          INTRO — WHO WE ARE
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-intro"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-5 h-px bg-[#CAAA57]" />
                  <p className="eyebrow text-[#CAAA57]">Quiénes somos</p>
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <FadeIn delay={100}>
                <p className="text-[#00246B] font-light text-2xl md:text-3xl leading-[1.5] tracking-tight mb-10">
                  ZAIAH es una firma privada de regeneración urbana estructurada. Identificamos activos deteriorados con potencial oculto y los convertimos en ecosistemas productivos — con rigor institucional, visión de largo plazo y ejecución disciplinada.
                </p>
              </FadeIn>
              <FadeIn delay={200}>
                <Link href="/quienes-somos" data-testid="button-intro-nosotros">
                  <span className="inline-flex items-center gap-3 eyebrow text-[#00246B] border-b border-[#CAAA57] pb-1 hover:text-[#CAAA57] transition-colors cursor-pointer">
                    Conocer la firma
                    <span className="text-[#CAAA57] text-xs">→</span>
                  </span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MANIFESTO — TYPOGRAPHIC DRAMA
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44 overflow-hidden"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-manifesto"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-10">
            <div className="lg:col-span-3">
              <FadeIn>
                <div>
                  <p className="eyebrow text-[#CAAA57] mb-5">Manifiesto</p>
                  <div className="w-px h-20 bg-gradient-to-b from-[#CAAA57]/40 to-transparent hidden lg:block" />
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-9">
              <div className="space-y-3">
                {[
                  { text: "No compramos edificios en oferta.", weight: "font-bold", opacity: "text-white" },
                  { text: "Regeneramos zonas.", weight: "font-light", opacity: "text-white/20" },
                  { text: "No vendemos metros cuadrados.", weight: "font-bold", opacity: "text-white" },
                  { text: "Creamos patrimonio", weight: "font-bold", opacity: "text-white" },
                  { text: "estructurado.", weight: "font-bold", opacity: "text-[#CAAA57]", big: true },
                ].map((line, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <p
                      className={`${line.weight} ${line.opacity} leading-tight tracking-tight ${
                        line.big
                          ? "text-4xl md:text-6xl lg:text-7xl"
                          : "text-3xl md:text-5xl lg:text-6xl"
                      }`}
                    >
                      {line.text}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MODELO ZH — 3 STEPS
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-model"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-5 h-px bg-[#CAAA57]" />
                  <p className="eyebrow text-[#CAAA57]">Arquitectura de regeneración</p>
                </div>
                <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight leading-tight">
                  Modelo ZH
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <FadeIn delay={100}>
                <p className="text-[#00246B]/50 text-base font-light leading-relaxed">
                  Un sistema replicable de tres fases que convierte deterioro urbano en patrimonio estructurado. No trabajamos por intuición. Ejecutamos sobre datos, criterios y modelos con capacidad de escala.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D5D3CE]">
            {[
              {
                num: "01",
                title: "Identificamos activos",
                body: "Edificios subutilizados con potencial jurídico, urbano y financiero. Detectamos oportunidades donde otros ven deterioro. Cada selección pasa por 8 criterios de análisis.",
                tag: "Detección",
              },
              {
                num: "02",
                title: "Estructuramos la regeneración",
                body: "Integramos capital, diseño, remodelación y gobernanza privada. Cada proyecto es una arquitectura financiera aplicada a la ciudad. No delegamos la visión.",
                tag: "Ejecución",
              },
              {
                num: "03",
                title: "Activamos ecosistemas",
                body: "Convertimos activos en nodos productivos con impacto económico y patrimonial. No renovamos fachadas. Reactivamos economías locales con visión de 20 años.",
                tag: "Impacto",
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div
                  className="bg-white group cursor-default h-full flex flex-col"
                  style={{ transition: "background-color 0.5s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#00246B")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#ffffff")}
                  data-testid={`card-model-${i + 1}`}
                >
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-10">
                      <span
                        className="text-[#CAAA57] font-bold text-4xl leading-none"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {card.num}
                      </span>
                      <span className="eyebrow text-[#CAAA57]/50">{card.tag}</span>
                    </div>
                    <h3
                      className="font-bold text-xl tracking-tight mb-4 leading-snug text-[#00246B]"
                      style={{ transition: "color 0.5s ease" }}
                    >
                      {card.title}
                    </h3>
                    <div className="w-7 h-px bg-[#CAAA57] mb-5" />
                    <p
                      className="text-sm leading-relaxed flex-1 text-[#00246B]/55"
                      style={{ transition: "color 0.5s ease" }}
                    >
                      {card.body}
                    </p>
                  </div>
                  <div className="px-10 pb-8">
                    <Link href="/modelo">
                      <span
                        className="eyebrow text-[#CAAA57]/50 hover:text-[#CAAA57] transition-colors cursor-pointer"
                      >
                        Ver fase →
                      </span>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="flex justify-start mt-12">
              <Link href="/modelo" data-testid="button-model-more">
                <span className="inline-flex items-center gap-3 eyebrow text-[#00246B] border-b border-[#CAAA57] pb-1 hover:text-[#CAAA57] transition-colors cursor-pointer">
                  Ver modelo completo →
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FULL-BLEED STATEMENT — CINEMATIC SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "70vh" }}
        data-testid="section-statement"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=85&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.95) 30%, rgba(0,36,107,0.7) 65%, rgba(0,0,0,0.5) 100%)" }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 lg:px-20 py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-6 h-px bg-[#CAAA57]" />
                  <p className="eyebrow text-[#CAAA57]">Por qué existimos</p>
                </div>
                <h2 className="text-white font-bold text-3xl md:text-5xl leading-[1.1] tracking-tight mb-8">
                  No renovamos fachadas.
                  <br />
                  <span className="font-light text-white/50">Reactivamos economías.</span>
                </h2>
                <div className="w-10 h-px bg-[#CAAA57] mb-8" />
                <p className="text-white/45 text-base font-light leading-relaxed max-w-md">
                  Cada activo que regeneramos impacta su entorno, genera empleo, atrae capital y crea patrimonio duradero. La ciudad como ecosistema. Los activos como nodos estratégicos.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-5 flex items-end">
              <FadeIn delay={200}>
                <div className="border-l-2 border-[#CAAA57]/30 pl-8 space-y-6">
                  {[
                    { num: "1,000", label: "Activos en visión" },
                    { num: "20", label: "Años de horizonte" },
                    { num: "3", label: "Ciudades estratégicas" },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-white font-bold text-3xl tracking-tight">{s.num}</p>
                      <p className="eyebrow text-white/30 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DIFERENCIADORES — 3 COLUMNS
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44"
        style={{ backgroundColor: "#060d1a" }}
        data-testid="section-differentiators"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="mb-20">
            <FadeIn>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-5 h-px bg-[#CAAA57]" />
                <p className="eyebrow text-[#CAAA57]">Posicionamiento</p>
              </div>
              <h2 className="text-white font-bold text-4xl md:text-5xl tracking-tight">
                Lo que nos distingue.
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                prefix: "No somos",
                title: "Una desarrolladora tradicional",
                body: "No construimos por volumen ni seguimos ciclos especulativos. Cada activo responde a un modelo, no a una intuición de mercado.",
                highlight: false,
              },
              {
                prefix: "No somos",
                title: "Un fondo inmobiliario convencional",
                body: "No buscamos rendimientos pasivos. Orquestamos capital, diseño y gobernanza activa para crear ecosistemas productivos.",
                highlight: false,
              },
              {
                prefix: "Somos",
                title: "Una arquitectura de regeneración urbana",
                body: "Un sistema replicable que convierte deterioro en patrimonio estructurado. Ciudad como ecosistema. Activos como nodos de largo plazo.",
                highlight: true,
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div
                  className="p-10 md:p-12 h-full"
                  style={{ backgroundColor: item.highlight ? "#CAAA57" : "#0d1a2e" }}
                  data-testid={`card-diff-${i + 1}`}
                >
                  <p
                    className="eyebrow mb-6"
                    style={{ color: item.highlight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.2)" }}
                  >
                    {item.prefix}
                  </p>
                  <h3
                    className="font-bold text-xl tracking-tight mb-4 leading-snug"
                    style={{ color: item.highlight ? "#000" : "#fff" }}
                  >
                    {item.title}
                  </h3>
                  <div
                    className="w-7 h-px mb-6"
                    style={{ backgroundColor: item.highlight ? "rgba(0,0,0,0.2)" : "rgba(202,170,87,0.3)" }}
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: item.highlight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PORTAFOLIO PREVIEW
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-portfolio-preview"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-6">
              <FadeIn>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-5 h-px bg-[#CAAA57]" />
                  <p className="eyebrow text-[#CAAA57]">Portafolio activo</p>
                </div>
                <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight">
                  Zonas en transformación.
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-6 flex items-end justify-end">
              <FadeIn delay={100}>
                <Link href="/portafolio" data-testid="button-portfolio-more">
                  <span className="inline-flex items-center gap-3 eyebrow text-[#00246B] border-b border-[#CAAA57] pb-1 hover:text-[#CAAA57] transition-colors cursor-pointer">
                    Ver portafolio completo →
                  </span>
                </Link>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Edison 58",
                cat: "Regeneración habitacional",
                status: "En desarrollo",
                color: "#CAAA57",
                img: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&q=80",
                loc: "Ciudad de México",
              },
              {
                name: "Zona ZH Salud",
                cat: "Ecosistema wellness",
                status: "Estructuración",
                color: "#D5D3CE",
                img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
                loc: "Ciudad de México",
              },
              {
                name: "Próxima Zona ZH",
                cat: "Activo estratégico",
                status: "En análisis",
                color: "#606060",
                img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
                loc: "Por confirmar",
              },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 100}>
                <Link href="/portafolio" data-testid={`card-portfolio-preview-${i + 1}`}>
                  <div className="group relative overflow-hidden cursor-pointer">
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        style={{ transform: "scale(1.04)", transition: "transform 0.7s ease, filter 0.7s ease" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.0)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}
                      />
                    </div>
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                        <p className="eyebrow text-white/50">{p.status}</p>
                      </div>
                      <p className="eyebrow text-[#CAAA57] mb-2">{p.cat}</p>
                      <h3 className="text-white font-bold text-xl tracking-tight">{p.name}</h3>
                      <p className="eyebrow text-white/30 mt-2">{p.loc}</p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          VISIÓN — TYPOGRAPHIC STATEMENT
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44 relative overflow-hidden"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-vision"
      >
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #CAAA57 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <span className="w-5 h-px bg-[#CAAA57]" />
              <p className="eyebrow text-[#CAAA57]">Visión a 20 años</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <h2 className="text-white font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em]">
                  1,000
                </h2>
                <h3 className="text-white/40 font-light text-3xl md:text-4xl tracking-tight mt-3 mb-8">
                  activos urbanos regenerados.
                </h3>
                <div className="w-10 h-px bg-[#CAAA57] mb-8" />
                <p className="text-white/40 text-base font-light leading-relaxed max-w-xl">
                  Liderar la regeneración de activos estratégicos en economías emergentes — redefiniendo el modelo privado de renovación urbana y posicionando a las grandes ciudades como motores globales de prosperidad.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-end items-end">
                <Link href="/portafolio" data-testid="button-vision-portafolio">
                  <span className="inline-block px-7 py-3.5 border border-[#CAAA57]/30 eyebrow text-[#CAAA57] hover:bg-[#CAAA57] hover:text-black hover:border-[#CAAA57] transition-all duration-300 cursor-pointer">
                    Ver proyectos →
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA — FINAL CALL TO ACTION
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-cta"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-end">
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-5 h-px bg-[#CAAA57]" />
                  <p className="eyebrow text-[#CAAA57]">Siguiente paso</p>
                </div>
                <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em] mb-8">
                  Construyamos el<br />
                  <span className="font-light text-white/40">siguiente</span> nodo urbano.
                </h2>
                <p className="text-white/35 text-base font-light leading-relaxed max-w-md mb-10">
                  Si buscas explorar inversión, presentar un activo o generar una alianza estratégica con ZAIAH, podemos iniciar una conversación.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contacto" data-testid="button-cta-agendar">
                    <span className="inline-block px-8 py-4 bg-[#CAAA57] text-black eyebrow hover:bg-white transition-all duration-300 cursor-pointer">
                      Agendar conversación
                    </span>
                  </Link>
                  <a
                    href="https://wa.me/525500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-cta-whatsapp"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-white/15 eyebrow text-white/60 hover:border-white/40 hover:text-white transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right side — stats card */}
            <div className="lg:col-span-5">
              <FadeIn delay={200}>
                <div className="border border-white/8 p-8">
                  <p className="eyebrow text-[#CAAA57] mb-7">Iniciativas activas</p>
                  {[
                    { label: "Edison 58", status: "En desarrollo", dot: "#CAAA57" },
                    { label: "Zona ZH Salud", status: "Estructuración", dot: "#D5D3CE" },
                    { label: "Próxima Zona ZH", status: "En análisis", dot: "#606060" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between py-5 ${i < 2 ? "border-b border-white/8" : ""}`}
                    >
                      <span className="text-white/70 text-sm font-medium">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.dot }} />
                        <span className="eyebrow text-white/30">{item.status}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-7 border-t border-white/8 mt-2">
                    <Link href="/portafolio">
                      <span className="eyebrow text-white/25 hover:text-[#CAAA57] transition-colors cursor-pointer">
                        Ver portafolio completo →
                      </span>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
