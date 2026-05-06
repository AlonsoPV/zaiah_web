import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
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
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
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
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Nombre Fundador",
    title: "Co-Fundador & Director de Operaciones",
    bio: "Especialista en estructuración financiera, adquisición de activos y desarrollo de modelos escalables de renovación urbana.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
];

const team = [
  { name: "Nombre", area: "Inversiones", role: "Director de Capital", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Nombre", area: "Diseño Urbano", role: "Arquitecto Principal", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80" },
  { name: "Nombre", area: "Legal", role: "Directora Jurídica", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80" },
  { name: "Nombre", area: "Comercialización", role: "Director Comercial", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
];

const pillars = [
  {
    title: "Visionaria pero disciplinada",
    body: "Pensamos en décadas, ejecutamos en trimestres. La visión sin estructura es solo retórica.",
  },
  {
    title: "Estratégica pero humana",
    body: "Cada decisión es calculada. Pero detrás de cada activo hay una comunidad que se transforma.",
  },
  {
    title: "Institucional pero boutique",
    body: "La solidez de una firma establecida. La precisión de un equipo que selecciona con criterio.",
  },
  {
    title: "Silenciosamente dominante",
    body: "No necesitamos hacer ruido. Los ecosistemas que creamos hablan por sí solos.",
  },
];

export default function QuienesSomos() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section
        className="relative pt-44 pb-28 md:pb-40 overflow-hidden"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-about-hero"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(202,170,87,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(202,170,87,0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-6">
              Quiénes Somos
            </p>
            <h1 className="text-white font-bold text-5xl md:text-7xl leading-tight tracking-tight max-w-4xl">
              ZAIAH es una empresa privada de<br />
              <span className="text-[#CAAA57]">transformación urbana.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-institutional"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn>
              <div>
                <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-6">
                  Modelo estructurado
                </p>
                <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-8">
                  Zonas ZH
                </h2>
                <div className="w-12 h-px bg-[#CAAA57] mb-8" />
                <p className="text-[#00246B]/70 text-lg leading-relaxed mb-6">
                  Operamos bajo un modelo estructurado de Zonas ZH para detectar, adquirir y regenerar activos inmobiliarios estratégicos en ciudades emergentes.
                </p>
                <p className="text-[#00246B]/60 text-base leading-relaxed">
                  Cada zona es seleccionada por su potencial jurídico, urbano y financiero. No actuamos por intuición. Actuamos sobre datos, estructuras y modelos con capacidad de replicación.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "ZH-01", label: "Identificación de activos" },
                  { num: "ZH-02", label: "Estructuración jurídica" },
                  { num: "ZH-03", label: "Capital y financiamiento" },
                  { num: "ZH-04", label: "Regeneración y activación" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 border border-[#D5D3CE]">
                    <p className="text-[#CAAA57] text-xs font-bold tracking-[0.2em] mb-2">{item.num}</p>
                    <p className="text-[#00246B] text-sm font-medium leading-snug">{item.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-differentiator"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="space-y-6">
            {[
              { text: "No somos una desarrolladora tradicional.", bold: true, color: "text-white/30" },
              { text: "No somos un fondo inmobiliario convencional.", bold: false, color: "text-white/30" },
              { text: "Somos una arquitectura de regeneración.", bold: true, color: "text-white" },
            ].map((line, i) => (
              <FadeIn key={i} delay={i * 200}>
                <p
                  className={`text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight ${line.bold ? "font-bold" : "font-light"} ${line.color}`}
                >
                  {line.text}
                </p>
              </FadeIn>
            ))}
            <FadeIn delay={600}>
              <div className="pt-8">
                <div className="w-16 h-px bg-[#CAAA57]" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-founders"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-20">
              <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Liderazgo
              </p>
              <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight">
                Fundadores
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {founders.map((f, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="group" data-testid={`card-founder-${i + 1}`}>
                  <div className="relative overflow-hidden mb-8 aspect-[4/3]">
                    <img
                      src={f.img}
                      alt={f.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-[#00246B]/20 group-hover:bg-transparent transition-all duration-700" />
                  </div>
                  <div className="h-px bg-[#CAAA57] w-12 mb-6" />
                  <h3 className="text-[#00246B] font-bold text-xl tracking-tight mb-1">{f.name}</h3>
                  <p className="text-[#CAAA57] text-xs tracking-[0.15em] uppercase font-semibold mb-4">{f.title}</p>
                  <p className="text-[#00246B]/60 text-sm leading-relaxed">{f.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-team"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-20">
              <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Equipo
              </p>
              <h2 className="text-white font-bold text-4xl md:text-5xl tracking-tight">
                Estructura operativa
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-center group" data-testid={`card-team-${i + 1}`}>
                  <div className="w-20 h-20 mx-auto mb-5 overflow-hidden rounded-none">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{member.name}</p>
                  <p className="text-[#CAAA57] text-xs tracking-[0.15em] uppercase mb-1">{member.area}</p>
                  <p className="text-white/40 text-xs">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-pillars"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-20">
              <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Personalidad de marca
              </p>
              <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight">
                El ADN de ZAIAH
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D5D3CE]">
            {pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white p-10 h-full" data-testid={`card-pillar-${i + 1}`}>
                  <div className="w-8 h-px bg-[#CAAA57] mb-8" />
                  <h3 className="text-[#00246B] font-bold text-lg tracking-tight mb-4 leading-snug">{p.title}</h3>
                  <p className="text-[#00246B]/50 text-sm leading-relaxed">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
