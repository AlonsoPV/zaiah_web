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

const founders = [
  {
    name: "Nombre Fundador",
    title: "Co-Fundador & Director General",
    bio: "Identifica lo que otros descartan. Convierte el deterioro urbano en tesis de inversión. Más de una década estructurando operaciones en economías donde la mayoría no ve oportunidad.",
  },
  {
    name: "Nombre Fundador",
    title: "Co-Fundador & Director de Operaciones",
    bio: "Diseña los modelos que hacen viable lo que parece imposible. Su criterio financiero convierte cada activo en una operación institucional, replicable y escalable.",
  },
];

const team = [
  { name: "Nombre", area: "Inversiones", role: "Director de Capital", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Nombre", area: "Diseño Urbano", role: "Arquitecto Principal", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80" },
  { name: "Nombre", area: "Legal", role: "Directora Jurídica", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80" },
  { name: "Nombre", area: "Comercialización", role: "Director Comercial", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
];

const pillars = [
  { title: "Visionaria pero disciplinada", body: "Pensamos en décadas, ejecutamos en trimestres. La visión sin estructura es solo retórica." },
  { title: "Estratégica pero humana", body: "Cada decisión es calculada. Pero detrás de cada activo hay una comunidad que se transforma." },
  { title: "Institucional pero boutique", body: "La solidez de una firma establecida. La precisión de un equipo que selecciona con criterio." },
  { title: "Silenciosamente dominante", body: "No necesitamos hacer ruido. Los ecosistemas que creamos hablan por sí solos." },
];

function MetricCard({ value, title, sub, index }: { value: string; title: string; sub: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "3rem 0 3rem",
        paddingRight: "2.5rem",
        borderLeft: index === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
        paddingLeft: index === 0 ? "0" : "2.5rem",
        borderTop: hovered ? "2px solid #CAAA57" : "2px solid transparent",
        transition: "border-color 0.3s ease",
        cursor: "default",
      }}
    >
      <p style={{
        color: hovered ? "#fff" : "#CAAA57",
        fontWeight: 800,
        fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
        lineHeight: 1,
        letterSpacing: "-0.04em",
        marginBottom: "1.1rem",
        transition: "color 0.3s ease",
      }}>
        {value}
      </p>
      <div style={{ width: "1.5rem", height: "1px", backgroundColor: "rgba(202,170,87,0.4)", marginBottom: "0.875rem" }} />
      <p style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.375rem" }}>
        {title}
      </p>
      <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
        {sub}
      </p>
    </div>
  );
}

