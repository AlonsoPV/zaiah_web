import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, MapPin, Maximize2, X } from "lucide-react";
import heroDay from "@/assets/images/hero-day-3.webp";
import projectOne from "@/assets/images/san-pedro.webp";
import projectOneB from "@/assets/images/sanpedro-2.webp";
import projectOneC from "@/assets/images/sanpedro-3.webp";
import projectOneD from "@/assets/images/zh-nvl01-5.webp";
import projectTwo from "@/assets/images/edison-58.jpeg";
import projectTwoB from "@/assets/images/edison-galeria/fachada-exterior.webp";
import projectTwoC from "@/assets/images/edison-galeria/fachada.webp";
import projectTwoD from "@/assets/images/edison-galeria/terraza.webp";
import projectTwoE from "@/assets/images/edison-galeria/terraza-comun.webp";
import projectTwoF from "@/assets/images/edison-galeria/sala-101.webp";
import projectTwoG from "@/assets/images/edison-galeria/sala-comedor-102.webp";
import projectTwoH from "@/assets/images/edison-galeria/recamara-103.webp";
import projectTwoI from "@/assets/images/edison-galeria/recamara-102.webp";
import projectTwoJ from "@/assets/images/edison-galeria/bano-103.webp";
import planta01 from "@/assets/images/zh-plantas/planta-0001.webp";
import planta02 from "@/assets/images/zh-plantas/planta-0002.webp";
import planta03 from "@/assets/images/zh-plantas/planta-0003.webp";
import planta04 from "@/assets/images/zh-plantas/planta-0004.webp";
import planta05 from "@/assets/images/zh-plantas/planta-0005.webp";
import planta06 from "@/assets/images/zh-plantas/planta-0006.webp";
import planta07 from "@/assets/images/zh-plantas/planta-0007.webp";
import planta08 from "@/assets/images/zh-plantas/planta-0008.webp";
import planta09 from "@/assets/images/zh-plantas/planta-0009.webp";
import edisonPlanta01 from "@/assets/images/edison-plantas/planta-0001.webp";
import edisonPlanta02 from "@/assets/images/edison-plantas/planta-0002.webp";
import edisonPlanta03 from "@/assets/images/edison-plantas/planta-0003.webp";
import edisonPlanta04 from "@/assets/images/edison-plantas/planta-0004.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

type FloorPlan = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  src: string;
};

const zhPlans: FloorPlan[] = [
  { id: "pb", label: "PB", title: "Planta Baja", subtitle: "Lobby · Tierra Garat", src: planta01 },
  { id: "n1", label: "N1", title: "Nivel 01", subtitle: "Consultorios", src: planta02 },
  { id: "n2", label: "N2", title: "Nivel 02", subtitle: "Consultorios", src: planta03 },
  { id: "n3", label: "N3", title: "Nivel 03", subtitle: "Consultorios", src: planta04 },
  { id: "n4", label: "N4", title: "Nivel 04", subtitle: "Consultorios", src: planta05 },
  { id: "n5", label: "N5", title: "Nivel 05", subtitle: "Consultorios", src: planta06 },
  { id: "n6", label: "N6", title: "Nivel 06", subtitle: "Consultorios", src: planta07 },
  { id: "n7", label: "N7", title: "Nivel 07", subtitle: "Consultorios", src: planta08 },
  { id: "n8", label: "N8", title: "Nivel 08", subtitle: "Consultorios", src: planta09 },
];

const edisonPlans: FloorPlan[] = [
  { id: "pb", label: "PB", title: "Planta Baja", subtitle: "PB-1 · PB-2 · PB-3", src: edisonPlanta01 },
  { id: "n12", label: "N1–2", title: "Nivel 1 y 2", subtitle: "Deptos 101 · 102 · 103", src: edisonPlanta02 },
  { id: "azotea", label: "Azotea", title: "Planta Azotea", subtitle: "Lofts 01 · 02", src: edisonPlanta03 },
  { id: "areas", label: "Áreas", title: "Cuadro de áreas", subtitle: "Superficies por nivel", src: edisonPlanta04 },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  const [v, s] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && s(true), { threshold: 0.1 });
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

type Project = {
  name: string;
  type: string;
  place: string;
  status: string;
  description: string;
  image: string;
  images?: string[];
  url: string;
  facts: [string, string][];
};

