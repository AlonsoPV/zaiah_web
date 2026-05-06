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
    bio: "Estratega con trayectoria en regeneración urbana, capital privado y gobernanza de activos inmobiliarios estratégicos en economías emergentes.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80",
  },
  {
    name: "Nombre Fundador",
    title: "Co-Fundador & Director de Operaciones",
    bio: "Especialista en estructuración financiera, adquisición de activos y desarrollo de modelos escalables de renovación urbana.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
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
        padding: "2.75rem 2.5rem",
        backgroundColor: hovered ? "rgba(202,170,87,0.06)" : "rgba(0,0,0,0.18)",
        borderTop: hovered ? "2px solid rgba(202,170,87,0.5)" : "2px solid transparent",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.2)" : "none",
        transition: "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        cursor: "default",
      }}
    >
      <p style={{ color: "#CAAA57", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
        {value}
      </p>
      <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.01em", marginBottom: "0.375rem" }}>
        {title}
      </p>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", fontWeight: 300, letterSpacing: "0.02em" }}>
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
            <h1 className="text-white font-bold text-[2.6rem] md:text-[3.4rem] leading-[1.08] tracking-tight max-w-2xl mb-7">
              Una empresa privada de transformación urbana.
            </h1>
            <div className="w-10 h-px bg-[#CAAA57] mb-7" />
            <p className="text-white/50 text-base font-light max-w-lg leading-relaxed">
              Operamos bajo un modelo estructurado de Zonas ZH para detectar, adquirir y regenerar activos inmobiliarios estratégicos en ciudades emergentes.
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
                  { text: "No somos una desarrolladora tradicional.", dim: true },
                  { text: "No somos un fondo inmobiliario convencional.", dim: true },
                  { text: "Somos una arquitectura de regeneración.", highlight: true },
                ].map((line, i) => (
                  <FadeIn key={i} delay={i * 120}>
                    <p
                      className={`font-bold text-3xl md:text-4xl tracking-tight leading-tight ${
                        line.highlight ? "text-[#00246B]" : "text-[#00246B]/20"
                      }`}
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
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-founders"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <FadeIn>
            <div className="mb-20">
              <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                Liderazgo
              </p>
              <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight">
                Fundadores
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
            {founders.map((f, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="group" data-testid={`card-founder-${i + 1}`}>
                  <div className="relative overflow-hidden mb-8 aspect-[3/2]">
                    <img
                      src={f.img}
                      alt={f.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-[#00246B]/15 group-hover:bg-transparent transition-all duration-700" />
                  </div>
                  <div className="h-px bg-[#CAAA57] w-8 mb-5" />
                  <h3 className="text-[#00246B] font-bold text-xl tracking-tight mb-1">{f.name}</h3>
                  <p className="text-[#CAAA57] text-[10px] tracking-[0.2em] uppercase font-bold mb-4">{f.title}</p>
                  <p className="text-[#00246B]/55 text-sm leading-relaxed">{f.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section
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
      </section>

      {/* NÚMEROS QUE RESPALDAN LA DECISIÓN */}
      <section
        className="py-32 md:py-48"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-numeros"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">

          {/* Header */}
          <FadeIn>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#CAAA57", marginBottom: "1.5rem" }}>
              Trayectoria · Ejecución · Respaldo
            </p>
            <h2 style={{ color: "#ffffff", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: "1.25rem", maxWidth: "36rem" }}>
              Números que respaldan la decisión.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.75, maxWidth: "42rem", marginBottom: "4rem" }}>
              Más de 7 años regenerando la Ciudad de México con resultados medibles y reconocimiento dentro del sector inmobiliario.
            </p>
          </FadeIn>

          {/* Metric cards 2×2 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1px",
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.07)",
              marginBottom: "1px",
            }}
          >
            {[
              { value: "15+", title: "Proyectos Concluidos", sub: "de regeneración urbana en CDMX" },
              { value: "160 MDP+", title: "Portafolio Activo", sub: "en inversión gestionada" },
              { value: "7+", title: "Años de Trayectoria", sub: "regenerando Ciudad de México" },
              { value: "50+", title: "Familias Beneficiadas", sub: "dentro del ecosistema ZAIAH" },
            ].map((m, i) => (
              <FadeIn key={i} delay={i * 90}>
                <MetricCard value={m.value} title={m.title} sub={m.sub} index={i} />
              </FadeIn>
            ))}
          </div>

          {/* Forbes endorsement block */}
          <FadeIn delay={360}>
            <div
              style={{
                marginTop: "1px",
                border: "1px solid rgba(255,255,255,0.07)",
                backgroundColor: "rgba(0,0,0,0.2)",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 0,
              }}
              className="md:grid-cols-2"
            >
              {/* Left — Forbes badge */}
              <div
                style={{
                  padding: "2.5rem 2.5rem",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  justifyContent: "center",
                }}
                className="md:border-b-0 md:border-r"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {/* Star SVG */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M12 2L14.85 9.15L22.5 9.27L16.5 14.02L18.54 21.5L12 17.77L5.46 21.5L7.5 14.02L1.5 9.27L9.15 9.15L12 2Z" fill="#CAAA57" />
                  </svg>
                  <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#CAAA57" }}>
                    Presentados en Forbes México
                  </p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.65, maxWidth: "22rem" }}>
                  Reconocidos por innovar en el sector inmobiliario.
                </p>
              </div>

              {/* Right — quote */}
              <div
                style={{
                  padding: "2.5rem 2.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
                  "A través de la metodología de{" "}
                  <span style={{ color: "#CAAA57", fontWeight: 600 }}>flipping profesional</span>
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
                <h2 className="text-[#00246B] font-bold text-4xl tracking-tight leading-tight">
                  El ADN de ZAIAH
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
    </main>
  );
}