export default function QuienesSomos() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <main>
      {/* HERO */}
      <section
        className="relative pt-40 pb-28 md:pb-40 overflow-hidden"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-about-hero"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            mixBlendMode: "luminosity",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.35em] uppercase mb-6">
              Quiénes Somos
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "#ffffff",
                maxWidth: "760px",
                marginBottom: "1.75rem",
              }}
            >
              Una firma construida para quienes piensan
              <br />
              <em style={{ color: "#CAAA57", fontStyle: "italic" }}>en generaciones, no en transacciones.</em>
            </h1>
            <div className="w-10 h-px bg-[#CAAA57] mb-7" />
            <p className="text-white/50 text-base font-light max-w-lg leading-relaxed">
              Detrás de cada activo regenerado hay una metodología, un equipo y una visión de largo plazo que convierte deterioro urbano en patrimonio estructurado.
            </p>
          </div>
        </div>
      </section>

      {/* EDITORIAL — DIFERENCIADORES */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-differentiator"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                  Posicionamiento
                </p>
                <h2 className="text-[#00246B] font-bold text-4xl tracking-tight leading-tight">
                  Lo que nos distingue.
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-5">
                {[
                  { text: "No somos una desarrolladora tradicional.", highlight: false },
                  { text: "No somos un fondo inmobiliario convencional.", highlight: false },
                  { text: "Somos una arquitectura de regeneración.", highlight: true },
                ].map((line, i) => (
                  <FadeIn key={i} delay={i * 120}>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: line.highlight ? 600 : 400,
                        fontStyle: !line.highlight ? "italic" : "normal",
                        fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                        lineHeight: 1.2,
                        color: line.highlight ? "#00246B" : "rgba(0,36,107,0.22)",
                        letterSpacing: "-0.01em",
                        textDecoration: line.highlight ? "none" : "line-through",
                        textDecorationColor: "rgba(0,36,107,0.14)",
                        textDecorationThickness: "1px",
                      }}
                    >
                      {line.text}
                    </p>
                  </FadeIn>
                ))}
                <FadeIn delay={400}>
                  <div className="pt-6">
                    <div className="w-10 h-px bg-[#CAAA57]" />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODELO REFERENCIA */}
      <section
        className="py-20"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-modelo-ref"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-lg">
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">Metodología</p>
                <p className="text-white font-semibold text-lg leading-snug">
                  Operamos sobre un modelo estructurado de 3 fases: identificación, estructuración y activación. Cada proyecto responde a criterios medibles, no a intuición.
                </p>
              </div>
              <Link href="/modelo" data-testid="button-about-modelo">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#CAAA57]/40 text-[#CAAA57] text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#CAAA57] hover:text-black hover:border-[#CAAA57] transition-all duration-300 whitespace-nowrap">
                  Conocer el modelo →
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOUNDERS */}
      <section
        style={{ backgroundColor: "#EFEEED", overflow: "hidden" }}
        data-testid="section-founders"
      >

        {/* ── OPENING NARRATIVE — dark cinematic band ── */}
        <div style={{ backgroundColor: "#000000", padding: "5.5rem 0 6rem" }}>
          <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
            <FadeIn>
              <p style={{
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#CAAA57",
                marginBottom: "2rem",
              }}>
                Regeneración · Visión · Ejecución
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontStyle: "italic",
                  fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  maxWidth: "700px",
                  marginBottom: "3rem",
                }}
              >
                Las ciudades cambian cuando alguien decide regenerarlas.
              </h2>
            </FadeIn>
            <FadeIn delay={140}>
              <div style={{
                borderLeft: "1px solid rgba(202,170,87,0.35)",
                paddingLeft: "1.75rem",
                maxWidth: "560px",
              }}>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.5)",
                }}>
                  "ZAIAH nació bajo una idea simple: los activos deteriorados no representan el final de una zona. Representan el inicio de una transformación."
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ── EDITORIAL GRID — 60/40 ── */}
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-14 items-start">

            {/* ── Photo column — 60% ── */}
            <FadeIn className="lg:col-span-3">
              <div
                style={{
                  position: "relative",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
                data-testid="card-founder-photo"
              >
                <img
                  src="/founders-forbes.png"
                  alt="Fundadores ZAIAH — Forbes México 2024"
                  style={{
                    width: "100%",
                    display: "block",
                    filter: "grayscale(75%)",
                    transition: "filter 1s ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(75%)"; }}
                />
                {/* Deep bottom gradient */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 38%, transparent 62%)",
                  pointerEvents: "none",
                }} />
                {/* Forbes caption — inside photo at bottom */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2.25rem 2rem 2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M12 2L14.85 9.15L22.5 9.27L16.5 14.02L18.54 21.5L12 17.77L5.46 21.5L7.5 14.02L1.5 9.27L9.15 9.15L12 2Z" fill="#CAAA57" />
                    </svg>
                    <p style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#CAAA57" }}>
                      Presentados en Forbes México
                    </p>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.72rem", fontWeight: 300, letterSpacing: "0.02em" }}>
                    Forbes Content · Mayo 31, 2024 · Ciudad de México
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ── Content column — 40% ── */}
            <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: "0" }}>

              {/* Section header */}
              <FadeIn delay={80}>
                <div style={{ marginBottom: "3rem" }}>
                  <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#CAAA57", marginBottom: "0.75rem" }}>
                    Liderazgo
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      color: "#00246B",
                    }}
                  >
                    Fundadores
                  </h3>
                </div>
              </FadeIn>

              {/* Founder profiles */}
              {founders.map((f, i) => (
                <FadeIn key={i} delay={160 + i * 100}>
                  <div
                    data-testid={`card-founder-${i + 1}`}
                    style={{
                      paddingBottom: "2.5rem",
                      marginBottom: i < founders.length - 1 ? "2.5rem" : "0",
                      borderBottom: i < founders.length - 1 ? "1px solid rgba(0,36,107,0.1)" : "none",
                    }}
                  >
                    <div style={{ height: "1px", backgroundColor: "#CAAA57", width: "2rem", marginBottom: "1.25rem" }} />
                    <h4 style={{ color: "#00246B", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em", marginBottom: "0.3rem" }}>
                      {f.name}
                    </h4>
                    <p style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#CAAA57", marginBottom: "1rem" }}>
                      {f.title}
                    </p>
                    <p style={{ color: "rgba(0,36,107,0.5)", fontSize: "0.875rem", lineHeight: 1.8, fontWeight: 300 }}>
                      {f.bio}
                    </p>
                  </div>
                </FadeIn>
              ))}

              {/* Premium KPI cards */}
              <FadeIn delay={380}>
                <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0" }}>
                  {[
                    { value: "15+",      label: "Proyectos regenerados en CDMX" },
                    { value: "160 MDP+", label: "En activos bajo gestión" },
                    { value: "50+",      label: "Familias en el ecosistema ZAIAH" },
                  ].map((kpi, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.25rem",
                        padding: "1.1rem 0",
                        borderTop: "1px solid rgba(0,36,107,0.08)",
                        borderBottom: i === 2 ? "1px solid rgba(0,36,107,0.08)" : "none",
                      }}
                    >
                      <span style={{
                        color: "#00246B",
                        fontWeight: 800,
                        fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                        lineHeight: 1,
                        minWidth: "5.5rem",
                        letterSpacing: "-0.02em",
                      }}>
                        {kpi.value}
                      </span>
                      <span style={{ color: "rgba(0,36,107,0.4)", fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.4 }}>
                        {kpi.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>

          {/* ── Emotional closing + CTA ── */}
          <FadeIn delay={100}>
            <div style={{
              marginTop: "6rem",
              paddingTop: "4rem",
              borderTop: "1px solid rgba(0,36,107,0.1)",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
              alignItems: "center",
            }} className="lg:grid-cols-2 lg:gap-20">
              <blockquote
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                  lineHeight: 1.6,
                  color: "#00246B",
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                "No se trata únicamente de remodelar edificios.<br />
                Se trata de participar en la transformación estructurada de una ciudad."
              </blockquote>
              <div>
                <Link href="/modelo" data-testid="link-founders-modelo">
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      color: "#00246B",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderBottom: "1px solid rgba(0,36,107,0.25)",
                      paddingBottom: "0.3rem",
                      transition: "color 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "#CAAA57";
                      el.style.borderBottomColor = "#CAAA57";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "#00246B";
                      el.style.borderBottomColor = "rgba(0,36,107,0.25)";
                    }}
                  >
                    Conocer el modelo ZAIAH
                    <span style={{ fontSize: "0.9rem" }}>→</span>
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* TEAM */}
      {/* <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-team"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <FadeIn>
            <div className="mb-20">
              <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                Estructura operativa
              </p>
              <h2 className="text-white font-bold text-4xl tracking-tight">
                El equipo
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {team.map((member, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-[#0a0a0a] p-8 text-center group" data-testid={`card-team-${i + 1}`}>
                  <div className="w-16 h-16 mx-auto mb-5 overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{member.name}</p>
                  <p className="text-[#CAAA57] text-[9px] tracking-[0.2em] uppercase font-bold mb-1">{member.area}</p>
                  <p className="text-white/30 text-xs">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

      {/* NÚMEROS QUE RESPALDAN LA DECISIÓN */}
      <section
        style={{ backgroundColor: "#00246B", paddingTop: "6rem", paddingBottom: "0" }}
        data-testid="section-numeros"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">

          {/* ── Header split layout ── */}
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", marginBottom: "4.5rem" }} className="lg:grid-cols-2 lg:items-end">
              <div>
                <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#CAAA57", marginBottom: "1.25rem" }}>
                  Trayectoria · Ejecución · Respaldo
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#ffffff", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: 0 }}>
                  Números que respaldan<br /><em style={{ fontStyle: "italic", color: "#CAAA57" }}>la decisión.</em>
                </h2>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, borderLeft: "1px solid rgba(202,170,87,0.3)", paddingLeft: "1.75rem" }}>
                  Más de 7 años regenerando la Ciudad de México con resultados medibles y reconocimiento dentro del sector inmobiliario.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── Thin gold divider ── */}
          <FadeIn delay={100}>
            <div style={{ height: "1px", backgroundColor: "rgba(202,170,87,0.2)", marginBottom: "0" }} />
          </FadeIn>

          {/* ── 4 metrics — horizontal strip ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.07)" }} className="md:grid-cols-4">
            {[
              { value: "15+",      title: "Proyectos Concluidos",  sub: "de regeneración urbana en CDMX" },
              { value: "160 MDP+", title: "Portafolio Activo",      sub: "en inversión gestionada" },
              { value: "7+",       title: "Años de Trayectoria",    sub: "regenerando Ciudad de México" },
              { value: "50+",      title: "Familias Beneficiadas",  sub: "dentro del ecosistema ZAIAH" },
            ].map((m, i) => (
              <FadeIn key={i} delay={i * 80}>
                <MetricCard value={m.value} title={m.title} sub={m.sub} index={i} />
              </FadeIn>
            ))}
          </div>

          {/* ── Forbes endorsement — full-width strip ── */}
          <FadeIn delay={380}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
              className="md:grid-cols-2"
            >
              {/* Left */}
              <div
                style={{
                  padding: "2.75rem 0 2.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  borderRight: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
                className="md:pr-14 md:border-r md:border-r-white/7 md:border-b-0"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M12 2L14.85 9.15L22.5 9.27L16.5 14.02L18.54 21.5L12 17.77L5.46 21.5L7.5 14.02L1.5 9.27L9.15 9.15L12 2Z" fill="#CAAA57" />
                  </svg>
                  <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#CAAA57" }}>
                    Presentados en Forbes México
                  </p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.7 }}>
                  Reconocidos por innovar en el sector inmobiliario de Ciudad de México.
                </p>
              </div>

              {/* Right — quote */}
              <div
                style={{ padding: "2.75rem 0" }}
                className="md:pl-14"
              >
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.9, fontStyle: "italic" }}>
                  "A través de la metodología de{" "}
                  <span style={{ color: "#CAAA57", fontWeight: 600, fontStyle: "normal" }}>flipping profesional</span>
                  , ZAIAH regenera espacios para volverlos rentables mientras mejora la calidad urbana del entorno."
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* PILLARS */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-pillars"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                  Identidad
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#00246B",
                  }}
                >
                  El ADN de ZAIAH.
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D5D3CE]">
                {pillars.map((p, i) => (
                  <FadeIn key={i} delay={i * 80}>
                    <div className="bg-white p-10 h-full" data-testid={`card-pillar-${i + 1}`}>
                      <div className="w-6 h-px bg-[#CAAA57] mb-7" />
                      <h3 className="text-[#00246B] font-bold text-lg tracking-tight mb-4 leading-snug">{p.title}</h3>
                      <p className="text-[#00246B]/50 text-sm leading-relaxed">{p.body}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-about-cta"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <FadeIn>
            <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "#CAAA57", marginBottom: "2rem" }}>
                Siguiente paso
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                  lineHeight: 1.25,
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "2.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                ¿Listo para conocer quién está detrás de cada decisión?
              </h2>
              <Link href="/contacto" data-testid="button-about-cta">
                <span
                  className="inline-block cursor-pointer"
                  style={{
                    padding: "1.1rem 3rem",
                    backgroundColor: "#CAAA57",
                    color: "#000000",
                    fontSize: "9.5px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#CAAA57"; }}
                >
                  Agendar conversación
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
