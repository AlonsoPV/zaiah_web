import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, Factory, LandPlot, Leaf, Map, MapPin, RefreshCw } from "lucide-react";
import heroDay1 from "@/assets/images/hero-day-1.webp";
import heroDay2 from "@/assets/images/hero-day-2.webp";
import heroDay3 from "@/assets/images/hero-day-3.webp";
import patrimonioImage from "@/assets/images/zaiah-zonas-z.webp";
import projectImage from "@/assets/images/san-pedro.webp";
import projectTwo from "@/assets/images/edison-58.jpeg";
import zaiahLogoBeige from "@/assets/images/zaiah-logo-beige.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

const heroSlides = [
  { image: heroDay1, caption: "Bellas Artes · Regeneración urbana estructurada" },
  { image: heroDay2, caption: "Ángel de la Independencia · CDMX" },
  { image: heroDay3, caption: "Paseo de la Reforma · Destino patrimonial" },
];

const principles = [
  {
    icon: Map,
    number: "01",
    title: "Zona Z",
    text: "Elegimos la zona",
  },
  {
    icon: Building2,
    number: "02",
    title: "Adquirimos y remodelamos los inmuebles",
  },
  {
    icon: RefreshCw,
    number: "03",
    title: "Inversión Triple impacto",
    points: [
      "Ganas por regenerar tu ciudad",
      "Impactas positivamente en el medio ambiente",
      "Generas rentabilidad",
    ],
  },
];

const pains = [
  { icon: LandPlot, text: "Escasez de tierra disponible." },
  { icon: Leaf, text: "Pérdida de espacios naturales y biofilia." },
  { icon: Factory, text: "Altos niveles de contaminación." },
  { icon: Building2, text: "Hiperdensificación de las zonas urbanas." },
];

const methodNodes = [
  {
    id: "zona",
    className: "left-[4%] top-[6%] text-left md:left-[8%] md:top-[10%]",
    title: "ZONA ESTRATÉGICA",
    eyebrow: "Analizamos",
  },
  {
    id: "intervencion",
    className: "left-1/2 top-[4%] -translate-x-1/2 text-center md:top-[6%]",
    title: "INTERVENCIÓN DE VALOR",
    subtitle: "Arquitectónica y Financiera",
  },
  {
    id: "horizonte",
    className: "right-[4%] top-[6%] text-right md:right-[8%] md:top-[10%]",
    title: "HORIZONTE DE\nINVERSIÓN",
    subtitle: "A LARGO PLAZO",
  },
  {
    id: "juridico",
    className: "bottom-[28%] right-[4%] text-right md:bottom-[32%] md:right-[10%]",
    title: "ASEGURAMIENTO\nJURÍDICO",
  },
  {
    id: "adquisicion",
    className: "bottom-[26%] left-1/2 -translate-x-1/2 text-center md:bottom-[30%]",
    title: "ADQUISICIÓN\nPROGRESIVA",
  },
];


