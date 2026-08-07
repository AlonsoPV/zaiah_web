import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import cityImage from "@/assets/images/quienes-somos-hero.jpeg";

const EASE = [0.22, 1, 0.36, 1] as const;

type Person = { name: string; role: string; image?: string };

const founders: Person[] = [
  { name: "Jorge Marín", role: "Fundador" },
  { name: "Jorge Alexis", role: "Fundador" },
];

const leadership: Person[] = [
  { name: "Abraham Harris", role: "Director general" },
  { name: "Karim Harris", role: "Director Comercial" },
  { name: "Javier Bustamante", role: "Líder comercial" },
  { name: "Miguel Piedras", role: "CFO on demand" },
];

const crew: Person[] = [
  { name: "Miguel Pérez", role: "Arquitecto" },
  { name: "Jorge Rocha", role: "Arquitecto" },
  { name: "Erika Velasco", role: "Administración" },
  { name: "Saúl López", role: "Contador" },
  { name: "Arlette López", role: "Contador" },
  { name: "Alonso Pérez", role: "Desarrollador" },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Portrait({ person, size = "md" }: { person: Person; size?: "lg" | "md" | "sm" }) {
  const heights = {
    lg: "aspect-[3/4] min-h-[320px] md:min-h-[420px]",
    md: "aspect-[4/5]",
    sm: "aspect-square",
  };

  return (
    <div className="group">
      <div className={`relative overflow-hidden bg-[#041f49] ${heights[size]}`}>
        {person.image ? (
          <img
            src={person.image}
            alt={person.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#0a1628_0%,#041f49_55%,#1a3a6e_100%)]">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #c6a65a 0%, transparent 45%)" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`font-medium tracking-[.2em] text-[#c6a65a]/80 ${size === "lg" ? "text-5xl md:text-6xl" : size === "md" ? "text-4xl" : "text-2xl"}`}>
                {initials(person.name)}
              </span>
            </div>
            <span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-[.22em] text-white/25">Foto</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041f49]/70 via-transparent to-transparent opacity-80 transition duration-500 group-hover:opacity-95" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className={`leading-tight tracking-[-.03em] text-white ${size === "lg" ? "text-2xl md:text-3xl" : size === "md" ? "text-xl" : "text-base"}`}>
            {person.name}
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#c6a65a]">{person.role}</p>
        </div>
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function QuienesSomos() {
  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c]">
      <section className="relative min-h-[92vh] overflow-hidden bg-[#0a1628] text-white">
        <motion.img
          src={cityImage}
          alt="Ciudad regenerada por ZAIAH"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
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
            className="text-[clamp(2.9rem,6.5vw,5.8rem)] font-medium leading-[1.05] tracking-[-.02em] text-white"
          >
            No compramos edificios. <em className="font-serif font-normal italic">Creamos nodos urbanos transformados.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
            className="mt-7 max-w-xl text-sm font-light leading-7 text-white/75 md:text-base"
          >
            No renovamos fachadas. Reactivamos economías locales. Reunimos inversión, diseño y operación para recuperar edificios y devolverles un lugar dentro de la ciudad.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
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

      {/* Manifesto + equipo */}
      <section className="relative overflow-hidden bg-[#041f49] py-16 text-white md:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-16 top-10 select-none text-[18rem] font-bold leading-none text-white/[.03]">
          Z
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Reveal>
            <p className="mb-6 flex items-center gap-4 text-[15px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
              <span className="h-px w-9 bg-[#c6a65a]" /> El equipo que construye
            </p>
            <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] tracking-[-.04em]">
              “Construimos abundancia <em className="font-serif font-normal italic text-[#c6a65a]">para compartir</em>”
            </h2>
            <p className="mt-6 max-w-md text-sm font-light leading-7 text-white/55">
              Founders · Jorge Marín. Una visión de ciudad regenerada, ejecutada por un equipo que combina estrategia, diseño y operación.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#faf9f7] pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Reveal className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#c6a65a]">01 · Founders</p>
              <h3 className="mt-2 text-2xl tracking-[-.03em] text-[#041f49] md:text-3xl">Quienes impulsan la visión</h3>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {founders.map((person) => (
              <Reveal key={person.name}>
                <Portrait person={person} size="lg" />
              </Reveal>
            ))}
          </div>

          <Reveal className="mb-8 mt-16">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#c6a65a]">02 · Liderazgo</p>
            <h3 className="mt-2 text-2xl tracking-[-.03em] text-[#041f49] md:text-3xl">Dirección y ejecución</h3>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <Reveal key={person.name}>
                <Portrait person={person} size="md" />
              </Reveal>
            ))}
          </div>

          <Reveal className="mb-8 mt-16">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#c6a65a]">03 · Operación</p>
            <h3 className="mt-2 text-2xl tracking-[-.03em] text-[#041f49] md:text-3xl">El equipo que hace realidad cada Zona Zaiah</h3>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {crew.map((person) => (
              <Reveal key={person.name}>
                <Portrait person={person} size="sm" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
