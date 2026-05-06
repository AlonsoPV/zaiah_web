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
            <h1 className="text-white font-bold text-[2.6rem] md:text-[3.4rem] leading-[1.08] tracking-tight max-w-3xl mb-7">
              Un sistema replicable de regeneración urbana.
            </h1>
            <div className="w-10 h-px bg-[#CAAA57] mb-7" />
            <p className="text-white/50 text-base font-light max-w-xl leading-relaxed">
              El Modelo ZH no es un proceso lineal. Es una arquitectura: tres fases interconectadas que convierten activos subutilizados en ecosistemas productivos con impacto duradero.
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
                    <h2 className="text-[#00246B] font-bold text-3xl tracking-tight mb-6">{step.title}</h2>
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
              <h2 className="text-white font-bold text-4xl tracking-tight">
                Cómo pensamos, cómo ejecutamos.
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
                <h2 className="text-white font-bold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-8">
                  El Estratega Regenerador.
                </h2>
                <div className="w-10 h-px bg-[#CAAA57] mb-8" />
                <div className="space-y-4 text-white/55 text-sm leading-relaxed">
                  <p>ZAIAH no solo construye. Reestructura sistemas urbanos.</p>
                  <p>No solo desarrolla. Orquesta capital, diseño y gobernanza privada.</p>
                  <p>No solo compra activos. Crea ecosistemas replicables.</p>
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
                <h2 className="text-[#00246B] font-bold text-4xl tracking-tight mb-6">
                  El modelo en acción.
                </h2>
                <p className="text-[#00246B]/55 text-base leading-relaxed mb-8">
                  Conoce los proyectos actuales de ZAIAH y cómo el Modelo ZH se traduce en activos reales con impacto medible.
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
    </main>
  );
}