const projects: Project[] = [
  {
    name: "ZAIAH HEALTH",
    type: "Consultorios médicos",
    place: "San Pedro de los Pinos · CDMX",
    status: "Preventa activa",
    description:
      "Un activo dirigido al sector médico, con demanda constante, ubicación a cinco minutos del WTC y administración profesional. La operación permanece a cargo de un equipo especializado.",
    image: projectOne,
    images: [projectOne, projectOneB, projectOneC, projectOneD],
    url: "https://sanpedropatriotismo.com/",
    facts: [
      ["$1.5 MDP", "Inversión desde"],
      ["9% anual", "Rentabilidad estimada"],
      ["10–14 m²", "Superficie desde"],
    ],
  },
  {
    name: "Edison 58",
    type: "Departamentos · Renta corta",
    place: "Tabacalera · CDMX",
    status: "Disponibilidad actual",
    description:
      "Regeneramos un edificio con valor histórico en una zona conectada del centro. El modelo integra identidad arquitectónica, ubicación y operación de renta corta con criterios de mercado.",
    image: projectTwo,
    images: [
      projectTwo,
      projectTwoB,
      projectTwoC,
      projectTwoD,
      projectTwoE,
      projectTwoF,
      projectTwoG,
      projectTwoH,
      projectTwoI,
      projectTwoJ,
    ],
    url: "https://edison58tabacalera.com/",
    facts: [
      ["$3.5 MDP", "Inversión desde"],
      ["12%", "Cap rate estimado"],
      ["$68 USD", "Tarifa promedio"],
    ],
  },
];

