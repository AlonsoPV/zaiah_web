import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, Map, MapPin, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/images/hero-bg.png";
import projectImage from "@/assets/images/san-pedro.webp";
import projectTwo from "@/assets/images/edison-58.jpeg";
import projectThree from "@/assets/images/project-3.png";

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
  { image: heroImage, caption: "Zona Z · Regeneración urbana estructurada · CDMX" },
  { image: projectImage, caption: "San Pedro Patriotismo · San Pedro de los Pinos, CDMX" },
  { image: projectTwo, caption: "Edison 58 · Tabacalera, CDMX" },
  { image: projectThree, caption: "Activo regenerado · Nodo urbano ZAIAH" },
];

const principles = [
  { icon: Map, number: "01", title: "Concentramos", text: "Seleccionamos colonias con conectividad, demanda comprobable y potencial de regeneración." },
  { icon: Building2, number: "02", title: "Regeneramos", text: "Adquirimos edificios completos para reconfigurarlos con control integral, identidad y disciplina." },
  { icon: ShieldCheck, number: "03", title: "Estabilizamos", text: "Profesionalizamos la administración para convertir cada unidad en patrimonio de largo plazo." },
];

const pains = [
  "Proyectos que prometen más de lo que pueden ejecutar.",
  "Rentas, mantenimiento e inquilinos que consumen tu tiempo.",
  "Departamentos aislados que no transforman su entorno.",
  "Decisiones inmobiliarias sin estructura ni información suficiente.",
];

