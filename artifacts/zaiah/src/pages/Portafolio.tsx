import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import projectOne from "@/assets/images/san-pedro.webp";
import projectTwo from "@/assets/images/edison-58.jpeg";

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({children,className=""}:{children:React.ReactNode;className?:string}){const r=useRef<HTMLDivElement>(null);const[v,s]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>e.isIntersecting&&s(true),{threshold:.1});if(r.current)o.observe(r.current);return()=>o.disconnect()},[]);return <div ref={r} className={`transition-all duration-1000 ${v?"translate-y-0 opacity-100":"translate-y-6 opacity-0"} ${className}`}>{children}</div>}

const projects=[
 {name:"San Pedro Patriotismo",type:"Consultorios médicos",place:"San Pedro de los Pinos · CDMX",status:"Preventa activa",description:"Un activo dirigido al sector médico, con demanda constante, ubicación a cinco minutos del WTC y administración profesional. La operación permanece a cargo de un equipo especializado.",image:projectOne,url:"https://sanpedropatriotismo.com/",facts:[["$1.5 MDP","Inversión desde"],["9% anual","Rentabilidad estimada"],["14 m²","Superficie desde"]]},
 {name:"Edison 58",type:"Departamentos · Renta corta",place:"Tabacalera · CDMX",status:"Disponibilidad actual",description:"Regeneramos un edificio con valor histórico en una zona conectada del centro. El modelo integra identidad arquitectónica, ubicación y operación de renta corta con criterios de mercado.",image:projectTwo,url:"https://edison58tabacalera.com/",facts:[["$4.7 MDP","Inversión desde"],["12%","Cap rate estimado"],["$68 USD","Tarifa promedio"]]},
];

export default function Portafolio(){return <main className="bg-[#faf9f7] text-[#1c1c1c]">
 <section className="relative min-h-[92vh] overflow-hidden bg-[#0a1628] text-white">
   <motion.img
     src={projectOne}
     alt="Portafolio de activos ZAIAH"
     className="absolute inset-0 h-full w-full object-cover"
     initial={{ scale: 1.08 }}
     animate={{ scale: 1 }}
     transition={{ duration: 2, ease: EASE }}
   />
   <div className="absolute inset-0 bg-black/40" />
   <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.5)_0%,rgba(0,0,0,.1)_45%,rgba(4,31,73,.75)_100%)]" />

   <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-end px-6 pb-24 pt-28 text-center md:px-12">
     <motion.p
       initial={{ opacity: 0, y: 16 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
       className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a]"
     >
       <span className="h-px w-9 bg-[#c6a65a]" /> Portafolio ZAIAH <span className="h-px w-9 bg-[#c6a65a]" />
     </motion.p>
     <motion.h1
       initial={{ opacity: 0, y: 28 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 1, ease: EASE, delay: 0.22 }}
       className="text-[clamp(2.9rem,6.5vw,5.8rem)] font-medium leading-[1.05] tracking-[-.02em]"
     >
       Proyectos que nacen de escuchar <em className="font-serif font-normal italic">lo que una zona necesita.</em>
     </motion.h1>
     <motion.p
       initial={{ opacity: 0, y: 18 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
       className="mt-7 max-w-xl text-sm font-light leading-7 text-white/75 md:text-base"
     >
       Cada proyecto responde a criterios urbanos, jurídicos, financieros y operativos. Aquí puedes revisar su estructura y contexto.
     </motion.p>
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
       className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
     >
       <Link href="/contacto"><span className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#c6a65a] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:bg-white">Revisar proyectos <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span></Link>
       <Link href="/modelo"><span className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/45 bg-black/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10">Entender el modelo</span></Link>
     </motion.div>
     <motion.div
       initial={{ opacity: 0, y: 14 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
       className="mt-10 flex items-center gap-10 border-t border-white/25 pt-6"
     >
       <div><p className="text-2xl text-white">02</p><p className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/50">Proyectos activos</p></div>
       <div><p className="text-2xl text-white">CDMX</p><p className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/50">Zona de operación</p></div>
       <div><p className="text-2xl text-white">100%</p><p className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/50">Control del activo</p></div>
     </motion.div>
   </div>
 </section>

 <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16"><div className="space-y-16 md:space-y-20">{projects.map((p,i)=><Reveal key={p.name} className="grid gap-10 md:grid-cols-12 md:items-stretch"><div className={`relative min-h-[480px] overflow-hidden md:col-span-7 ${i%2?"md:col-start-6 md:row-start-1":""}`}><img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.02]"/><div className="absolute inset-0 bg-[#041f49]/10"/><span className="absolute left-6 top-6 bg-[#c6a65a] px-4 py-3 text-[9px] font-bold uppercase tracking-[.2em] text-[#041f49]">{p.status}</span></div><div className={`flex flex-col justify-center py-6 md:col-span-4 ${i%2?"md:col-start-1 md:row-start-1":"md:col-start-9"}`}><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#c6a65a]">{p.type}</p><h2 className="mt-5 text-[clamp(2.5rem,4vw,4.2rem)] leading-[1] tracking-[-.04em] text-[#041f49]">{p.name}</h2><p className="mt-3 text-[10px] uppercase tracking-[.2em] text-black/40">{p.place}</p><p className="mt-8 text-sm font-light leading-7 text-black/60">{p.description}</p><div className="mt-9 border-t border-black/15">{p.facts.map(([v,l])=><div key={l} className="flex items-baseline justify-between border-b border-black/10 py-4"><span className="text-xl text-[#041f49]">{v}</span><span className="text-[9px] uppercase tracking-[.16em] text-black/40">{l}</span></div>)}</div><a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#041f49]">Conocer el proyecto <ExternalLink size={13}/></a></div></Reveal>)}</div></div></section>

 <section className="overflow-hidden bg-[#d9d6cf] py-12 sm:py-14 md:py-16">
   <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:gap-10 md:grid-cols-12 md:items-center md:px-12 lg:px-16">
     <Reveal className="md:col-span-6">
       <p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#041f49]/55">
         <span className="h-px w-9 bg-[#c6a65a]" /> Antes de elegir
       </p>
       <h2 className="max-w-xl text-[clamp(2rem,3.4vw,3.3rem)] leading-[1.03] tracking-[-.04em] text-[#041f49]">
         No compras metros cuadrados. Buscas respaldo patrimonial.
       </h2>
     </Reveal>
     <Reveal className="border-t border-black/15 pt-7 md:col-span-5 md:col-start-8 md:border-l md:border-t-0 md:py-2 md:pl-8 lg:pl-12">
       <p className="max-w-lg text-sm font-light leading-7 text-black/60 sm:text-base">
         También evalúas estructura financiera, operación, propósito y relación con una estrategia urbana mayor. Revisamos contigo qué activo corresponde a tus objetivos patrimoniales.
       </p>
       <Link href="/contacto">
         <span className="group mt-6 inline-flex cursor-pointer items-center gap-3 bg-[#041f49] px-6 py-4 text-[9px] font-bold uppercase tracking-[.16em] text-white transition-colors hover:bg-[#c6a65a] hover:text-[#041f49] sm:px-7 sm:text-[10px] sm:tracking-[.2em]">
           Conversemos sobre tu estrategia <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
         </span>
       </Link>
     </Reveal>
   </div>
 </section>
 </main>}
