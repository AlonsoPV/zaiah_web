import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, CloudFog, DraftingCompass, Factory, FileCheck2, Layers, Leaf, MapPin, MapPinned, Mountain, Orbit, Scale, ShieldCheck, Stamp, Trees } from "lucide-react";
import heroFallback from "@/assets/images/hero-fallback.jpeg";
import projectImage from "@/assets/images/san-pedro.webp";
import projectTwo from "@/assets/images/edison-58.jpeg";
import zaiahLogoBeige from "@/assets/images/zaiah-logo-beige.png";
import zonasZaiahImage from "@/assets/images/zonas-zaiah.webp";

const HERO_VIDEO = `${import.meta.env.BASE_URL}videos/zaiah-cdmx.mp4`;
const HERO_FALLBACK = heroFallback;

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

const principles = [
  {
    icon: MapPinned,
    number: "01",
    title: "Zona Zaiah",
    text: "Elegimos la zona",
    points: [
      "Seleccionamos corredores con demanda real y conectividad",
      "Concentramos regeneración donde el impacto urbano se multiplica",
      "Construimos nodos que elevan el valor de toda la zona",
    ],
  },
  {
    icon: DraftingCompass,
    number: "02",
    title: "Adquirimos y remodelamos los inmuebles",
    points: [
      "Compramos el activo completo para intervenir a fondo",
      "Remodelamos con criterio arquitectónico y financiero",
      "Devolvemos utilidad, identidad y relación con la calle",
    ],
  },
  {
    icon: Orbit,
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
  { icon: Mountain, accent: Layers, text: "Escasez de tierra disponible." },
  { icon: Trees, accent: Leaf, text: "Pérdida de espacios naturales y biofilia." },
  { icon: CloudFog, accent: Factory, text: "Altos niveles de contaminación." },
  { icon: Building2, accent: Layers, text: "Hiperdensificación de las zonas urbanas." },
];

const certaintyPoints = [
  {
    icon: ShieldCheck,
    accent: Building2,
    title: "Garantía respaldada por inmueble",
  },
  {
    icon: FileCheck2,
    accent: Scale,
    title: "Certeza contractual",
  },
  {
    icon: Stamp,
    accent: Scale,
    title: "Proceso notariado",
  },
];

const methodNodes = [
  {
    id: "zona",
    className: "left-0 top-0 text-left md:left-[2%] md:top-[8%]",
    title: "ZONA ESTRATÉGICA",
    eyebrow: "Analizamos",
  },
  {
    id: "intervencion",
    className: "left-1/2 top-0 -translate-x-1/2 text-center md:top-[4%]",
    title: "INTERVENCIÓN DE VALOR",
    subtitle: "Arquitectónica y Financiera",
  },
  {
    id: "horizonte",
    className: "right-0 top-0 text-right md:right-[2%] md:top-[8%]",
    title: "HORIZONTE DE\nINVERSIÓN",
    subtitle: "A LARGO PLAZO",
  },
  {
    id: "juridico",
    className: "bottom-0 right-0 text-right md:bottom-[6%] md:right-[4%]",
    title: "ASEGURAMIENTO\nJURÍDICO",
  },
  {
    id: "adquisicion",
    className: "bottom-0 left-1/2 -translate-x-1/2 text-center md:bottom-[4%]",
    title: "ADQUISICIÓN\nPROGRESIVA",
  },
];


export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVideoFailed(true);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    const play = video.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => setVideoFailed(true));
    }
  }, []);

  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c]">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-svh max-h-dvh min-h-[100svh] overflow-hidden bg-[#0a1628]" data-testid="section-hero">
        <img
          src={HERO_FALLBACK}
          alt=""
          aria-hidden
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {!videoFailed && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_FALLBACK}
            onError={() => setVideoFailed(true)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.4)_0%,rgba(0,0,0,.12)_40%,rgba(0,0,0,.42)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 pb-10 pt-24 text-center md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-4 text-[11px] font-bold uppercase tracking-[.42em] text-white md:mb-6"
          >
            ZAIAH
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.22 }}
            className="max-w-5xl text-[clamp(2.2rem,6.2vw,5.6rem)] font-medium leading-[1.05] tracking-[-.02em] text-white"
          >
            REDEFINIMOS EL FUTURO URBANO{" "}
            <em className="font-serif font-normal italic text-white">DE LAS GRANDES CIUDADES</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-4 max-w-xl text-sm font-light leading-6 text-white/75 md:mt-6 md:text-base md:leading-7 lg:text-lg"
          >
            Creamos nodos de regeneración, llamadas Zonas Zaiah, regenerando edificios y sus entornos, activando economías locales y creando patrimonio para quienes invierten en ellos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-7 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4"
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
      </section>

      {/* ── EL PROBLEMA ──────────────────────────────────────── */}
      <section className="border-b border-black/10 bg-[#faf9f7] py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-12 lg:px-16">
          <div className="grid items-stretch gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="mb-4 flex items-center gap-4 text-[13px] font-bold uppercase tracking-[.3em] text-[#041f49]/55 sm:mb-5 sm:text-[15px]">
                <span className="h-px w-9 bg-[#c6a65a]" /> El reto patrimonial
              </p>
              <h2 className="max-w-lg text-[clamp(1.9rem,3.8vw,3.6rem)] leading-[1.05] tracking-[-.035em] text-[#041f49]">
                Invertir de manera tradicional, ya no es la solución
              </h2>
              <p className="mt-5 max-w-md text-sm font-light leading-7 text-[#1c1c1c]/65 sm:mt-6 sm:text-base">
                El crecimiento desordenado ha provocado que nuestras ciudades enfrenten desafíos que impactan tanto el bienestar de las personas como el valor de las inversiones.
              </p>
            </Reveal>

            <motion.div
              className="flex h-full lg:col-span-7"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="grid h-full w-full flex-1 gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2 sm:grid-rows-2">
                {pains.map(({ icon: Icon, accent: Accent, text }, index) => (
                  <motion.div
                    key={text}
                    variants={fadeUp}
                    className="group flex h-full min-h-0 flex-col justify-between gap-4 bg-[#faf9f7] p-5 transition-colors duration-300 hover:bg-[#041f49]/[.03] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(198,166,90,.28),transparent_58%)]" />
                        <span className="absolute inset-[3px] rounded-full border border-[#c6a65a]/35 transition-all duration-500 group-hover:border-[#c6a65a]/70" />
                        <Accent
                          size={16}
                          strokeWidth={1}
                          className="absolute translate-x-1.5 translate-y-1 text-[#041f49]/12"
                          aria-hidden
                        />
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className="relative text-[#c6a65a] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-[#041f49]"
                          aria-hidden
                        />
                      </span>
                      <p className="text-[10px] font-bold tracking-[.24em] text-[#c6a65a]">0{index + 1}</p>
                    </div>
                    <p className="max-w-[18ch] text-[clamp(0.95rem,1.5vw,1.15rem)] leading-snug tracking-[-.02em] text-[#1c1c1c]/80">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NUESTRA RESPUESTA / ZONAS ZAIAH ─────────────────────── */}
      <section className="relative overflow-hidden bg-[#041f49] py-16 text-white md:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-10 select-none text-[26rem] font-bold leading-none text-white/[.02]">Z</div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <motion.div
            className="grid gap-8 md:grid-cols-12"
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
                <span className="text-[#c6a65a]">Generas rentabilidad por regenerar tu ciudad</span>
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="self-end text-base font-light leading-7 text-white/60 md:col-span-4 md:col-start-9">
              No renovamos fachadas. Reactivamos economías locales. Cada edificio regenerado se conecta con su calle, su comunidad y una visión más grande de ciudad.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative mt-8 -mx-6 overflow-hidden sm:mt-10 md:mx-0 md:mt-12 md:rounded-sm"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="relative aspect-[16/11] w-full sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/9]">
              <img
                src={zonasZaiahImage}
                alt="Zonas Zaiah · Mapa de regeneración urbana"
                width={1672}
                height={941}
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
                className="absolute inset-0 h-full w-full object-cover object-[center_42%] md:object-center"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#041f49_0%,transparent_8%,transparent_92%,#041f49_100%)] md:bg-[linear-gradient(90deg,#041f49_0%,transparent_12%,transparent_88%,#041f49_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,31,73,.35)_0%,transparent_22%,transparent_72%,rgba(4,31,73,.7)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-7">
              <p className="text-[9px] font-bold uppercase tracking-[.28em] text-[#c6a65a] sm:text-[10px]">Zonas Zaiah</p>
              <p className="mt-1 max-w-xs text-xs font-light text-white/75 sm:text-sm">Polígonos de regeneración urbana</p>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {principles.map(({ icon: Icon, number, title, text, points }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group relative flex flex-col overflow-hidden border border-white/12 bg-white/[.02] p-7 transition-all duration-500 hover:border-[#c6a65a]/35 hover:bg-white/[.05] md:min-h-[360px] md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="relative flex h-14 w-14 items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(198,166,90,.35),transparent_60%)]" />
                    <span className="absolute inset-[3px] rounded-full border border-[#c6a65a]/40 transition-all duration-500 group-hover:inset-[1px] group-hover:border-[#c6a65a]/80" />
                    <Icon
                      strokeWidth={1.2}
                      size={26}
                      className="relative text-[#c6a65a] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-105"
                    />
                  </span>
                  <span className="text-[11px] font-bold tracking-[.28em] text-[#c6a65a]/70">{number}</span>
                </div>

                <h3 className="mt-8 text-[1.35rem] leading-tight tracking-[-.03em] md:text-[1.55rem]">{title}</h3>
                <span className="mt-4 block h-px w-10 bg-[#c6a65a]/55 transition-all duration-500 group-hover:w-16" />

                {text && (
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[.18em] text-white/50">{text}</p>
                )}

                {points ? (
                  <ul className="mt-4 flex flex-1 flex-col gap-3">
                    {points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm font-light leading-6 text-white/60">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#c6a65a]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PATRIMONIO ───────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#d9d6cf]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-20 lg:px-16">
          <Reveal className="grid gap-10 md:grid-cols-12 md:gap-8 md:items-end">
            <div className="md:col-span-7">
              <p className="mb-5 flex items-center gap-4 text-[15px] font-bold uppercase tracking-[.3em] text-[#041f49]/55">
                <span className="h-px w-9 bg-[#c6a65a]" /> Zonas Zaiah · Patrimonio con propósito
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

          <Reveal className="mt-10">
            <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-3">
              {certaintyPoints.map(({ icon: Icon, accent: Accent, title }, index) => (
                <div
                  key={title}
                  className="group flex items-center gap-4 bg-[#d9d6cf] px-5 py-4 transition-colors duration-300 hover:bg-[#d1cdc4] md:px-6"
                >
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(198,166,90,.32),transparent_58%)]" />
                    <span className="absolute inset-[3px] rounded-full border border-[#041f49]/15 transition-all duration-500 group-hover:border-[#c6a65a]/70" />
                    <Accent
                      size={16}
                      strokeWidth={1}
                      className="absolute translate-x-1.5 translate-y-1 text-[#041f49]/12"
                      aria-hidden
                    />
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="relative text-[#041f49] transition-transform duration-500 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[.24em] text-[#c6a65a]">0{index + 1}</p>
                    <h3 className="mt-0.5 text-[15px] leading-snug tracking-[-.02em] text-[#041f49]">
                      {title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
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
                <p className="mt-3 max-w-lg text-sm font-light leading-6 text-white/65">Invierte a 5 min del WTC y genera ingresos pasivos a través de la renta de consultorios del sector de salud...</p>
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

      {/* ── MÉTODO ZAIAH DIAGRAMA ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#eceae6]" data-testid="section-metodo-diagrama">
        <div className="relative z-10 mx-auto max-w-5xl px-5 pb-6 pt-10 md:px-8 md:pb-8 md:pt-12">
          <Reveal className="mb-6 text-center md:mb-8">
            <p className="mb-2 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[.28em] text-[#c6a65a]">
              <span className="h-px w-7 bg-[#c6a65a]" /> ZAIAH <span className="h-px w-7 bg-[#c6a65a]" />
            </p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] tracking-[-.03em] text-[#041f49]">
              Método de transformación
            </h2>
          </Reveal>

          {/* Desktop diagram */}
          <div className="relative mx-auto hidden aspect-[16/9] w-full max-w-3xl md:block">
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1000 700"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Lines stop at logo safe zone (~360–640 x 300–400) */}
              <path d="M170 130 V250 H360" stroke="rgba(4,31,73,.22)" strokeWidth="1.25" />
              <path d="M500 110 V290" stroke="rgba(4,31,73,.22)" strokeWidth="1.25" />
              <path d="M830 130 V250 H640" stroke="rgba(4,31,73,.22)" strokeWidth="1.25" />
              <path d="M830 570 V450 H640" stroke="rgba(4,31,73,.22)" strokeWidth="1.25" />
              <path d="M500 590 V410" stroke="rgba(4,31,73,.22)" strokeWidth="1.25" />
              {/* endpoint dots */}
              <circle cx="360" cy="250" r="2.5" fill="#c6a65a" />
              <circle cx="500" cy="290" r="2.5" fill="#c6a65a" />
              <circle cx="640" cy="250" r="2.5" fill="#c6a65a" />
              <circle cx="640" cy="450" r="2.5" fill="#c6a65a" />
              <circle cx="500" cy="410" r="2.5" fill="#c6a65a" />
            </svg>

            <motion.div
              className="absolute left-1/2 top-1/2 z-10 w-[min(32%,260px)] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <img
                src={zaiahLogoBeige}
                alt="ZAIAH"
                className="mx-auto h-auto w-full object-contain"
              />
            </motion.div>

            {methodNodes.map(({ id, className, title, eyebrow, subtitle }, index) => (
              <motion.div
                key={id}
                className={`absolute z-10 max-w-[160px] text-[#c6a65a] ${className}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.06 * index, ease: EASE }}
              >
                {eyebrow && <span className="mb-0.5 block text-[9px] font-light uppercase tracking-[.12em] text-[#041f49]/45">{eyebrow}</span>}
                <span className="block whitespace-pre-line text-[11px] font-semibold uppercase leading-4 tracking-[.1em]">
                  {title}
                </span>
                {subtitle && <span className="mt-0.5 block text-[9px] font-light tracking-[.06em] text-[#041f49]/50">{subtitle}</span>}
              </motion.div>
            ))}
          </div>

          {/* Mobile */}
          <div className="relative z-10 md:hidden">
            <img
              src={zaiahLogoBeige}
              alt="ZAIAH"
              className="mx-auto mb-6 h-auto w-[min(55vw,200px)] object-contain"
            />
            <div className="space-y-3.5">
              {methodNodes.map(({ id, title, eyebrow, subtitle }) => (
                <div key={id} className="border-l-2 border-[#c6a65a]/60 pl-3 text-[#041f49]">
                  {eyebrow && <span className="mb-0.5 block text-[9px] font-light uppercase tracking-[.12em] text-[#041f49]/45">{eyebrow}</span>}
                  <span className="block whitespace-pre-line text-xs font-semibold uppercase leading-4 tracking-[.1em] text-[#c6a65a]">{title}</span>
                  {subtitle && <span className="mt-0.5 block text-[10px] font-light tracking-[.06em] text-[#041f49]/55">{subtitle}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-black/10 bg-[#faf9f7] py-16 text-[#041f49] md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-12 md:px-12 lg:px-16">
          <Reveal className="md:col-span-8">
            <h2 className="text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[1] tracking-[-.04em]">
              Hoy puedes ser parte de esta gran comunidad.
            </h2>
            <p className="mt-5 max-w-xl text-base font-light leading-7 text-[#041f49]/70">
              Vuélvete inversionista y genera patrimonio regenerando la ciudad.
            </p>
            <p className="mt-3 max-w-xl text-base font-light leading-7 text-[#041f49]/70">
              Agenda una reunión virtual: analizamos tu perfil y elegimos juntos el mejor proyecto.
            </p>
          </Reveal>
          <Reveal className="md:col-span-4 md:justify-self-end">
            <Link href="/contacto">
              <span className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#22c55e] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-white transition-colors hover:bg-[#16a34a]">
                Agenda una cita <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