const pillars = [
  { number: "01", title: "Edificios completos", text: "La compra progresiva permite control y reconfiguración integral del activo, sin depender de terceros." },
  { number: "02", title: "Demanda real", text: "Decidimos con conectividad, absorción y profundidad de mercado. Datos antes que intuición." },
  { number: "03", title: "Identidad urbana", text: "Cada proyecto pertenece a una narrativa mayor y reconocible que multiplica el valor del conjunto." },
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
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.45)_0%,rgba(0,0,0,.15)_38%,rgba(0,0,0,.45)_100%)]" />

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
            style={{ fontFamily: "var(--app-font-serif)" }}
            className="text-[clamp(3.4rem,8vw,6.5rem)] font-normal leading-[1.02] tracking-[-.02em] text-white"
          >
            Cambia el destino.{" "}
            <em className="italic text-white">Pertenece.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-6 max-w-xl text-sm font-light leading-6 text-white/75 md:text-base"
          >
            Regeneramos activos urbanos estratégicos y los convertimos en patrimonio estabilizado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href="/contacto">
              <span className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#c6a65a] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:bg-white">
                Agendar una cita <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/portafolio">
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/45 bg-black/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10">
                <MapPin size={14} /> Ver portafolio
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
            <p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#041f49]/55"><span className="h-px w-9 bg-[#c6a65a]" /> El problema no es invertir</p>
            <h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-.035em] text-[#041f49]">Es tener que hacerlo todo solo.</h2>
            <p className="mt-6 max-w-md text-base font-light leading-7 text-[#1c1c1c]/65">
              Ya construiste capital. Ahora buscas protegerlo y hacerlo crecer sin convertirte en administrador, remodelador o experto inmobiliario de tiempo completo.
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
              {pains.map((pain, index) => (
                <motion.div
                  key={pain}
                  variants={fadeUp}
                  className="group grid grid-cols-[34px_1fr] gap-3 border-b border-black/10 py-5 transition-colors duration-300 hover:bg-[#041f49]/[.03]"
                >
                  <span className="text-[10px] font-bold tracking-widest text-[#c6a65a]">0{index + 1}</span>
                  <p className="text-sm leading-6 text-[#1c1c1c]/70 transition-transform duration-300 group-hover:translate-x-1 md:text-base">{pain}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              <p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
                <span className="h-px w-9 bg-[#c6a65a]" /> Nuestra respuesta
              </p>
              <h2 className="text-[clamp(2.4rem,4.4vw,4.6rem)] leading-[.98] tracking-[-.04em]">
                No desarrollamos proyectos aislados. <span className="text-[#c6a65a]">Construimos Zonas Z.</span>
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="self-end text-base font-light leading-7 text-white/60 md:col-span-4 md:col-start-9">
              Corredores caminables donde concentramos edificios regenerados. Cada activo funciona como un nodo; juntos crean identidad, escala y transformación visible.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid border-l border-t border-white/15 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {principles.map(({ icon: Icon, number, title, text }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group relative overflow-hidden border-b border-r border-white/15 p-7 transition-colors duration-500 hover:bg-white/[.04] md:min-h-[260px] md:p-8"
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
                <p className="mt-3 max-w-xs text-sm font-light leading-6 text-white/55">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PATRIMONIO ───────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#d9d6cf]">
        <div className="grid min-h-[540px] md:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-full">
            <motion.img
              src={projectImage}
              alt="Activo urbano regenerado por ZAIAH"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: EASE }}
            />
            <div className="absolute inset-0 bg-[#041f49]/15" />
            <div className="absolute bottom-7 left-7 bg-[#faf9f7] px-5 py-4 text-[9px] font-bold uppercase tracking-[.22em] text-[#041f49]">Edificio regenerado · Nodo urbano</div>
          </div>
          <div className="flex items-center px-7 py-14 md:px-14 md:py-16 lg:px-20">
            <Reveal>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[.3em] text-[#041f49]/55">Patrimonio, no especulación</p>
              <h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1] tracking-[-.04em] text-[#041f49]">Compra. Delega. Conserva.</h2>
              <p className="mt-6 max-w-lg text-base font-light leading-7 text-[#1c1c1c]/65">Nuestro modelo está pensado para inversionistas patrimoniales que valoran seguridad jurídica, operación profesional y visión de largo plazo. Tú eliges el activo. ZAIAH estructura y acompaña el proceso.</p>
              <div className="mt-7 grid grid-cols-2 gap-px bg-black/15">
                <div className="bg-[#d9d6cf] py-4 pr-5"><p className="text-2xl text-[#041f49]">30–65</p><p className="mt-1 text-[9px] uppercase tracking-[.18em] text-black/45">Perfil patrimonial</p></div>
                <div className="bg-[#d9d6cf] py-4 pl-5"><p className="text-2xl text-[#041f49]">CDMX</p><p className="mt-1 text-[9px] uppercase tracking-[.18em] text-black/45">Primera Zona Z</p></div>
              </div>
              <Link href="/modelo"><span className="mt-7 inline-flex cursor-pointer items-center gap-3 border-b border-[#041f49] pb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#041f49]">Conocer el modelo <ArrowRight size={14} /></span></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── POR QUÉ ZAIAH ────────────────────────────────────── */}
      <section className="bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <motion.div
            className="grid gap-10 md:grid-cols-12 md:gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={fadeUp} className="md:col-span-5">
              <p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
                <span className="h-px w-9 bg-[#c6a65a]" /> Por qué ZAIAH
              </p>
              <h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-.04em] text-[#041f49]">
                Control del activo. Lectura del territorio. Ejecución disciplinada.
              </h2>
              <p className="mt-6 max-w-md text-base font-light leading-7 text-black/55">
                Tres decisiones estructurales que separan un proyecto especulativo de un patrimonio con permanencia.
              </p>
            </motion.div>
            <div className="border-t border-black/15 md:col-span-7 md:border-t-0">
              {pillars.map(({ number, title, text }, index) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className={`group relative cursor-default border-b border-black/10 px-1 py-7 transition-colors duration-500 hover:bg-[#041f49] md:px-8 ${index === 0 ? "md:border-t md:border-t-black/15" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <div className="flex items-baseline gap-5">
                      <span className="text-[10px] font-bold tracking-[.25em] text-[#c6a65a]">{number}</span>
                      <h3 className="text-2xl tracking-[-.03em] text-[#041f49] transition-colors duration-500 group-hover:text-white md:text-3xl">{title}</h3>
                    </div>
                    <span className="shrink-0 text-[#c6a65a] opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                      <ArrowUpRight size={22} strokeWidth={1.5} />
                    </span>
                  </div>
                  <p className="mt-3 max-w-lg pl-0 text-sm font-light leading-6 text-black/55 transition-colors duration-500 group-hover:text-white/65 md:pl-10">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#c6a65a] py-16 text-[#041f49] md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-12 md:px-12 lg:px-16">
          <Reveal className="md:col-span-8">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.32em] text-[#041f49]/60">Una conversación, antes que una decisión</p>
            <h2 className="text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[1] tracking-[-.04em]">¿Tu patrimonio está listo para formar parte de algo mayor?</h2>
            <p className="mt-5 max-w-xl text-base font-light leading-7 text-[#041f49]/70">Conversemos sobre tus objetivos, horizonte y perfil. Sin presión. Con estructura y claridad.</p>
          </Reveal>
          <Reveal className="md:col-span-4 md:justify-self-end">
            <Link href="/contacto">
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group flex h-40 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-full bg-[#041f49] text-center text-white transition-colors hover:bg-[#1c1c1c] md:h-48 md:w-48"
              >
                <span className="px-6 text-[10px] font-bold uppercase leading-4 tracking-[.18em]">Agendar una cita</span>
                <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
