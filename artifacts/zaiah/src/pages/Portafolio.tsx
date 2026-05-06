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

const projects = [
  {
    id: "edison-58",
    name: "Edison 58",
    category: "Regeneración habitacional / Flipping",
    description: "Proyecto de remodelación estratégica enfocado en transformar un activo urbano en un producto patrimonial de alto potencial. Un edificio con historia, regenerado para producir valor estructurado.",
    status: "En desarrollo",
    statusDot: "#CAAA57",
    img: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=85",
    location: "Ciudad de México",
    year: "2024",
  },
  {
    id: "zona-zh-salud",
    name: "Zona ZH Salud",
    category: "Ecosistema wellness / Consultorios",
    description: "Concepto orientado a crear infraestructura para profesionales de la salud dentro de zonas urbanas estratégicas. Un modelo de activación económica con impacto comunitario directo.",
    status: "Conceptual",
    statusDot: "#D5D3CE",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=85",
    location: "Ciudad de México",
    year: "2025",
  },
  {
    id: "proxima-zona-zh",
    name: "Próxima Zona ZH",
    category: "Activo estratégico urbano",
    description: "Nuevo nodo urbano en evaluación bajo criterios de ubicación, absorción, viabilidad y escalabilidad. El siguiente punto de regeneración en el mapa ZAIAH.",
    status: "En análisis",
    statusDot: "#606060",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85",
    location: "Por confirmar",
    year: "2025–26",
  },
];

export default function Portafolio() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <main>
      {/* HERO */}
      <section
        className="relative pt-40 pb-28 md:pb-40 overflow-hidden"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-portfolio-hero"
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "luminosity",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.35em] uppercase mb-6">
              Portafolio
            </p>
            <h1 className="text-white font-bold text-[2.6rem] md:text-[3.4rem] leading-[1.08] tracking-tight max-w-2xl mb-7">
              Activos seleccionados. Zonas transformadas.
            </h1>
            <div className="w-10 h-px bg-[#CAAA57] mb-7" />
            <p className="text-white/50 text-base font-light max-w-lg leading-relaxed">
              Cada proyecto responde a un criterio de selección riguroso: ubicación estratégica, viabilidad jurídica, potencial financiero y capacidad de activar una zona urbana completa.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-projects"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="space-y-2">
            {projects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 80}>
                <div
                  className="bg-white grid grid-cols-1 lg:grid-cols-2 group overflow-hidden border border-[#D5D3CE]/60 hover:border-[#D5D3CE] transition-colors"
                  data-testid={`card-project-${project.id}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden aspect-[4/3] lg:aspect-auto min-h-[280px] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={project.img}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.02] group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-[#00246B]/35 group-hover:bg-[#00246B]/10 transition-all duration-700" />
                    {/* Status badge */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: project.statusDot }} />
                      <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">{project.status}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-10 md:p-14 flex flex-col justify-between ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.25em] uppercase">
                          {project.category}
                        </p>
                        <p className="text-[#00246B]/25 text-[10px] tracking-wider">{project.year}</p>
                      </div>
                      <h2 className="text-[#00246B] font-bold text-3xl tracking-tight mb-2">
                        {project.name}
                      </h2>
                      <p className="text-[#00246B]/35 text-xs tracking-[0.15em] uppercase mb-7">
                        {project.location}
                      </p>
                      <div className="w-8 h-px bg-[#CAAA57] mb-7" />
                      <p className="text-[#00246B]/60 text-sm leading-relaxed mb-10">
                        {project.description}
                      </p>
                    </div>
                    <Link href="/contacto" data-testid={`button-project-${project.id}`}>
                      <span className="inline-block px-6 py-3 border border-[#00246B]/30 text-[#00246B] text-[10px] font-bold tracking-[0.18em] uppercase hover:bg-[#00246B] hover:text-white hover:border-[#00246B] transition-all duration-300">
                        Solicitar información
                      </span>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-portfolio-context"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="w-6 h-px bg-[#CAAA57] mt-2" />
              </div>
              <div className="lg:col-span-8">
                <p className="text-white font-light text-2xl md:text-3xl leading-relaxed tracking-tight mb-10">
                  "Cada proyecto responde a modelo, data y ejecución disciplinada. No trabajamos por intuición. Trabajamos sobre activos, zonas y estructuras con potencial medible."
                </p>
                <Link href="/contacto" data-testid="button-portfolio-contact">
                  <span className="inline-block px-7 py-3.5 border border-white/20 text-white/70 text-[11px] font-semibold tracking-[0.18em] uppercase hover:border-[#CAAA57] hover:text-[#CAAA57] transition-all duration-300">
                    Presentar un activo
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