export default function Home() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c]">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-[#0a1628]" data-testid="section-hero">
        <AnimatePresence mode="sync">
          <motion.img
            key={heroSlides[slide].image}
            src={heroSlides[slide].image}
            alt={heroSlides[slide].caption}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ imageRendering: "auto" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.4)_0%,rgba(0,0,0,.12)_40%,rgba(0,0,0,.42)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pb-28 pt-28 text-center md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-6 text-[11px] font-bold uppercase tracking-[.42em] text-white"
          >
            ZAIAH
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.22 }}
            className="text-[clamp(3.4rem,8vw,6.5rem)] font-medium leading-[1.02] tracking-[-.02em] text-white"
          >
            REDEFINIMOS EL FUTURO URBANO{" "}
            <em className="font-serif font-normal italic text-white">DE LAS GRANDES CIUDADES</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-6 max-w-xl text-base font-light leading-7 text-white/75 md:text-lg"
          >
            Creamos nodos de regeneración, llamadas Zonas Z, regenerando edificios y sus entornos, activando economías locales y creando patrimonio para quienes invierten en ellos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href="/contacto">
              <span className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#22c55e] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-white transition-colors hover:bg-[#16a34a]">
                Quiero regenerar mi Ciudad <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/portafolio">
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/45 bg-black/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10">
                <MapPin size={14} /> Proyecto activos
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom carousel chrome */}
        <div className="absolute inset-x-0 bottom-0 z-10 pb-8 pt-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6">
            <div className="flex items-center gap-2">
              {heroSlides.map((item, index) => (
                <button
                  key={item.caption}
                  type="button"
                  aria-label={`Ir a slide ${index + 1}`}
                  onClick={() => setSlide(index)}
                  className={`h-[2px] transition-all duration-500 ${index === slide ? "w-10 bg-white" : "w-6 bg-white/35 hover:bg-white/60"}`}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={heroSlides[slide].caption}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45 }}
                className="text-center text-[11px] font-light tracking-[.04em] text-white/80 md:text-sm"
              >
                {heroSlides[slide].caption}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── EL PROBLEMA ──────────────────────────────────────── */}
      <section className="border-b border-black/10 bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:px-12 lg:px-16">
          <Reveal className="md:col-span-5">
            <p className="mb-5 flex items-center gap-4 text-[15px] font-bold uppercase tracking-[.3em] text-[#041f49]/55"><span className="h-px w-9 bg-[#c6a65a]" /> El reto patrimonial</p>
            <h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-.035em] text-[#041f49]">Invertir de manera tradicional, ya no es la solución</h2>
            <p className="mt-6 max-w-md text-base font-light leading-7 text-[#1c1c1c]/65">
              El crecimiento desordenado ha provocado que nuestras ciudades enfrenten desafíos que impactan tanto el bienestar de las personas como el valor de las inversiones.
            </p>
          </Reveal>
          <motion.div
            className="md:col-span-6 md:col-start-7"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="border-t border-black/15">
              {pains.map(({ icon: Icon, text }, index) => (
                <motion.div
                  key={text}
                  variants={fadeUp}
                  className="group grid grid-cols-[40px_1fr] items-start gap-4 border-b border-black/10 py-5 transition-colors duration-300 hover:bg-[#041f49]/[.03]"
                >
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center text-[#c6a65a] transition-colors duration-300 group-hover:text-[#041f49]">
                    <Icon size={22} strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#c6a65a]">0{index + 1}</span>
                    <p className="mt-1 text-sm leading-6 text-[#1c1c1c]/70 transition-transform duration-300 group-hover:translate-x-1 md:text-base">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DOS FORMAS DE EMPEZAR ───────────────────────────── */}
      <section className="bg-[#f1efe9] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Reveal className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <p className="mb-4 flex items-center gap-4 text-[15px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
                <span className="h-px w-9 bg-[#c6a65a]" /> Proyectos actuales
              </p>
              <h2 className="max-w-xl text-[clamp(2rem,3.4vw,3.4rem)] leading-[1.05] tracking-[-.04em] text-[#041f49]">
                ¿Cómo puedes hoy, invertir con propósito?
              </h2>
              <p className="mt-3 max-w-md text-lg font-light leading-7 text-[#041f49]/70">
                Dos proyectos. Dos maneras de construir patrimonio.
              </p>
            </div>
            <div className="border-t border-black/15 pt-6 md:col-span-5 md:col-start-8 md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:pl-12">
              <p className="max-w-sm text-sm font-light leading-7 text-black/55 md:text-base">
                Conoce el proyecto que conversa mejor con tus objetivos. Si todavía no lo tienes claro, lo revisamos contigo.
              </p>
              <Link href="/portafolio">
                <span className="mt-5 inline-flex cursor-pointer items-center gap-3 border-b border-[#041f49] pb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#041f49]">
                  Ver todos los proyectos <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <motion.a
              href="https://sanpedropatriotismo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block min-h-[440px] overflow-hidden bg-[#041f49] md:min-h-[480px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: .2 }}
              variants={fadeUp}
            >
              <img src={projectImage} alt="San Pedro Patriotismo" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,31,73,.08)_20%,rgba(4,31,73,.95)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#c6a65a]">San Pedro Patriotismo · Zaiah Health</p>
                <h3 className="mt-3 text-2xl tracking-[-.03em] md:text-3xl">Regenera consultorios</h3>
                <p className="mt-3 max-w-lg text-sm font-light leading-6 text-white/65">Invierte a 5 min del WTC y genera ingresos pasivos a través de la renta de consultorios de salud y bienestar.</p>
                <span className="mt-5 inline-flex items-center gap-3 border-b border-[#c6a65a] pb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#c6a65a]">Conocer Zaiah Health <ArrowUpRight size={14}/></span>
              </div>
            </motion.a>

            <motion.a
              href="https://edison58tabacalera.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block min-h-[440px] overflow-hidden bg-[#1c1c1c] md:min-h-[480px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: .2 }}
              variants={fadeUp}
            >
              <img src={projectTwo} alt="Edison 58 Tabacalera" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08)_20%,rgba(0,0,0,.9)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#c6a65a]">Edison 58 · Tabacalera</p>
                <h3 className="mt-3 text-2xl tracking-[-.03em] md:text-3xl">Regenera departamentos en Tabacalera</h3>
                <p className="mt-3 max-w-lg text-sm font-light leading-6 text-white/65">Invierte en el único proyecto activo de los arquitectos de Frontón México y genera rentas por estancias cortas.</p>
                <span className="mt-5 inline-flex items-center gap-3 border-b border-[#c6a65a] pb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#c6a65a]">Conocer Edison 58 <ArrowUpRight size={14}/></span>
              </div>
            </motion.a>
          </div>

          <Reveal className="mt-8 grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-3">
            <div className="bg-[#faf9f7] p-6"><p className="text-2xl text-[#041f49] md:text-3xl">10 años</p><p className="mt-2 text-[10px] uppercase tracking-[.18em] text-black/45">Regenerando inmuebles en CDMX</p></div>
            <div className="bg-[#faf9f7] p-6"><p className="text-2xl text-[#041f49] md:text-3xl">+30</p><p className="mt-2 text-[10px] uppercase tracking-[.18em] text-black/45">Inversionistas que confían en el modelo</p></div>
            <div className="bg-[#faf9f7] p-6"><p className="text-2xl text-[#041f49] md:text-3xl">100%</p><p className="mt-2 text-[10px] uppercase tracking-[.18em] text-black/45">Operación y administración a nuestro cargo</p></div>
          </Reveal>
        </div>
      </section>

      {/* ── NUESTRA RESPUESTA / ZONAS Z ─────────────────────── */}
      <section className="relative overflow-hidden bg-[#041f49] py-16 text-white md:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-10 select-none text-[26rem] font-bold leading-none text-white/[.02]">Z</div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <motion.div
            className="mb-12 grid gap-8 md:grid-cols-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp} className="md:col-span-7">
              <p className="mb-5 flex items-center gap-4 text-[15px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
                <span className="h-px w-9 bg-[#c6a65a]" /> Nuestro propósito
              </p>
              <h2 className="text-[clamp(2.4rem,4.4vw,4.6rem)] leading-[.98] tracking-[-.04em]">
                No compramos edificios. <span className="text-[#c6a65a]">Creamos polígonos de regeneración. Renovamos ciudades.</span>
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="self-end text-base font-light leading-7 text-white/60 md:col-span-4 md:col-start-9">
              No renovamos fachadas. Reactivamos economías locales. Cada edificio regenerado se conecta con su calle, su comunidad y una visión más grande de ciudad.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid border-l border-t border-white/15 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {principles.map(({ icon: Icon, number, title, text, points }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group relative overflow-hidden border-b border-r border-white/15 p-7 transition-colors duration-500 hover:bg-white/[.04] md:min-h-[280px] md:p-8"
              >
                <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-4 select-none text-[9rem] font-bold leading-none text-white/[.03] transition-all duration-500 group-hover:text-[#c6a65a]/10">
                  {number}
                </span>
                <div className="flex items-start justify-between">
                  <Icon strokeWidth={1.25} className="text-[#c6a65a] transition-transform duration-500 group-hover:-translate-y-1" size={26} />
                  <span className="text-[10px] tracking-[.25em] text-white/30">{number}</span>
                </div>
                <h3 className="mt-12 text-2xl tracking-[-.03em] md:text-3xl">{title}</h3>
                <span className="mt-3 block h-px w-8 bg-[#c6a65a]/60 transition-all duration-500 group-hover:w-16" />
                {points ? (
                  <ul className="mt-4 space-y-2.5">
                    {points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm font-light leading-6 text-white/55">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c6a65a]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : text ? (
                  <p className="mt-3 max-w-xs text-sm font-light leading-6 text-white/55">{text}</p>
                ) : null}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PATRIMONIO ───────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#d9d6cf]">
        <div className="mx-auto max-w-[1200px]">
          <img
            src={patrimonioImage}
            alt="Zonas Z · ZAIAH"
            width={1200}
            height={532}
            decoding="async"
            className="block h-auto w-full"
            style={{ imageRendering: "auto" }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-14 pt-10 md:px-12 md:pb-20 md:pt-12 lg:px-16">
          <Reveal className="grid gap-10 md:grid-cols-12 md:gap-8 md:items-end">
            <div className="md:col-span-7">
              <p className="mb-5 flex items-center gap-4 text-[15px] font-bold uppercase tracking-[.3em] text-[#041f49]/55">
                <span className="h-px w-9 bg-[#c6a65a]" /> Zonas Z · Patrimonio con propósito
              </p>
              <h2 className="max-w-2xl text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] tracking-[-.04em] text-[#041f49]">
                Genera Patrimonio con Certeza jurídica
              </h2>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="text-base font-light leading-7 text-[#1c1c1c]/65">
                No son acciones, títulos o derechos, obtienes escrituras en todos nuestros proyectos.
              </p>
              <Link href="/modelo">
                <span className="mt-6 inline-flex cursor-pointer items-center gap-3 border-b border-[#041f49] pb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#041f49]">
                  Conocer el modelo <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-10 grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-3">
            <div className="bg-[#d9d6cf] px-6 py-5">
              <p className="text-2xl text-[#041f49] md:text-3xl">30–65</p>
              <p className="mt-2 text-[10px] uppercase tracking-[.18em] text-black/45">Perfil patrimonial</p>
            </div>
            <div className="bg-[#d9d6cf] px-6 py-5">
              <p className="text-2xl text-[#041f49] md:text-3xl">CDMX</p>
              <p className="mt-2 text-[10px] uppercase tracking-[.18em] text-black/45">Primera Zona Z</p>
            </div>
            <div className="bg-[#d9d6cf] px-6 py-5">
              <p className="text-2xl text-[#041f49] md:text-3xl">100%</p>
              <p className="mt-2 text-[10px] uppercase tracking-[.18em] text-black/45">Con escrituras</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MÉTODO ZAIAH DIAGRAMA ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#eceae6]" data-testid="section-metodo-diagrama">
        <div className="relative z-10 mx-auto min-h-[520px] max-w-6xl px-4 pb-6 pt-10 md:min-h-[580px] md:px-8 md:pt-14">
          <p
            aria-hidden
            className="pointer-events-none absolute bottom-[18%] left-[3%] max-w-[10ch] select-none text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-[.92] tracking-[-.02em] text-black/[.07] md:bottom-[14%] md:left-[5%]"
          >
            MÉTODO DE TRANSFORMACIÓN
          </p>

          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 580"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M420 275 H210 V115" stroke="rgba(0,0,0,.2)" strokeWidth="1" />
            <path d="M500 255 V105" stroke="rgba(0,0,0,.2)" strokeWidth="1" />
            <path d="M580 275 H790 V115" stroke="rgba(0,0,0,.2)" strokeWidth="1" />
            <path d="M580 315 H790 V400" stroke="rgba(0,0,0,.2)" strokeWidth="1" />
            <path d="M500 335 V420" stroke="rgba(0,0,0,.2)" strokeWidth="1" />
          </svg>

          <motion.div
            className="absolute left-1/2 top-[46%] z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <img
              src={zaiahLogoBeige}
              alt="ZAIAH"
              className="h-auto w-[min(52vw,420px)] object-contain"
            />
          </motion.div>

          {methodNodes.map(({ id, className, title, eyebrow, subtitle }, index) => (
            <motion.div
              key={id}
              className={`absolute z-10 hidden text-[#c6a65a] md:block ${className}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.08 * index, ease: EASE }}
            >
              {eyebrow && <span className="mb-1 block text-[10px] font-light uppercase tracking-[.14em]">{eyebrow}</span>}
              <span className="block whitespace-pre-line text-xs font-semibold uppercase leading-5 tracking-[.14em] md:text-sm md:leading-6">
                {title}
              </span>
              {subtitle && <span className="mt-1 block text-[10px] font-light tracking-[.08em] md:text-xs">{subtitle}</span>}
            </motion.div>
          ))}

          <div className="relative z-10 mt-16 space-y-5 px-2 pb-8 md:hidden">
            <img
              src={zaiahLogoBeige}
              alt="ZAIAH"
              className="mx-auto mb-8 h-auto w-[min(70vw,280px)] object-contain"
            />
            {methodNodes.map(({ id, title, eyebrow, subtitle }) => (
              <div key={id} className="border-l border-[#c6a65a]/50 pl-4 text-[#c6a65a]">
                {eyebrow && <span className="mb-0.5 block text-[10px] font-light uppercase tracking-[.14em]">{eyebrow}</span>}
                <span className="block whitespace-pre-line text-sm font-semibold uppercase leading-5 tracking-[.12em]">{title}</span>
                {subtitle && <span className="mt-1 block text-[11px] font-light tracking-[.06em]">{subtitle}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-40 overflow-hidden md:h-52 lg:h-60">
          <img
            src={heroDay2}
            alt=""
            aria-hidden
            decoding="async"
            className="h-full w-full object-cover object-[center_45%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#eceae6]/15 to-[#eceae6]" />
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-black/10 bg-[#faf9f7] py-16 text-[#041f49] md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-12 md:px-12 lg:px-16">
          <Reveal className="md:col-span-8">
            <h2 className="text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[1] tracking-[-.04em]">Invierte y regenera nuestra ciudad…</h2>
            <p className="mt-5 max-w-xl text-base font-light leading-7 text-[#041f49]/70">Genera ingresos pasivos en cualquiera de nuestros edificios, diversifica.</p>
            <p className="mt-3 max-w-xl text-base font-light leading-7 text-[#041f49]/70">Agenda una reunión virtual donde analizaremos tu perfil inversionista y haremos la elección del mejor proyecto.</p>
          </Reveal>
          <Reveal className="md:col-span-4 md:justify-self-end">
            <Link href="/contacto">
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group flex h-40 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-full bg-[#041f49] text-center text-white transition-colors hover:bg-[#1c1c1c] md:h-48 md:w-48"
              >
                <span className="px-6 text-[10px] font-bold uppercase leading-4 tracking-[.18em]">Agenda una cita</span>
                <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
