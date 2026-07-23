import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import modelImage from "@/assets/images/project-3.png";

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({children,className=""}:{children:React.ReactNode;className?:string}){const r=useRef<HTMLDivElement>(null);const[v,s]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>e.isIntersecting&&s(true),{threshold:.1});if(r.current)o.observe(r.current);return()=>o.disconnect()},[]);return <div ref={r} className={`transition-all duration-1000 ${v?"translate-y-0 opacity-100":"translate-y-6 opacity-0"} ${className}`}>{children}</div>}

const steps=[
  ["01","Encontramos","Buscamos edificios que todavía tienen mucho por dar, dentro de colonias conectadas y con demanda real."],
  ["02","Revisamos","Antes de avanzar estudiamos el edificio, su situación jurídica, los números y su verdadero potencial."],
  ["03","Adquirimos","Compramos el edificio completo de manera progresiva. Así podemos hacernos cargo de la transformación de principio a fin."],
  ["04","Regeneramos","Reunimos arquitectura, inversión y ejecución para devolverle vida, identidad y utilidad al edificio."],
  ["05","Acompañamos","Comercializamos y administramos profesionalmente para que el patrimonio se mantenga bien cuidado en el tiempo."],
];

export default function Modelo(){return <main className="bg-[#faf9f7] text-[#1c1c1c]">
  <section className="relative min-h-[92vh] overflow-hidden bg-[#0a1628] text-white">
    <motion.img
      src={modelImage}
      alt="Edificio en proceso de regeneración"
      className="absolute inset-0 h-full w-full object-cover"
      initial={{ scale: 1.08 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2, ease: EASE }}
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.5)_0%,rgba(0,0,0,.12)_42%,rgba(4,31,73,.6)_100%)]" />

    <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:px-12">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a]"
      >
        <span className="h-px w-9 bg-[#c6a65a]" /> El modelo ZAIAH <span className="h-px w-9 bg-[#c6a65a]" />
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.22 }}
        style={{ fontFamily: "var(--app-font-serif)" }}
        className="max-w-5xl text-[clamp(2.9rem,6.5vw,5.8rem)] font-normal leading-[1.05] tracking-[-.02em]"
      >
        Construimos Zonas Z mediante la compra progresiva <em className="italic">de edificios completos.</em>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
        className="mt-7 max-w-xl text-sm font-light leading-7 text-white/75 md:text-base"
      >
        No vendemos metros. Creamos patrimonio estructurado dentro de nodos urbanos capaces de transformar su zona.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
        className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link href="/contacto"><span className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#c6a65a] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:bg-white">Revisar si es para mí <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span></Link>
        <Link href="/portafolio"><span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/45 bg-black/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"><MapPin size={14} /> Ver proyectos</span></Link>
      </motion.div>
    </div>
  </section>

  <section className="py-12 md:py-16">
    <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
      <div className="grid gap-8 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-6">
          <p className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
            <span className="h-px w-9 bg-[#c6a65a]" /> Lo que cambia para ti
          </p>
          <h2 className="max-w-xl text-[clamp(2rem,3.4vw,3.3rem)] leading-[1.05] tracking-[-.04em] text-[#041f49]">
            Tu inversión no queda sola. Se convierte en un nodo dentro de una estrategia para regenerar y fortalecer toda la zona.
          </h2>
        </Reveal>
        <Reveal className="border-t border-black/15 pt-6 md:col-span-5 md:col-start-8 md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:pl-12">
          <p className="max-w-sm text-sm font-light leading-7 text-black/55 md:text-base">
            Este es el recorrido que seguimos, desde la primera visita hasta la operación diaria.
          </p>
        </Reveal>
      </div>
      <div className="mt-10 grid border-l border-t border-black/15 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(([n, t, x]) => (
          <Reveal
            key={n}
            className="group relative overflow-hidden border-b border-r border-black/15 p-5 transition-colors duration-500 hover:bg-[#041f49] md:min-h-[220px] md:p-6"
          >
            <span className="text-[10px] font-bold tracking-[.25em] text-[#c6a65a]">{n}</span>
            <div className="mt-10">
              <h3 className="text-lg tracking-[-.02em] text-[#041f49] transition-colors duration-500 group-hover:text-white md:text-xl">{t}</h3>
              <span className="mt-3 block h-px w-8 bg-[#c6a65a] transition-all duration-500 group-hover:w-14" />
              <p className="mt-3 text-sm font-light leading-6 text-black/55 transition-colors duration-500 group-hover:text-white/60">{x}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>

  <section className="grid bg-[#d9d6cf] md:grid-cols-2"><div className="flex items-center px-7 py-14 md:px-14 md:py-16 lg:px-20"><Reveal><p className="mb-5 text-[10px] font-bold uppercase tracking-[.3em] text-[#041f49]/55">Qué es una Zona Z</p><h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1] tracking-[-.04em] text-[#041f49]">No es un proyecto. Es un ecosistema territorial de transformación urbana.</h2><p className="mt-6 text-base font-light leading-7 text-black/60">Cada edificio regenerado es un nodo dentro de esa zona. Al concentrarlos en un radio caminable, mejora la experiencia de la calle, se hace más eficiente la operación y se fortalece el valor del conjunto.</p></Reveal></div><div className="relative min-h-[380px]"><img src={modelImage} alt="Representación de una Zona Z" className="absolute inset-0 h-full w-full object-cover grayscale"/></div></section>

  <section className="bg-[#041f49] py-16 text-white md:py-20">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:px-12 lg:px-16">
        <Reveal className="md:col-span-5 md:self-center">
          <p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
            <span className="h-px w-9 bg-[#c6a65a]" /> Criterios de decisión
          </p>
          <h2 className="text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] tracking-[-.04em]">Cada decisión tiene una razón.</h2>
          <p className="mt-6 max-w-sm text-sm font-light leading-6 text-white/55 md:text-base md:leading-7">
            Antes de integrar un edificio a una Zona Z, necesitamos responder con claridad cuatro preguntas.
          </p>
        </Reveal>
      <div className="grid border-l border-t border-white/15 sm:grid-cols-2 md:col-span-7">
        {[["Territorio","Centralidad y conectividad."],["Mercado","Demanda y absorción comprobables."],["Activo","Control jurídico y potencial integral."],["Operación","Administración profesional y permanencia."]].map(([t,x],i)=>(
          <Reveal key={t} className="group border-b border-r border-white/15 p-6 transition-colors duration-500 hover:bg-white/[.05] md:min-h-[175px]">
            <span className="text-[10px] text-[#c6a65a]">0{i+1}</span>
            <h3 className="mt-7 text-lg md:text-xl">{t}</h3>
            <span className="mt-3 block h-px w-8 bg-[#c6a65a]/60 transition-all duration-500 group-hover:w-16" />
            <p className="mt-3 text-sm font-light leading-6 text-white/50">{x}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>

  <section className="relative overflow-hidden bg-[#e8e5df] py-12 md:py-14">
    <div aria-hidden className="absolute -right-8 -top-20 text-[18rem] font-bold leading-none text-[#041f49]/[.035]">Z</div>
    <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-12 md:px-12 lg:px-16">
      <Reveal className="md:col-span-5">
        <p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
          <span className="h-px w-9 bg-[#c6a65a]" /> Tu lugar dentro del sistema
        </p>
        <h2 className="text-[clamp(2.1rem,3.5vw,3.4rem)] leading-[1.02] tracking-[-.04em] text-[#041f49]">
          Tú eliges el patrimonio. Nosotros hacemos el trabajo complejo.
        </h2>
      </Reveal>
      <Reveal className="md:col-span-3 md:col-start-7">
        <p className="max-w-xs text-sm font-light leading-6 text-black/55">
          Conversemos sobre tus planes y veamos qué proyecto puede acompañarlos mejor.
        </p>
      </Reveal>
      <Reveal className="md:col-span-3 md:col-start-10 md:justify-self-end">
        <Link href="/contacto">
          <span className="group flex h-36 w-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-full bg-[#041f49] text-center text-white transition-transform duration-500 hover:scale-105 md:h-40 md:w-40">
            <span className="px-5 text-[10px] font-bold uppercase leading-4 tracking-[.18em]">Agendar una cita</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Reveal>
    </div>
  </section>
 </main>}
