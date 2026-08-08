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

const testimonials = [
  {
    initials: "LH",
    name: "Lizbeth Hernández",
    role: "Inversionista",
    quote:
      "Fue increíble, le dieron seguimiento a todo el proyecto. Es muy formal y te da mucha confianza.",
  },
  {
    initials: "RM",
    name: "Rosa María",
    role: "Inversionista",
    quote:
      "Nos transmitió mucha confianza Alexis: una persona muy agradable, tolerante y comprensiva para llegar a la conclusión de esta operación.",
  },
  {
    initials: "AM",
    name: "Alfonso Mercado",
    role: "Inversionista",
    quote:
      "Recibir una renta fija es cómodo: no tener que lidiar con inquilinos ni con meses en que la propiedad no está ocupada. Para mí fue lo mejor.",
  },
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
      <section className="relative h-svh max-h-dvh min-h-[100svh] overflow-hidden bg-[#0a1628] text-white">
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

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 pb-10 pt-24 text-center md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a] md:mb-5"
          >
            <span className="h-px w-9 bg-[#c6a65a]" /> El equipo que construye <span className="h-px w-9 bg-[#c6a65a]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.22 }}
            className="max-w-4xl text-[clamp(2.1rem,5.2vw,4.4rem)] font-medium leading-[1.05] tracking-[-.03em] text-white"
          >
            “Construimos abundancia <em className="font-serif font-normal italic text-[#c6a65a]">para compartir</em>”
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
            className="mt-6 flex max-w-lg flex-col items-center md:mt-7"
          >
            <span className="mb-4 h-px w-12 bg-[#c6a65a]/70" aria-hidden />
            <p className="text-[10px] font-bold uppercase tracking-[.32em] text-[#c6a65a]">
              Founders <span className="mx-2 text-[#c6a65a]/45">·</span> Jorge Marín
            </p>
            <p className="mt-3 text-sm font-light leading-7 text-white/70 md:text-[15px]">
              Una visión de ciudad regenerada, ejecutada por un equipo que combina estrategia, diseño y operación.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:mt-8"
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

      <section className="relative overflow-hidden bg-[#041f49] py-16 text-white md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-8 select-none text-[14rem] font-bold leading-none text-white/[.03] md:text-[18rem]"
        >
          ”
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Reveal className="mb-12 max-w-2xl md:mb-14">
            <p className="mb-4 flex items-center gap-4 text-[13px] font-bold uppercase tracking-[.3em] text-[#c6a65a] sm:text-[15px]">
              <span className="h-px w-9 bg-[#c6a65a]" /> Testimonios
            </p>
            <h3 className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] tracking-[-.03em]">
              Lo que dicen quienes ya regeneran con nosotros
            </h3>
          </Reveal>

          <div className="grid gap-0 border-t border-white/12 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name}>
                <figure
                  className={`flex h-full flex-col border-white/12 py-8 md:border-r md:px-7 md:py-10 lg:px-9 ${
                    index === testimonials.length - 1 ? "md:border-r-0" : ""
                  } ${index > 0 ? "border-t md:border-t-0" : ""}`}
                >
                  <span className="text-[10px] font-bold tracking-[.28em] text-[#c6a65a]/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <blockquote className="mt-5 flex-1 font-serif text-[1.05rem] font-normal italic leading-7 text-white/88 md:text-[1.1rem] md:leading-8">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#c6a65a]/45 text-[10px] font-bold tracking-[.12em] text-[#c6a65a]">
                      {item.initials}
                    </span>
                    <span>
                      <span className="block text-sm tracking-[-.02em] text-white">{item.name}</span>
                      <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.22em] text-[#c6a65a]">
                        {item.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
