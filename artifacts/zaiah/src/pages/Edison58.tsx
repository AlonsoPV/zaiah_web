import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/images/edison-58.webp";
import fachadaExt from "@/assets/images/edison-galeria/fachada-exterior.webp";
import fachada from "@/assets/images/edison-galeria/fachada.webp";
import terraza from "@/assets/images/edison-galeria/terraza.webp";
import terrazaComun from "@/assets/images/edison-galeria/terraza-comun.webp";
import sala from "@/assets/images/edison-galeria/sala-101.webp";
import salaComedor from "@/assets/images/edison-galeria/sala-comedor-102.webp";
import recamara from "@/assets/images/edison-galeria/recamara-103.webp";
import bano from "@/assets/images/edison-galeria/bano-103.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    label: "01 · Reto",
    title: "Un edificio con historia, poco potencial en su estado original",
    body: "En Tabacalera, Edison 58 tenía valor simbólico y ubicación estratégica, pero necesitaba una intervención integral: identidad arquitectónica, unidades habitables y un modelo de operación claro.",
  },
  {
    label: "02 · Intervención",
    title: "Regeneración completa del inmueble",
    body: "Adquirimos el edificio, rediseñamos departamentos y áreas comunes, y activamos un esquema de renta corta con estándar de operación profesional. La galería muestra el resultado de esa transformación.",
  },
  {
    label: "03 · Resultado",
    title: "Proyecto vendido: prueba social del modelo ZAIAH",
    body: "Edison 58 dejó de ser un activo en cartera: se regeneró y se vendió. Hoy es el caso de éxito que respalda cómo ZAIAH convierte edificios en patrimonio operable.",
  },
];

const gallery = [
  { src: fachadaExt, alt: "Fachada exterior Edison 58 regenerada" },
  { src: fachada, alt: "Detalle de fachada Edison 58" },
  { src: terraza, alt: "Terraza Edison 58" },
  { src: terrazaComun, alt: "Terraza común Edison 58" },
  { src: sala, alt: "Sala departamento Edison 58" },
  { src: salaComedor, alt: "Sala-comedor Edison 58" },
  { src: recamara, alt: "Recámara Edison 58" },
  { src: bano, alt: "Baño Edison 58" },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold: 0.12 });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return (
    <div
      ref={r}
      className={`transition-all duration-1000 ${v ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Edison58() {
  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c]" data-testid="page-edison-58">
      <section className="relative h-svh max-h-dvh min-h-[100svh] overflow-hidden bg-[#0a1628] text-white">
        <motion.img
          src={hero}
          alt="Edison 58, Tabacalera · caso de regeneración ZAIAH"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.55)_0%,rgba(0,0,0,.2)_45%,rgba(4,31,73,.75)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 pb-10 pt-24 text-center md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a]"
          >
            <span className="h-px w-9 bg-[#c6a65a]" /> Caso de éxito · Vendido{" "}
            <span className="h-px w-9 bg-[#c6a65a]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.22 }}
            className="max-w-4xl text-[clamp(2.1rem,5vw,4.2rem)] font-medium leading-[1.05] tracking-[-.03em]"
          >
            Edison 58: de edificio histórico a inversión vendida
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-5 max-w-xl text-sm font-light leading-7 text-white/80 md:text-base"
          >
            Cómo ZAIAH adquirió, regeneró y vendió un inmueble en Tabacalera, CDMX — prueba del modelo de regeneración
            con operación profesional.
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-14 px-6 md:px-12 lg:px-16">
          {stages.map((stage) => (
            <Reveal key={stage.label} className="grid gap-6 border-t border-black/10 pt-10 md:grid-cols-12 md:gap-10">
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#c6a65a] md:col-span-3">
                {stage.label}
              </p>
              <div className="md:col-span-8">
                <h2 className="text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.1] tracking-[-.03em] text-[#041f49]">
                  {stage.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base font-light leading-7 text-black/60">{stage.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#041f49] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Reveal>
            <p className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
              <span className="h-px w-9 bg-[#c6a65a]" /> Intervención en imágenes
            </p>
            <h2 className="max-w-2xl text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.05] tracking-[-.04em]">
              Fachada, departamentos y áreas comunes después de la regeneración.
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light leading-7 text-white/55">
              Aún no publicamos el set formal de antes/después; estas fotos documentan el estado entregado del caso.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img) => (
              <Reveal key={img.alt}>
                <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f1efe9] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <Reveal>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">Voz del equipo</p>
            <blockquote className="text-[clamp(1.4rem,2.6vw,2.1rem)] font-light leading-[1.35] tracking-[-.02em] text-[#041f49]">
              “Recibir una renta fija es cómodo: no tener que lidiar con inquilinos ni con meses en que la propiedad no
              está ocupada. Para mí fue lo mejor.”
            </blockquote>
            <p className="mt-6 text-sm font-medium text-[#041f49]/70">Alfonso Mercado · Inversionista ZAIAH</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-12 md:px-12 lg:px-16">
          <Reveal className="md:col-span-7">
            <p className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
              <span className="h-px w-9 bg-[#c6a65a]" /> Hoy puedes invertir
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3.3rem)] leading-[1.05] tracking-[-.04em] text-[#041f49]">
              El proyecto activo es Zaiah Health.
            </h2>
            <p className="mt-5 max-w-lg text-sm font-light leading-7 text-black/60 md:text-base">
              Edison 58 ya se vendió. Si buscas el mismo modelo —escrituras, regeneración y renta administrada—
              conoce los consultorios a 5 minutos del WTC.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-3 md:col-span-4 md:col-start-9">
            <Link href="/zaiah-health">
              <span className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#c6a65a] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:bg-[#041f49] hover:text-white">
                Ver Zaiah Health <ArrowRight size={15} />
              </span>
            </Link>
            <Link href="/contacto">
              <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#041f49]/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#041f49] transition-colors hover:border-[#041f49]">
                Agenda una cita
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