function FloorPlansViewer({
  plans,
  brand,
  description,
}: {
  plans: FloorPlan[];
  brand: string;
  description: string;
}) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const plan = plans[index];

  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + plans.length) % plans.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % plans.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, plans.length]);

  const go = (next: number) => setIndex((next + plans.length) % plans.length);

  return (
    <>
      <Reveal className="mt-14 border border-black/10 bg-white md:mt-16">
        <div className="grid lg:grid-cols-12">
          <div className="border-b border-black/10 px-5 py-6 md:px-8 md:py-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#c6a65a]">
              {brand} · Planos
            </p>
            <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.08] tracking-[-.03em] text-[#041f49]">
              Lectura arquitectónica del activo
            </h3>
            <p className="mt-4 max-w-sm text-sm font-light leading-7 text-black/55">{description}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {plans.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`min-w-[3.1rem] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[.16em] transition-all duration-300 ${
                    i === index
                      ? "bg-[#041f49] text-[#c6a65a]"
                      : "border border-black/10 text-[#041f49]/55 hover:border-[#041f49]/35 hover:text-[#041f49]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-8 border-t border-black/10 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#041f49]/40">Nivel seleccionado</p>
              <p className="mt-2 text-lg tracking-[-.02em] text-[#041f49]">{plan.title}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[.16em] text-black/40">{plan.subtitle}</p>
              <p className="mt-4 text-[10px] font-bold tracking-[.2em] text-[#c6a65a]">
                Lámina {String(index + 1).padStart(2, "0")} / {String(plans.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="relative lg:col-span-8">
            <div className="relative aspect-[4/3] bg-[#f3f1ec] md:aspect-[16/11]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={plan.src}
                  src={plan.src}
                  alt={`${plan.title} · ${brand}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 h-full w-full object-contain p-3 md:p-5"
                />
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-[linear-gradient(180deg,transparent,rgba(250,249,247,.92)_45%,#faf9f7)] px-4 pb-4 pt-10 md:px-5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    className="flex h-10 w-10 items-center justify-center border border-black/12 bg-white text-[#041f49] transition-colors hover:border-[#c6a65a] hover:text-[#c6a65a]"
                    aria-label="Plano anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    className="flex h-10 w-10 items-center justify-center border border-black/12 bg-white text-[#041f49] transition-colors hover:border-[#c6a65a] hover:text-[#c6a65a]"
                    aria-label="Plano siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-2 border border-black/12 bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:border-[#c6a65a] hover:text-[#c6a65a]"
                >
                  <Maximize2 size={13} /> Ampliar plano
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {expanded && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#041f49]/90 p-3 backdrop-blur-md md:p-8"
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Plano ampliado · ${plan.title}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-[#faf9f7]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3 md:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#c6a65a]">Planos arquitectónicos</p>
                <p className="mt-1 text-sm text-[#041f49]">
                  {plan.title} <span className="text-[#041f49]/40">·</span> {plan.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  className="flex h-9 w-9 items-center justify-center border border-black/12 text-[#041f49] hover:border-[#c6a65a]"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  className="flex h-9 w-9 items-center justify-center border border-black/12 text-[#041f49] hover:border-[#c6a65a]"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="flex h-9 w-9 items-center justify-center border border-black/12 text-[#041f49] hover:border-[#c6a65a]"
                  aria-label="Cerrar"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="relative min-h-0 flex-1 overflow-auto bg-[#eceae6] p-3 md:p-6">
              <img
                src={plan.src}
                alt={`${plan.title} ampliado`}
                className="mx-auto h-auto w-full max-w-5xl object-contain shadow-[0_20px_60px_rgba(4,31,73,.12)]"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto border-t border-black/10 bg-white px-4 py-3 md:px-6">
              {plans.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`shrink-0 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] transition-colors ${
                    i === index ? "bg-[#041f49] text-[#c6a65a]" : "bg-[#f3f1ec] text-[#041f49]/55 hover:text-[#041f49]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

function ProjectGallery({
  images,
  name,
  status,
}: {
  images: string[];
  name: string;
  status: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || expanded || images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, expanded, images.length]);

  useEffect(() => {
    const track = thumbsRef.current;
    if (!track) return;
    const active = track.children[index] as HTMLElement | undefined;
    if (!active) return;
    const left = active.offsetLeft - (track.clientWidth - active.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, images.length]);

  const go = (next: number) => {
    setIndex((next + images.length) % images.length);
  };

  return (
    <>
      <div
        className="relative min-h-[480px] overflow-hidden bg-[#041f49] md:min-h-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${name} · vista ${index + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="absolute inset-0 z-[1] cursor-zoom-in bg-[linear-gradient(180deg,rgba(4,31,73,.18)_0%,transparent_35%,rgba(4,31,73,.55)_100%)]"
          aria-label={`Ampliar foto ${index + 1} de ${name}`}
        />

        <span className="pointer-events-none absolute left-6 top-6 z-10 bg-[#c6a65a] px-4 py-3 text-[9px] font-bold uppercase tracking-[.2em] text-[#041f49]">
          {status}
        </span>

        <div className="absolute right-5 top-5 z-10 flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="flex h-10 w-10 items-center justify-center border border-white/25 bg-black/25 text-white backdrop-blur-sm transition-colors hover:border-[#c6a65a] hover:text-[#c6a65a]"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="flex h-10 w-10 items-center justify-center border border-white/25 bg-black/25 text-white backdrop-blur-sm transition-colors hover:border-[#c6a65a] hover:text-[#c6a65a]"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={18} />
          </button>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex h-10 w-10 items-center justify-center border border-white/25 bg-black/25 text-white backdrop-blur-sm transition-colors hover:border-[#c6a65a] hover:text-[#c6a65a]"
            aria-label="Ampliar foto"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-white/70">
              Galería <span className="text-[#c6a65a]">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-white/35"> / {String(images.length).padStart(2, "0")}</span>
            </p>
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                  className={`h-1 transition-all duration-500 ${
                    i === index ? "w-8 bg-[#c6a65a]" : "w-3 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            ref={thumbsRef}
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                onDoubleClick={() => {
                  setIndex(i);
                  setExpanded(true);
                }}
                className={`relative aspect-[4/3] w-[22%] min-w-[5.5rem] shrink-0 overflow-hidden transition-all duration-300 sm:w-[18%] md:w-[20%] ${
                  i === index
                    ? "ring-1 ring-[#c6a65a] ring-offset-1 ring-offset-[#041f49]/40"
                    : "opacity-65 hover:opacity-100"
                }`}
                aria-label={`Seleccionar imagen ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#041f49]/92 p-3 backdrop-blur-md md:p-8"
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} · foto ampliada`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-[#0a1628]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 md:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#c6a65a]">{name}</p>
                <p className="mt-1 text-sm text-white/80">
                  Foto {String(index + 1).padStart(2, "0")}
                  <span className="text-white/35"> / {String(images.length).padStart(2, "0")}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-white hover:border-[#c6a65a] hover:text-[#c6a65a]"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-white hover:border-[#c6a65a] hover:text-[#c6a65a]"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-white hover:border-[#c6a65a] hover:text-[#c6a65a]"
                  aria-label="Cerrar"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 bg-black/40 p-3 md:p-6">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt={`${name} · vista ${index + 1} ampliada`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mx-auto h-full w-full max-w-5xl object-contain"
                />
              </AnimatePresence>
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-[#0a1628] px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative aspect-[4/3] w-20 shrink-0 overflow-hidden transition-all ${
                    i === index ? "ring-1 ring-[#c6a65a]" : "opacity-55 hover:opacity-100"
                  }`}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default function Portafolio() {
  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c]">
      <section className="relative h-svh max-h-dvh min-h-[100svh] overflow-hidden bg-[#0a1628] text-white">
        <motion.img
          src={heroDay}
          alt="Portafolio de activos ZAIAH"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.5)_0%,rgba(0,0,0,.15)_40%,rgba(0,0,0,.5)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 pb-10 pt-24 text-center md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a] md:mb-5"
          >
            <span className="h-px w-9 bg-[#c6a65a]" /> Portafolio ZAIAH <span className="h-px w-9 bg-[#c6a65a]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.22 }}
            className="max-w-4xl text-[clamp(2.1rem,5.2vw,4.4rem)] font-medium leading-[1.05] tracking-[-.03em] text-white"
          >
            Proyectos que nacen de escuchar{" "}
            <em className="font-serif font-normal italic text-[#c6a65a]">lo que una zona necesita</em>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
            className="mt-6 flex max-w-lg flex-col items-center md:mt-7"
          >
            <span className="mb-4 h-px w-12 bg-[#c6a65a]/70" aria-hidden />
            <p className="text-[10px] font-bold uppercase tracking-[.32em] text-[#c6a65a]">
              Activos <span className="mx-2 text-[#c6a65a]/45">·</span> CDMX
            </p>
            <p className="mt-3 text-sm font-light leading-7 text-white/70 md:text-[15px]">
              Cada proyecto responde a criterios urbanos, jurídicos, financieros y operativos. Aquí puedes revisar su estructura y contexto.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-6 flex w-full max-w-[20.5rem] flex-col items-stretch gap-3 sm:mt-7 sm:max-w-md md:mt-8 md:max-w-none md:flex-row md:items-center md:justify-center md:gap-4"
          >
            <Link href="/contacto" className="w-full md:w-auto">
              <span className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#22c55e] px-5 py-3.5 text-center text-[10px] font-bold uppercase tracking-[.12em] text-white transition-colors hover:bg-[#16a34a] sm:gap-3 sm:px-8 sm:py-4 sm:text-[11px] sm:tracking-[.18em]">
                Quiero regenerar mi Ciudad <ArrowRight size={15} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <a href="#proyectos" className="w-full md:w-auto">
              <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/45 bg-black/25 px-5 py-3.5 text-center text-[10px] font-medium uppercase tracking-[.12em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[.18em]">
                <MapPin size={14} className="shrink-0" /> Proyecto activos
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      <section id="proyectos" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="space-y-16 md:space-y-20">
            {projects.map((p, i) => {
              const gallery = p.images && p.images.length > 1 ? p.images : [p.image];
              return (
                <div key={p.name} className="space-y-14 md:space-y-16">
                  <Reveal className="grid gap-10 md:grid-cols-12 md:items-stretch">
                    <div
                      className={`relative min-h-[480px] overflow-hidden md:col-span-7 ${
                        i % 2 ? "md:col-start-6 md:row-start-1" : ""
                      }`}
                    >
                      {gallery.length > 1 ? (
                        <ProjectGallery images={gallery} name={p.name} status={p.status} />
                      ) : (
                        <>
                          <img
                            src={p.image}
                            alt={p.name}
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-[#041f49]/10" />
                          <span className="absolute left-6 top-6 bg-[#c6a65a] px-4 py-3 text-[9px] font-bold uppercase tracking-[.2em] text-[#041f49]">
                            {p.status}
                          </span>
                        </>
                      )}
                    </div>
                    <div
                      className={`flex flex-col justify-center py-6 md:col-span-4 ${
                        i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-9"
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#c6a65a]">{p.type}</p>
                      <h2 className="mt-5 text-[clamp(2.5rem,4vw,4.2rem)] leading-[1] tracking-[-.04em] text-[#041f49]">
                        {p.name}
                      </h2>
                      <p className="mt-3 text-[10px] uppercase tracking-[.2em] text-black/40">{p.place}</p>
                      <p className="mt-8 text-sm font-light leading-7 text-black/60">{p.description}</p>
                      <div className="mt-9 border-t border-black/15">
                        {p.facts.map(([v, l]) => (
                          <div key={l} className="flex items-baseline justify-between border-b border-black/10 py-4">
                            <span className="text-xl text-[#041f49]">{v}</span>
                            <span className="text-[9px] uppercase tracking-[.16em] text-black/40">{l}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#041f49]"
                      >
                        Conocer el proyecto <ExternalLink size={13} />
                      </a>
                    </div>
                  </Reveal>
                  {p.name === "ZAIAH HEALTH" && (
                    <FloorPlansViewer
                      plans={zhPlans}
                      brand="ZAIAH Health"
                      description="Revisa cada nivel del edificio: desde lobby y planta baja hasta los niveles de consultorios."
                    />
                  )}
                  {p.name === "Edison 58" && (
                    <FloorPlansViewer
                      plans={edisonPlans}
                      brand="Edison 58"
                      description="Explora planta baja, niveles 1–2, azotea con lofts y el cuadro de áreas del desarrollo."
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
    </main>
  );
}
