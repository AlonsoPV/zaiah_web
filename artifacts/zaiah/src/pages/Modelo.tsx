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

const steps = [
  {
    num: "01",
    title: "Identificación de activos",
    subtitle: "Data. Criterio. Precisión.",
    body: "No buscamos por intuición. Analizamos datos urbanos, viabilidad jurídica y potencial financiero para detectar edificios subutilizados con capacidad de transformación real. Cada activo seleccionado pasa por criterios de ubicación estratégica, absorción de mercado y escalabilidad estructural.",
    items: ["Análisis de datos urbanos", "Due diligence jurídico", "Evaluación financiera", "Viabilidad de mercado"],
  },
  {
    num: "02",
    title: "Estructuración de la regeneración",
    subtitle: "Capital. Diseño. Ejecución.",
    body: "Integramos las tres palancas de toda transformación urbana exitosa: capital disciplinado, diseño estratégico y ejecución rigurosa. No delegamos la visión. Coordinamos cada dimensión del proyecto bajo un modelo de gobernanza privada que garantiza coherencia entre la inversión y el resultado.",
    items: ["Estructuración financiera", "Diseño arquitectónico estratégico", "Remodelación y obra", "Gobernanza privada"],
  },
  {
    num: "03",
    title: "Activación del ecosistema",
    subtitle: "Nodo. Impacto. Patrimonio.",
    body: "Un activo regenerado no es solo un edificio renovado. Es un nodo productivo que transforma su entorno, genera empleo, atrae capital y crea patrimonio duradero. ZAIAH diseña cada proyecto para tener impacto económico, urbano y patrimonial escalable.",
    items: ["Activación económica local", "Generación de patrimonio", "Modelo de comercialización", "Impacto urbano medible"],
  },
];

const principles = [
  {
    title: "Modelo, no intuición",
    body: "Cada decisión está respaldada por datos, estructura y criterios replicables. No improvisamos.",
  },
  {
    title: "Zonas, no propiedades",
    body: "Pensamos en zonas urbanas, no en activos aislados. La regeneración tiene impacto sistémico o no tiene impacto.",
  },
  {
    title: "Patrimonio, no especulación",
    body: "Creamos valor estructurado a largo plazo. No perseguimos plusvalías rápidas ni ciclos especulativos.",
  },
  {
    title: "Ejecución, no concepto",
    body: "Las ideas sin ejecución son retórica. En ZAIAH, el resultado es el único argumento que importa.",
  },
];

