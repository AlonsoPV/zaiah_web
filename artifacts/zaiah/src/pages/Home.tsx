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

const HOME_PROJECTS = [
  {
    id: "san-pedro-patriotismo",
    name: "San Pedro Patriotismo",
    category: "Boutique Medical Real Estate",
    location: "San Pedro de los Pinos, CDMX",
    status: "Preventa activa",
    statusColor: "#CAAA57",
    description:
      "El único proyecto de inversión en consultorios boutique de especialidad a 5 minutos del WTC. Zona médica de alta demanda con plusvalía comprobada y administración profesional.",
    tags: ["Médico", "Renta Pasiva", "Bajo Riesgo"],
    metrics: [
      { value: "$1.5 MDP", label: "Inversión desde" },
      { value: "9% anual", label: "Rentabilidad estimada" },
      { value: "14 m²", label: "Tamaño desde" },
      { value: "Consultorio", label: "Tipo de activo" },
    ],
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "edison-58-tabacalera",
    name: "Edison 58 Tabacalera",
    category: "Departamentos Boutique · Renta Corta",
    location: "Tabacalera, CDMX",
    status: "Cupo limitado",
    statusColor: "#E8533A",
    description:
      "El único proyecto boutique de la Tabacalera para inversionistas que buscan una propiedad en un mercado de alta demanda. Diseño histórico, zona céntrica con la mayor plusvalía de CDMX.",
    tags: ["Renta Corta", "Alta Plusvalía", "Diseño Histórico"],
    metrics: [
      { value: "$4.7 MDP", label: "Inversión desde" },
      { value: "12%", label: "Cap Rate rentas cortas" },
      { value: "$68 USD", label: "Tarifa Airbnb promedio" },
      { value: "Departamento", label: "Tipo de activo" },
    ],
    img: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=85&auto=format&fit=crop",
  },
];

