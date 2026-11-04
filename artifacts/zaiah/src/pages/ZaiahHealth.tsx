import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import hero from "@/assets/images/san-pedro.webp";
import galleryA from "@/assets/images/sanpedro-2.webp";
import galleryB from "@/assets/images/sanpedro-3.webp";
import galleryC from "@/assets/images/zh-nvl01-5.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

const facts: [string, string][] = [
  ["$1.5 MDP", "Inversión desde"],
  ["9% anual", "Rentabilidad estimada"],
  ["10–14 m²", "Superficie desde"],
  ["5 min", "Del WTC"],
];

const highlights = [
  {
    title: "Demanda médica real",
    body: "Consultorios pensados para profesionales de la salud con flujo constante cerca del corredor Patriotismo–WTC.",
  },
  {
    title: "Escrituras a tu nombre",
    body: "Inviertes con documentación notarial clara. El activo queda a tu nombre; la operación la lleva el equipo del proyecto.",
  },
  {
    title: "Renta administrada",
    body: "No gestionas inquilinos ni mantenimiento diario. Recibes la renta de un modelo operado profesionalmente.",
  },
];

const gallery = [
  { src: hero, alt: "Fachada Zaiah Health en San Pedro de los Pinos" },
  { src: galleryA, alt: "Interior regenerado Zaiah Health" },
  { src: galleryB, alt: "Espacio de consultorio Zaiah Health" },
  { src: galleryC, alt: "Nivel de consultorios Zaiah Health" },
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

export default function ZaiahHealth() {
  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c]" data-testid="page-zaiah-health">
      <section className="relative h-svh max-h-dvh min-h-[100svh] overflow-hidden bg-[#0a1628] text-white">
        <motion.img
          src={hero}
          alt="Zaiah Health · San Pedro Patriotismo, CDMX"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.55)_0%,rgba(0,0,0,.15)_40%,rgba(4,31,73,.72)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 pb-10 pt-24 text-center md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a]"
          >
            <span className="h-px w-9 bg-[#c6a65a]" /> Proyecto activo · Preventa{" "}
            <span className="h-px w-9 bg-[#c6a65a]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.22 }}
            className="max-w-4xl text-[clamp(2.1rem,5.2vw,4.2rem)] font-medium leading-[1.05] tracking-[-.03em]"
          >
            Consultorios en venta para inversión en CDMX
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-5 max-w-xl text-sm font-light leading-7 text-white/80 md:text-base"
          >
            Zaiah Health en San Pedro de los Pinos: consultorios a 5 minutos del WTC, con escrituras y renta
            administrada por ZAIAH.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link href="/contacto">
              <span className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#c6a65a] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:bg-white">
                Agenda un recorrido <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/modelo">
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/45 bg-black/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10">
                Cómo funciona el modelo
              </span>
            </Link>
          </motion.div>
          <p className="mt-6 text-[10px] font-medium uppercase tracking-[.2em] text-white/55">
            Escrituras · Proceso notariado · Renta administrada
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f1efe9] py-10 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 md:grid-cols-4 md:px-12 lg:px-16">
          {facts.map(([value, label]) => (
            <div key={label} className="border-l border-[#c6a65a]/50 pl-5">
              <p className="text-2xl font-medium tracking-[-.03em] text-[#041f49] md:text-3xl">{value}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[.22em] text-[#041f49]/45">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Reveal className="max-w-2xl">
            <p className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
              <span className="h-px w-9 bg-[#c6a65a]" /> San Pedro Patriotismo
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.05] tracking-[-.04em] text-[#041f49]">
              Un nodo de salud dentro de una Zona Zaiah.
            </h2>
            <p className="mt-6 text-base font-light leading-7 text-[#1c1c1c]/65">
              Regeneramos el inmueble para el sector médico: unidades compactas, ubicación caminable al WTC y una
              operación pensada para que tu patrimonio trabaje sin que tú administres el día a día.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {highlights.map((item) => (
              <Reveal key={item.title}>
                <div className="border-t border-black/15 pt-6">
                  <h3 className="text-xl tracking-[-.02em] text-[#041f49]">{item.title}</h3>
                  <span className="mt-3 block h-px w-8 bg-[#c6a65a]" />
                  <p className="mt-4 text-sm font-light leading-6 text-black/55">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#041f49] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Reveal>
            <p className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
              <span className="h-px w-9 bg-[#c6a65a]" /> Galería
            </p>
            <h2 className="max-w-xl text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.05] tracking-[-.04em]">
              El activo, en fotos reales.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img, i) => (
              <Reveal key={img.alt} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-12 md:px-12 lg:px-16">
          <Reveal className="md:col-span-6">
            <p className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
              <span className="h-px w-9 bg-[#c6a65a]" /> Siguiente paso
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3.3rem)] leading-[1.05] tracking-[-.04em] text-[#041f49]">
              Agenda un recorrido y revisemos si encaja con tu perfil.
            </h2>
            <p className="mt-5 max-w-md text-sm font-light leading-7 text-black/60 md:text-base">
              Analizamos monto, horizonte y preferencia de renta. Si buscas el detalle de campaña, también puedes
              visitar la landing de San Pedro Patriotismo.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-3 md:col-span-5 md:col-start-8">
            <Link href="/contacto">
              <span className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#c6a65a] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:bg-[#041f49] hover:text-white">
                Agenda una cita <ArrowRight size={15} />
              </span>
            </Link>
            <Link href="/portafolio">
              <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#041f49]/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#041f49] transition-colors hover:border-[#041f49]">
                <MapPin size={14} /> Ver portafolio
              </span>
            </Link>
            <a
              href="https://sanpedropatriotismo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-[11px] font-medium uppercase tracking-[.16em] text-[#041f49]/45 underline-offset-4 hover:text-[#041f49] hover:underline"
            >
              Landing de campaña San Pedro Patriotismo
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