export default function Modelo() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <main>
      {/* HERO */}
      <section
        className="relative pt-40 pb-28 md:pb-40 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #000000 0%, #00246B 100%)" }}
        data-testid="section-modelo-hero"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#CAAA57 1px, transparent 1px), linear-gradient(90deg, #CAAA57 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.35em] uppercase mb-6">
              Metodología ZH
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
              No es un proceso lineal.
              <br />
              <em style={{ color: "#CAAA57", fontStyle: "italic" }}>Es una arquitectura de regeneración.</em>
            </h1>
            <div className="w-10 h-px bg-[#CAAA57] mb-7" />
            <p className="text-white/50 text-base font-light max-w-xl leading-relaxed">
              Tres fases interconectadas para convertir activos subutilizados en ecosistemas productivos. Un sistema replicable con capacidad de escala y horizonte de 20 años.
            </p>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-modelo-steps"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="space-y-px bg-[#D5D3CE]">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white grid grid-cols-1 lg:grid-cols-12 gap-0" data-testid={`step-${step.num}`}>
                  {/* Number col */}
                  <div className={`lg:col-span-2 bg-[#00246B] p-10 flex flex-col justify-between ${i % 2 === 1 ? "lg:order-3" : ""}`}>
                    <p className="text-[#CAAA57] font-bold text-5xl tracking-tight">{step.num}</p>
                    <div className="w-6 h-px bg-[#CAAA57]/40 mt-auto" />
                  </div>
                  {/* Content col */}
                  <div className={`lg:col-span-6 p-10 md:p-14 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.25em] uppercase mb-4">{step.subtitle}</p>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 600,
                        fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                        color: "#00246B",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {step.title}
                    </h2>
                    <div className="w-8 h-px bg-[#CAAA57] mb-6" />
                    <p className="text-[#00246B]/60 text-sm leading-relaxed">{step.body}</p>
                  </div>
                  {/* Items col */}
                  <div className={`lg:col-span-4 p-10 border-l border-[#EFEEED] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="text-[#00246B]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                      Componentes clave
                    </p>
                    <ul className="space-y-4">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-1 h-1 rounded-full bg-[#CAAA57] mt-2 flex-shrink-0" />
                          <span className="text-[#00246B]/70 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-modelo-principles"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <FadeIn>
            <div className="mb-20">
              <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                Principios operativos
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                }}
              >
                Cuatro principios.<br />
                <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>Sin excepción.</em>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {principles.map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-[#0a0a0a] p-10 h-full" data-testid={`card-principle-${i + 1}`}>
                  <div className="w-6 h-px bg-[#CAAA57] mb-8" />
                  <h3 className="text-white font-bold text-lg tracking-tight mb-4 leading-snug">{p.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ARQUETIPO */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-modelo-arquetipo"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                  Arquetipo
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#ffffff",
                    marginBottom: "2rem",
                  }}
                >
                  El perfil del inversionista ZAIAH.
                </h2>
                <div className="w-10 h-px bg-[#CAAA57] mb-8" />
                <div className="space-y-4 text-white/55 text-sm leading-relaxed">
                  <p>Busca ingresos sostenibles, no dependientes únicamente de su tiempo.</p>
                  <p>Quiere patrimonio heredable, no especulación de corto plazo.</p>
                  <p>Valora la estructura, el rigor institucional y la visión de largo plazo.</p>
                  <p>Entiende que el capital bien estructurado genera legado.</p>
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-5">
              <FadeIn delay={150}>
                <div className="space-y-3">
                  {[
                    "Visionaria pero disciplinada",
                    "Estratégica pero humana",
                    "Institucional pero boutique",
                    "Silenciosamente dominante",
                  ].map((label, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-white/10">
                      <div className="w-1.5 h-1.5 bg-[#CAAA57] flex-shrink-0" />
                      <p className="text-white font-medium text-sm tracking-wide">{label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-modelo-cta"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                  Portafolio activo
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#00246B",
                    marginBottom: "1.5rem",
                  }}
                >
                  El modelo en acción.
                </h2>
                <p className="text-[#00246B]/55 text-base leading-relaxed mb-8">
                  Cada proyecto en el portafolio ZAIAH es evidencia de ejecución. No concepto. No promesa. Resultado medible.
                </p>
                <Link href="/portafolio" data-testid="button-modelo-portafolio">
                  <span className="inline-block px-8 py-4 bg-[#00246B] text-white text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#CAAA57] hover:text-black transition-all duration-300">
                    Ver portafolio
                  </span>
                </Link>
              </div>
              <div className="border border-[#D5D3CE] p-8">
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Métricas del modelo</p>
                {[
                  { label: "Tiempo promedio de identificación", value: "30-60 días" },
                  { label: "Criterios de selección por activo", value: "8 variables" },
                  { label: "Fases de estructuración", value: "4 etapas ZH" },
                  { label: "Visión de portafolio", value: "1,000 activos" },
                ].map((m, i) => (
                  <div key={i} className={`flex items-center justify-between py-4 ${i < 3 ? "border-b border-[#D5D3CE]" : ""}`}>
                    <span className="text-[#00246B]/55 text-sm">{m.label}</span>
                    <span className="text-[#00246B] text-sm font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA FINAL — dark */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-modelo-cta-final"
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
                ¿Listo para participar en el modelo?
              </h2>
              <a href="https://wa.me/525500000000" target="_blank" rel="noopener noreferrer" data-testid="button-modelo-cta-final">
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
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