function HomeProjectCard({ project, delay = 0 }: { project: typeof HOME_PROJECTS[0]; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="flex flex-col overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(32px)",
        transition: "opacity 0.9s ease, transform 0.9s ease, box-shadow 0.35s ease, border-color 0.35s ease",
        transitionDelay: `${delay}ms`,
        border: hovered ? "1px solid rgba(202,170,87,0.6)" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: hovered ? "0 12px 48px rgba(0,0,0,0.14)" : "0 2px 16px rgba(0,0,0,0.06)",
        backgroundColor: "#ffffff",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header — dark institutional blue */}
      <div style={{ backgroundColor: "#00246B", position: "relative", overflow: "hidden" }}>
        <img
          src={project.img}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "grayscale(100%)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,36,107,0.7) 0%, rgba(0,36,107,0.95) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "2rem 2rem 1.75rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#CAAA57" }}>
              {project.category}
            </p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.3rem 0.75rem", border: `1px solid ${project.statusColor}`, borderRadius: "2px", flexShrink: 0 }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: project.statusColor, flexShrink: 0 }} />
              <span style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: project.statusColor, whiteSpace: "nowrap" }}>
                {project.status}
              </span>
            </span>
          </div>
          <h3 style={{ color: "#ffffff", fontWeight: 800, fontSize: "clamp(1.5rem, 2.8vw, 2rem)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.625rem" }}>
            {project.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "rgba(202,170,87,0.6)", fontSize: "11px" }}>◎</span>
            <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              {project.location}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.75rem 2rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem", flex: 1 }}>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(0,36,107,0.6)" }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ display: "inline-block", padding: "0.3rem 0.75rem", backgroundColor: "rgba(0,36,107,0.06)", border: "1px solid rgba(0,36,107,0.12)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#00246B" }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ height: "1px", backgroundColor: "rgba(0,36,107,0.08)" }} />

        {/* Metrics 2×2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "rgba(0,36,107,0.08)", border: "1px solid rgba(0,36,107,0.08)" }}>
          {project.metrics.map((m, i) => (
            <div key={i} style={{ padding: "1rem 1.1rem", backgroundColor: i % 2 === 0 ? "#fafafa" : "#ffffff" }}>
              <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 800, color: "#00246B", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.25rem" }}>
                {m.value}
              </p>
              <p style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,36,107,0.4)" }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "auto", paddingTop: "0.25rem" }}>
          <Link href="/portafolio">
            <span
              className="block w-full text-center cursor-pointer"
              style={{
                backgroundColor: hovered ? "#00246B" : "transparent",
                color: hovered ? "#ffffff" : "#00246B",
                border: "1px solid #00246B",
                padding: "0.9rem 1.5rem",
                fontSize: "9.5px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              Ver Proyecto Completo
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main style={{ backgroundColor: "#000" }}>

      {/* ═══════════════════════════════════════════════════════════
          HERO — CINEMATIC FULLSCREEN
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{ minHeight: "calc(100vh - 56px)" }}
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
                  className="text-white"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(2.6rem, 5vw, 4.8rem)",
                    lineHeight: "1.06",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Las ciudades siguen creciendo.{" "}
                  <br className="hidden md:block" />
                  <em style={{ color: "#CAAA57", fontStyle: "italic" }}>No todos participan de su transformación.</em>
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
                  Mientras algunas zonas pierden valor, otras esconden activos con potencial patrimonial desaprovechado.
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
          EL PROBLEMA — NARRATIVE TENSION
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-52 overflow-hidden"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-problema"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left — eyebrow + vertical rule */}
            <div className="lg:col-span-3">
              <FadeIn>
                <p className="eyebrow text-[#CAAA57] mb-6">El problema</p>
                <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-[#CAAA57]/30 to-transparent" />
              </FadeIn>
            </div>

            {/* Right — narrative copy */}
            <div className="lg:col-span-9">
              <div className="space-y-0">
                {[
                  { text: "Las ciudades no colapsan de un día para otro.", serif: true, dim: false },
                  { text: "Se deterioran lentamente.", serif: true, dim: true },
                  { text: "Activos subutilizados.", serif: false, dim: true, small: true },
                  { text: "Zonas ignoradas por el capital.", serif: false, dim: true, small: true },
                  { text: "Oportunidades que el mercado tradicional no sabe ver.", serif: false, dim: true, small: true },
                ].map((line, i) => (
                  <FadeIn key={i} delay={i * 130}>
                    <p
                      style={{
                        fontFamily: line.serif ? "'Playfair Display', Georgia, serif" : "inherit",
                        fontWeight: line.serif ? 500 : 400,
                        fontStyle: line.serif && i > 0 ? "italic" : "normal",
                        fontSize: line.small ? "clamp(1rem, 1.4vw, 1.2rem)" : "clamp(1.7rem, 3.2vw, 2.8rem)",
                        lineHeight: line.small ? 1.7 : 1.2,
                        color: line.dim ? "rgba(0,36,107,0.22)" : "#00246B",
                        letterSpacing: line.serif ? "-0.01em" : "0",
                        paddingTop: line.small ? "0.1rem" : i === 0 ? "0" : "0.5rem",
                        paddingBottom: line.small ? "0.1rem" : "0.5rem",
                        paddingLeft: line.small ? "0.25rem" : "0",
                        borderLeft: line.small ? "2px solid rgba(0,36,107,0.08)" : "none",
                        marginLeft: line.small ? "0.5rem" : "0",
                      }}
                    >
                      {line.text}
                    </p>
                  </FadeIn>
                ))}
              </div>

              {/* User desire identification */}
              <FadeIn delay={580}>
                <div className="mt-12 mb-4" style={{ borderLeft: "2px solid rgba(202,170,87,0.2)", paddingLeft: "1.5rem" }}>
                  <p style={{ fontSize: "clamp(1rem, 1.3vw, 1.1rem)", lineHeight: 1.9, color: "rgba(0,36,107,0.5)", fontWeight: 300 }}>
                    Cada vez más inversionistas buscan construir ingresos sostenibles respaldados por activos estratégicos. No quieren depender únicamente de su tiempo. Buscan patrimonio heredable. Renta estructurada. Participar en algo que trascienda.
                  </p>
                </div>
              </FadeIn>

              {/* The pivot — ZAIAH enters */}
              <FadeIn delay={750}>
                <div className="mt-12 pt-10 border-t border-[#CAAA57]/20">
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                      lineHeight: 1.2,
                      color: "#00246B",
                      letterSpacing: "-0.01em",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Ahí es donde opera ZAIAH.
                  </p>
                  <Link href="/quienes-somos" data-testid="button-problema-conocer">
                    <span className="inline-flex items-center gap-3 eyebrow text-[#00246B] border-b border-[#CAAA57] pb-1 hover:text-[#CAAA57] transition-colors cursor-pointer">
                      Entender el modelo →
                    </span>
                  </Link>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LA OPORTUNIDAD — FULL-BLEED EDITORIAL
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "65vh", display: "flex", alignItems: "center" }}
        data-testid="section-oportunidad"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "grayscale(40%)" }}
          />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0.2) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(0,36,107,0.15) 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 lg:px-20 py-24 w-full">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="eyebrow text-[#CAAA57] mb-7">La oportunidad</p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  lineHeight: 1.15,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                  marginBottom: "1.5rem",
                }}
              >
                Existen activos estratégicos ignorados por el mercado tradicional.
              </h2>
              <div style={{ width: "2.5rem", height: "1px", backgroundColor: "#CAAA57", marginBottom: "1.5rem" }} />
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.8, maxWidth: "36rem" }}>
                ZAIAH los detecta antes que el mercado. Los estructura con rigor institucional. Los transforma en patrimonio con visión de 20 años.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          INTRO — WHO WE ARE
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-28 md:py-36"
        style={{ backgroundColor: "#ffffff" }}
        data-testid="section-intro"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-5 h-px bg-[#CAAA57]" />
                  <p className="eyebrow text-[#CAAA57]">Quiénes somos</p>
                </div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
                    lineHeight: 1.2,
                    color: "#00246B",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Una firma privada de regeneración urbana estructurada.
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <FadeIn delay={150}>
                <p className="text-[#00246B]/55 font-light text-lg leading-[1.8] tracking-tight mb-8" style={{ borderLeft: "2px solid rgba(202,170,87,0.25)", paddingLeft: "1.5rem" }}>
                  No compramos activos en oferta. Detectamos zonas con potencial.<br />
                  No vendemos metros cuadrados. Creamos patrimonio estructurado.<br />
                  No seguimos tendencias. Construimos modelos replicables.
                </p>
              </FadeIn>
              <FadeIn delay={280}>
                <Link href="/quienes-somos" data-testid="button-intro-nosotros">
                  <span className="inline-flex items-center gap-3 eyebrow text-[#00246B] border-b border-[#CAAA57] pb-1 hover:text-[#CAAA57] transition-colors cursor-pointer">
                    Conocer la firma →
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
        className="py-32 md:py-52 overflow-hidden"
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
              <div className="space-y-2">
                {[
                  { text: "No remodelamos edificios.", serif: true, color: "rgba(255,255,255,0.15)" },
                  { text: "Regeneramos sistemas urbanos.", serif: true, color: "#ffffff" },
                  { text: "No compramos activos en oferta.", serif: true, color: "rgba(255,255,255,0.15)" },
                  { text: "Detectamos zonas con potencial.", serif: true, color: "#ffffff" },
                  { text: "No vendemos metros cuadrados.", serif: true, color: "rgba(255,255,255,0.15)" },
                  { text: "Creamos patrimonio estructurado.", serif: true, color: "#CAAA57", large: true },
                ].map((line, i) => (
                  <FadeIn key={i} delay={i * 110}>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 500,
                        fontStyle: i % 2 === 0 ? "normal" : "italic",
                        color: line.color,
                        fontSize: line.large
                          ? "clamp(2.2rem, 4.8vw, 5rem)"
                          : "clamp(1.9rem, 3.8vw, 3.8rem)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.01em",
                      }}
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
                prefix: "Para quienes buscan",
                title: "Patrimonio real, no inmuebles especulativos",
                body: "No seguimos ciclos de oferta y demanda ni construimos por volumen. Cada activo que seleccionamos responde a un modelo de largo plazo con criterios institucionales de análisis y selección.",
                highlight: false,
              },
              {
                prefix: "Para quienes evitan",
                title: "Las complicaciones de operar directamente",
                body: "ZAIAH estructura, opera y administra el activo. El inversionista participa del valor sin gestionar propiedades diariamente. Patrimonio profesional, sin fricción operativa.",
                highlight: false,
              },
              {
                prefix: "Para quienes entienden",
                title: "Que el capital bien estructurado genera legado",
                body: "No se trata de adquirir metros cuadrados. Se trata de participar en activos capaces de generar valor urbano, renta sostenible y patrimonio heredable por generaciones.",
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
          PORTAFOLIO PREVIEW — investment cards (same as /portafolio)
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{ backgroundColor: "#EFEEED", paddingTop: "5rem", paddingBottom: "6rem" }}
        data-testid="section-portfolio-preview"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">

          {/* Section header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-5 h-px bg-[#CAAA57]" />
                  <p className="eyebrow text-[#CAAA57]">Portafolio activo</p>
                </div>
                <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight leading-[1.08]">
                  Activos estratégicos en operación.
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-5 flex items-end justify-start lg:justify-end">
              <FadeIn delay={100}>
                <Link href="/portafolio" data-testid="button-portfolio-more">
                  <span className="inline-flex items-center gap-3 eyebrow text-[#00246B] border-b border-[#CAAA57] pb-1 hover:text-[#CAAA57] transition-colors cursor-pointer">
                    Ver portafolio completo →
                  </span>
                </Link>
              </FadeIn>
            </div>
          </div>

          {/* Investment cards — identical to /portafolio page */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {HOME_PROJECTS.map((project, i) => (
              <HomeProjectCard key={project.id} project={project} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROYECCIÓN — ASPIRATION QUOTE
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-28 md:py-40 overflow-hidden"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-proyeccion"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-1 hidden lg:block">
              <FadeIn>
                <div className="w-px h-20 bg-gradient-to-b from-[#CAAA57]/30 to-transparent" />
              </FadeIn>
            </div>
            <div className="lg:col-span-11">
              <FadeIn delay={100}>
                <p className="eyebrow text-[#CAAA57] mb-8">La participación</p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.5rem, 3vw, 2.6rem)",
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.28)" }}>No se trata únicamente de adquirir propiedades.</span>
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.28)" }}>Se trata de participar en activos capaces de generar</span>
                  <br />
                  <em style={{ color: "#CAAA57", fontStyle: "italic" }}>
                    valor urbano, estabilidad patrimonial y flujo sostenible.
                  </em>
                </p>
              </FadeIn>
            </div>
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
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(4rem, 9vw, 9rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  1,000
                </h2>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    lineHeight: 1.2,
                    color: "rgba(255,255,255,0.35)",
                    marginTop: "0.75rem",
                    marginBottom: "2rem",
                  }}
                >
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
                {/* Vision closing statement */}
                <div style={{ marginBottom: "3rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 400,
                      fontStyle: "italic",
                      fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.28)",
                      letterSpacing: "0",
                    }}
                  >
                    Las ciudades seguirán transformándose.<br />
                    La diferencia estará en quién participe de esa transformación.
                  </p>
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <span className="w-5 h-px bg-[#CAAA57]" />
                  <p className="eyebrow text-[#CAAA57]">Siguiente paso</p>
                </div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    color: "#ffffff",
                    marginBottom: "2rem",
                  }}
                >
                  Construyamos el{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic", fontWeight: 400 }}>siguiente</em>{" "}
                  nodo urbano.
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
