import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

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

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #000000 0%, #00246B 60%, #001a50 100%)" }}
        data-testid="section-hero"
      >
        {/* Background grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(202,170,87,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(202,170,87,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Architectural image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "luminosity",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div
            className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <p className="text-[#CAAA57] text-xs font-semibold tracking-[0.3em] uppercase mb-8">
              Regeneración Urbana Estructurada
            </p>
          </div>
          <div
            className={`transition-all duration-1000 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <h1 className="text-white font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8 max-w-5xl mx-auto">
              Regeneramos activos<br />
              <span className="text-[#CAAA57]">urbanos</span> estratégicos.
            </h1>
          </div>
          <div
            className={`transition-all duration-1000 delay-400 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
              ZAIAH estructura capital, diseño y ejecución para transformar edificios subutilizados en ecosistemas de patrimonio, productividad y regeneración urbana.
            </p>
          </div>
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <Link href="/quienes-somos" data-testid="button-hero-modelo">
              <span className="inline-block px-8 py-4 border border-[#CAAA57] text-[#CAAA57] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#CAAA57] hover:text-black transition-all duration-300">
                Conocer modelo
              </span>
            </Link>
            <Link href="/portafolio" data-testid="button-hero-portafolio">
              <span className="inline-block px-8 py-4 bg-white text-[#00246B] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#CAAA57] hover:text-black transition-all duration-300">
                Ver portafolio
              </span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${heroVisible ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-white/30 text-xs tracking-[0.25em] uppercase">Scroll</p>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* MANIFESTO */}
      <section
        className="relative py-28 md:py-40 overflow-hidden"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-manifesto"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-16">
              Manifiesto
            </p>
          </FadeIn>
          <div className="space-y-4">
            {[
              { text: "No compramos edificios en oferta.", size: "text-3xl md:text-5xl lg:text-6xl", weight: "font-bold", color: "text-white" },
              { text: "Regeneramos zonas.", size: "text-3xl md:text-5xl lg:text-6xl", weight: "font-light", color: "text-white/40" },
              { text: "No vendemos metros.", size: "text-3xl md:text-5xl lg:text-6xl", weight: "font-bold", color: "text-white" },
              { text: "Creamos patrimonio estructurado.", size: "text-3xl md:text-5xl lg:text-6xl", weight: "font-light", color: "text-[#CAAA57]" },
            ].map((line, i) => (
              <FadeIn key={i} delay={i * 150}>
                <p className={`${line.size} ${line.weight} ${line.color} leading-tight tracking-tight`}>
                  {line.text}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* MODEL */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-model"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-20">
              <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Arquitectura de Regeneración
              </p>
              <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight">
                Modelo ZH
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D5D3CE]">
            {[
              {
                num: "01",
                title: "Identificamos activos",
                body: "Edificios subutilizados con potencial jurídico, urbano y financiero. Detectamos oportunidades donde otros ven deterioro.",
              },
              {
                num: "02",
                title: "Estructuramos regeneración",
                body: "Integramos capital, diseño, remodelación y gobernanza privada. Cada proyecto es una arquitectura financiera aplicada a ciudad.",
              },
              {
                num: "03",
                title: "Activamos ecosistemas",
                body: "Convertimos activos en nodos productivos con impacto económico y patrimonial. No renovamos fachadas. Reactivamos economías.",
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div
                  className="bg-white p-10 md:p-12 h-full group hover:bg-[#00246B] transition-all duration-500"
                  data-testid={`card-model-${i + 1}`}
                >
                  <p className="text-[#CAAA57] text-sm font-bold tracking-[0.2em] mb-8 group-hover:text-[#CAAA57]">
                    {card.num}
                  </p>
                  <h3 className="text-[#00246B] font-bold text-xl mb-4 tracking-tight group-hover:text-white transition-colors duration-500">
                    {card.title}
                  </h3>
                  <div className="w-8 h-px bg-[#CAAA57] mb-6" />
                  <p className="text-[#00246B]/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                    {card.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section
        className="py-28 md:py-40 relative overflow-hidden"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-vision"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #CAAA57 0%, transparent 60%)`,
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-10">
              Visión a 20 años
            </p>
            <h2 className="text-white font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-10">
              1,000 activos urbanos estratégicos regenerados.
            </h2>
            <div className="w-16 h-px bg-[#CAAA57] mx-auto mb-10" />
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Liderar la regeneración de activos urbanos estratégicos, redefiniendo el modelo privado de renovación urbana en economías emergentes y posicionando a las grandes ciudades como motores globales de prosperidad.
            </p>
            <Link href="/portafolio" data-testid="button-vision-portafolio">
              <span className="inline-block px-8 py-4 border border-[#CAAA57]/40 text-[#CAAA57] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#CAAA57] hover:text-black hover:border-[#CAAA57] transition-all duration-300">
                Ver portafolio de regeneración
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* UNITS */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-units"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-20">
              <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Arquitectura de Marca
              </p>
              <h2 className="text-[#00246B] font-bold text-4xl md:text-5xl tracking-tight">
                Unidades ZH
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D5D3CE]">
            {[
              {
                tag: "ZAIAH Flipping",
                title: "Zonas ZH",
                body: "Unidad encargada del desarrollo de Zonas ZH, regeneradas y activadas económicamente. Detecta, adquiere y transforma activos urbanos subutilizados en nodos productivos.",
                icon: "ZF",
              },
              {
                tag: "ZAIAH Propiedades",
                title: "Comercialización",
                body: "Unidad encargada de comercializar proyectos de naturaleza flipping. Lleva al mercado activos regenerados con potencial patrimonial de alto impacto.",
                icon: "ZP",
              },
            ].map((unit, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-white p-12 h-full" data-testid={`card-unit-${i + 1}`}>
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-12 h-12 bg-[#00246B] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#CAAA57] text-xs font-bold tracking-wider">{unit.icon}</span>
                    </div>
                    <div>
                      <p className="text-[#CAAA57] text-xs tracking-[0.2em] uppercase font-semibold mb-1">{unit.tag}</p>
                      <h3 className="text-[#00246B] font-bold text-2xl tracking-tight">{unit.title}</h3>
                    </div>
                  </div>
                  <div className="w-full h-px bg-[#D5D3CE] mb-8" />
                  <p className="text-[#00246B]/60 text-sm leading-relaxed">{unit.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#000000" }}
        data-testid="section-cta"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-8">
              Siguiente paso
            </p>
            <h2 className="text-white font-bold text-4xl md:text-6xl leading-tight tracking-tight mb-10">
              Construyamos el siguiente nodo urbano.
            </h2>
            <p className="text-white/40 text-lg font-light mb-12">
              Si buscas explorar inversión, presentar un activo o generar una alianza estratégica, podemos iniciar una conversación.
            </p>
            <Link href="/contacto" data-testid="button-cta-contacto">
              <span className="inline-block px-10 py-5 bg-[#CAAA57] text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-all duration-300">
                Iniciar conversación
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
