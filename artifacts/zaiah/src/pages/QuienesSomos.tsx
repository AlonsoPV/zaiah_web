import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import cityImage from "@/assets/images/project-2.png";

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: .12 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return <div ref={ref} className={`transition-all duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}>{children}</div>;
}

const character = [
  ["Visionaria, pero disciplinada", "Pensamos en décadas. Ejecutamos en ciclos medibles."],
  ["Estratégica, pero humana", "Analizamos el riesgo sin olvidar a las personas que habitan la ciudad."],
  ["Institucional, pero boutique", "Procesos sólidos, decisiones ágiles y atención cercana."],
  ["Silenciosamente dominante", "Menos promesas. Más consistencia, estructura y resultados."],
];

export default function QuienesSomos() {
  return <main className="bg-[#faf9f7] text-[#1c1c1c]">
    <section className="relative min-h-[92vh] overflow-hidden bg-[#0a1628] text-white">
      <motion.img
        src={cityImage}
        alt="Ciudad regenerada por ZAIAH"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: EASE }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.5)_0%,rgba(0,0,0,.15)_40%,rgba(0,0,0,.5)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a]"
        >
          <span className="h-px w-9 bg-[#c6a65a]" /> Quiénes somos <span className="h-px w-9 bg-[#c6a65a]" />
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.22 }}
          style={{ fontFamily: "var(--app-font-serif)" }}
          className="text-[clamp(2.9rem,6.5vw,5.8rem)] font-normal leading-[1.05] tracking-[-.02em] text-white"
        >
          No compramos edificios. <em className="italic">Reestructuramos sistemas urbanos.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
          className="mt-7 max-w-xl text-sm font-light leading-7 text-white/75 md:text-base"
        >
          ZAIAH es una empresa privada de regeneración urbana. Integramos territorio, capital, diseño y operación para crear patrimonio con permanencia.
        </motion.p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:items-end md:gap-8 md:px-12 lg:px-16">
        <Reveal className="md:col-span-5">
          <p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
            <span className="h-px w-9 bg-[#c6a65a]" /> Nuestro propósito
          </p>
          <h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-.04em] text-[#041f49]">
            Devolver a las personas el poder de regenerar sus ciudades.
          </h2>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7">
          <p className="max-w-xl text-base font-light leading-7 text-black/60 md:text-lg md:leading-8">
            Convertimos deterioro urbano en ecosistemas sostenibles de prosperidad y patrimonio. No renovamos fachadas para vender una imagen. Creamos nodos capaces de activar su entorno.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="grid bg-[#d9d6cf] md:grid-cols-2"><div className="relative min-h-[380px]"><img src={cityImage} alt="Ecosistema urbano regenerado" className="absolute inset-0 h-full w-full object-cover grayscale" /></div><div className="flex items-center px-7 py-14 md:px-14 md:py-16 lg:px-20"><Reveal><p className="mb-5 text-[10px] font-bold uppercase tracking-[.3em] text-[#041f49]/55">El estratega regenerador</p><h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1] tracking-[-.04em] text-[#041f49]">La ciudad es el sistema. Cada edificio, un nodo.</h2><p className="mt-6 text-base font-light leading-7 text-black/60">Por eso concentramos nuestra operación dentro de radios caminables. Un activo aislado puede cambiar de apariencia. Una red de activos coordinados puede cambiar el destino de una colonia.</p></Reveal></div></section>

    <section className="bg-[#041f49] py-16 text-white md:py-24"><div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16"><Reveal><p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]"><span className="h-px w-9 bg-[#c6a65a]" /> Cómo pensamos y actuamos</p><h2 className="max-w-4xl text-[clamp(2.2rem,4vw,4rem)] leading-[1] tracking-[-.04em]">Autoridad tranquila. Precisión técnica. Sensibilidad urbana.</h2></Reveal><div className="mt-10 grid border-l border-t border-white/15 md:grid-cols-2">{character.map(([title,text],i)=><Reveal key={title} className="group border-b border-r border-white/15 p-7 transition-colors duration-500 hover:bg-white/[.04] md:p-8"><span className="text-[10px] tracking-[.22em] text-[#c6a65a]">0{i+1}</span><h3 className="mt-8 text-2xl">{title}</h3><span className="mt-3 block h-px w-8 bg-[#c6a65a]/60 transition-all duration-500 group-hover:w-16" /><p className="mt-3 text-sm font-light leading-6 text-white/50">{text}</p></Reveal>)}</div></div></section>

    <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16"><Reveal className="grid gap-10 md:grid-cols-12"><div className="md:col-span-7"><p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]"><span className="h-px w-9 bg-[#c6a65a]" /> Visión a 20 años</p><h2 className="text-[clamp(3rem,6.5vw,6.5rem)] leading-[.9] tracking-[-.06em] text-[#041f49]">1,000 activos urbanos regenerados.</h2></div><div className="self-end md:col-span-4 md:col-start-9"><p className="text-base font-light leading-7 text-black/60">Una escala capaz de redefinir el modelo privado de renovación urbana en economías emergentes.</p><Link href="/modelo"><span className="mt-6 inline-flex cursor-pointer items-center gap-3 border-b border-[#041f49] pb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#041f49]">Conocer el modelo <ArrowRight size={14}/></span></Link></div></Reveal></div></section>

    <section className="relative overflow-hidden bg-[#041f49] text-white">
      <div className="absolute inset-y-0 right-0 hidden w-2/5 md:block">
        <img src={cityImage} alt="" aria-hidden className="h-full w-full object-cover opacity-30 grayscale" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#041f49_0%,rgba(4,31,73,.4)_100%)]" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-12 md:px-12 md:py-16 lg:px-16">
        <Reveal className="md:col-span-7">
          <p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
            <span className="h-px w-9 bg-[#c6a65a]" /> Conoce si ZAIAH es para ti
          </p>
          <h2 className="max-w-2xl text-[clamp(2.1rem,3.8vw,3.6rem)] leading-[1.05] tracking-[-.04em]">
            Las ciudades cambian cuando alguien decide intervenir con estructura.
          </h2>
        </Reveal>
        <Reveal className="md:col-span-4 md:col-start-9 md:justify-self-end">
          <p className="mb-6 max-w-xs text-sm font-light leading-6 text-white/55">
            Una conversación para revisar si tu perfil y horizonte encajan con el modelo.
          </p>
          <Link href="/contacto">
            <span className="group inline-flex cursor-pointer items-center gap-4 border border-[#c6a65a] px-7 py-4 text-[10px] font-bold uppercase tracking-[.2em] text-[#c6a65a] transition-colors hover:bg-[#c6a65a] hover:text-[#041f49]">
              Agendar una cita <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  </main>;
}
