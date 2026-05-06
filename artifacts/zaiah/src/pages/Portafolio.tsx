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
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
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
    description:
      "Proyecto de remodelación estratégica enfocado en transformar un activo urbano en un producto patrimonial de alto potencial. Un edificio con historia, regenerado para producir valor estructurado.",
    status: "En desarrollo",
    statusColor: "#CAAA57",
    img: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    location: "Ciudad de México",
  },
  {
    id: "zona-zh-salud",
    name: "Zona ZH Salud",
    category: "Ecosistema wellness / Consultorios",
    description:
      "Concepto orientado a crear infraestructura para profesionales de la salud dentro de zonas urbanas estratégicas. Un modelo de activación económica con impacto comunitario directo.",
    status: "Conceptual / Estructuración",
    statusColor: "#D5D3CE",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    location: "Ciudad de México",
  },
  {
    id: "proxima-zona-zh",
    name: "Próxima Zona ZH",
    category: "Activo estratégico urbano",
    description:
      "Nuevo nodo urbano en evaluación bajo criterios de ubicación, absorción, viabilidad y escalabilidad. El siguiente punto de regeneración en el mapa ZAIAH.",
    status: "En análisis",
    statusColor: "#A0A0A0",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    location: "Por confirmar",
  },
];

export default function Portafolio() {
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
        style={{ backgroundColor: "#000000" }}
        data-testid="section-portfolio-hero"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1800&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "luminosity",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-6">
              Portafolio
            </p>
            <h1 className="text-white font-bold text-5xl md:text-7xl leading-tight tracking-tight max-w-4xl mb-8">
              Portafolio de regeneración urbana.
            </h1>
            <div className="w-16 h-px bg-[#CAAA57] mb-8" />
            <p className="text-white/50 text-lg font-light max-w-2xl leading-relaxed">
              Activos seleccionados por ubicación, viabilidad jurídica, potencial financiero y capacidad de activar zonas estratégicas.
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
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-px bg-[#D5D3CE]">
            {projects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 100}>
                <div
                  className="bg-white grid grid-cols-1 lg:grid-cols-2 group"
                  data-testid={`card-project-${project.id}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden aspect-[4/3] lg:aspect-auto ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={project.img}
                      alt={project.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-[#00246B]/40 group-hover:bg-[#00246B]/10 transition-all duration-700" />
                    <div className="absolute top-6 left-6">
                      <span
                        className="text-xs font-bold tracking-[0.15em] uppercase px-3 py-1.5"
                        style={{ backgroundColor: project.statusColor, color: project.statusColor === "#CAAA57" ? "#000" : "#fff" }}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-12 md:p-16 flex flex-col justify-between ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div>
                      <p className="text-[#CAAA57] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                        {project.category}
                      </p>
                      <h2 className="text-[#00246B] font-bold text-4xl tracking-tight mb-2">
                        {project.name}
                      </h2>
                      <p className="text-[#00246B]/40 text-xs tracking-[0.15em] uppercase mb-8">
                        {project.location}
                      </p>
                      <div className="w-12 h-px bg-[#CAAA57] mb-8" />
                      <p className="text-[#00246B]/60 text-base leading-relaxed mb-10">
                        {project.description}
                      </p>
                    </div>
                    <div>
                      <Link href="/contacto" data-testid={`button-project-${project.id}`}>
                        <span className="inline-block px-6 py-3 border border-[#00246B] text-[#00246B] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#00246B] hover:text-white transition-all duration-300">
                          Solicitar información
                        </span>
                      </Link>
                    </div>
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
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-portfolio-context"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <div className="w-16 h-px bg-[#CAAA57] mx-auto mb-12" />
            <p className="text-white font-light text-2xl md:text-3xl leading-relaxed tracking-tight">
              "Cada proyecto responde a modelo, data y ejecución disciplinada. No trabajamos por intuición. Trabajamos sobre activos, zonas y estructuras con potencial medible."
            </p>
            <div className="w-16 h-px bg-[#CAAA57] mx-auto mt-12 mb-16" />
            <Link href="/contacto" data-testid="button-portfolio-contact">
              <span className="inline-block px-8 py-4 border border-white/30 text-white text-xs font-semibold tracking-[0.2em] uppercase hover:border-[#CAAA57] hover:text-[#CAAA57] transition-all duration-300">
                Presentar un activo
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
