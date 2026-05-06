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
      className={`transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const PROJECTS = [
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

function ProjectCard({ project, delay = 0 }: { project: typeof PROJECTS[0]; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="flex flex-col overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(32px)",
        transition: `opacity 0.9s ease, transform 0.9s ease, box-shadow 0.35s ease, border-color 0.35s ease`,
        transitionDelay: `${delay}ms`,
        border: hovered ? "1px solid rgba(202,170,87,0.6)" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: hovered ? "0 12px 48px rgba(0,0,0,0.14)" : "0 2px 16px rgba(0,0,0,0.06)",
        backgroundColor: "#ffffff",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`card-project-${project.id}`}
    >
      {/* Card Header — dark institutional */}
      <div
        style={{ backgroundColor: "#00246B", position: "relative", overflow: "hidden" }}
      >
        {/* Background image with overlay */}
        <img
          src={project.img}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.18,
            filter: "grayscale(100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,36,107,0.7) 0%, rgba(0,36,107,0.95) 100%)",
          }}
        />

        {/* Header content */}
        <div style={{ position: "relative", zIndex: 1, padding: "2rem 2rem 1.75rem" }}>
          {/* Top row: category + status badge */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#CAAA57" }}>
              {project.category}
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.3rem 0.75rem",
                border: `1px solid ${project.statusColor}`,
                borderRadius: "2px",
                flexShrink: 0,
              }}
            >
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: project.statusColor, flexShrink: 0 }} />
              <span style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: project.statusColor, whiteSpace: "nowrap" }}>
                {project.status}
              </span>
            </span>
          </div>

          {/* Project name */}
          <h2 style={{ color: "#ffffff", fontWeight: 800, fontSize: "clamp(1.5rem, 2.8vw, 2rem)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.625rem" }}>
            {project.name}
          </h2>

          {/* Location */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "rgba(202,170,87,0.6)", fontSize: "11px" }}>◎</span>
            <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              {project.location}
            </p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: "1.75rem 2rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem", flex: 1 }}>

        {/* Description */}
        <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(0,36,107,0.6)", fontWeight: 400 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                display: "inline-block",
                padding: "0.3rem 0.75rem",
                backgroundColor: "rgba(0,36,107,0.06)",
                border: "1px solid rgba(0,36,107,0.12)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#00246B",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(0,36,107,0.08)" }} />

        {/* Metrics 2×2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "rgba(0,36,107,0.08)", border: "1px solid rgba(0,36,107,0.08)" }}>
          {project.metrics.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "1rem 1.1rem",
                backgroundColor: i % 2 === 0 ? "#fafafa" : "#ffffff",
              }}
            >
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
          <Link href="/contacto" data-testid={`button-project-${project.id}`}>
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

export default function Portafolio() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <main style={{ backgroundColor: "#000" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#000000", paddingTop: "160px", paddingBottom: "100px" }}
        data-testid="section-portfolio-hero"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1800&q=75')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #000 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(20px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
              <span style={{ width: "2rem", height: "1px", backgroundColor: "#CAAA57", flexShrink: 0 }} />
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "#CAAA57" }}>
                Portafolio
              </p>
            </div>
            <h1
              style={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                maxWidth: "700px",
                marginBottom: "1.75rem",
              }}
            >
              Portafolio de activos estratégicos
            </h1>
            <div style={{ width: "2.5rem", height: "1px", backgroundColor: "#CAAA57", marginBottom: "1.75rem" }} />
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: "520px",
                marginBottom: "0.75rem",
              }}
            >
              Proyectos seleccionados por ubicación, demanda, estructura financiera y capacidad de activar zonas urbanas con potencial patrimonial.
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.8rem",
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: "480px",
              }}
            >
              Cada activo responde a un modelo claro: ubicación estratégica, viabilidad comercial, ejecución disciplinada y potencial de generación de valor.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ──────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#EFEEED", paddingTop: "5rem", paddingBottom: "6rem" }}
        data-testid="section-projects"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEXT QUOTE ──────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#000000", paddingTop: "5rem", paddingBottom: "5rem" }}
        data-testid="section-portfolio-context"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="lg:grid-cols-12">
              <div className="lg:col-span-1 hidden lg:block">
                <div style={{ width: "1px", height: "2.5rem", backgroundColor: "rgba(202,170,87,0.35)" }} />
              </div>
              <div className="lg:col-span-9">
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 300,
                    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    lineHeight: 1.65,
                    letterSpacing: "-0.01em",
                    marginBottom: "2rem",
                    fontStyle: "italic",
                  }}
                >
                  "Cada proyecto responde a modelo, data y ejecución disciplinada. No trabajamos por intuición. Trabajamos sobre activos, zonas y estructuras con potencial medible."
                </p>
                <Link href="/contacto" data-testid="button-portfolio-contact">
                  <span
                    className="inline-flex items-center gap-3 cursor-pointer"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "9.5px",
                      fontWeight: 600,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "0.85rem 1.75rem",
                      transition: "color 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "#CAAA57";
                      el.style.borderColor = "rgba(202,170,87,0.5)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "rgba(255,255,255,0.5)";
                      el.style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                  >
                    Presentar un activo
                    <span style={{ color: "#CAAA57" }}>→</span>
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
