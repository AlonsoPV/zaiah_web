import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Play, X } from "lucide-react";
import cityImage from "@/assets/images/quienes-somos-hero.jpeg";
import jorgeMarin from "@/assets/images/jorge-marin.webp";
import alexisMarin from "@/assets/images/alexis-marin.webp";
import javierBautista from "@/assets/images/javier-bautista.webp";
import erikaVelasco from "@/assets/images/erika-velasco.webp";
import alonsoPerez from "@/assets/images/alonso-perez.webp";
import abrahamHarris from "@/assets/images/abraham-harris.webp";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIDEO_BASE = `${import.meta.env.BASE_URL}videos`;

type Person = { name: string; role: string; image?: string };

const founders: Person[] = [
  { name: "Jorge Marín", role: "Fundador", image: jorgeMarin },
  { name: "Jorge Alexis", role: "Fundador", image: alexisMarin },
];

const leadership: Person[] = [
  { name: "Abraham Harris", role: "Director general", image: abrahamHarris },
  { name: "Karim Harris", role: "Director Comercial" },
  { name: "Javier Bautista", role: "Líder comercial", image: javierBautista },
  { name: "Miguel Piedras", role: "CFO" },
];

const crew: Person[] = [
  { name: "Miguel Pérez", role: "Arquitecto" },
  { name: "Jorge Rocha", role: "Arquitecto" },
  { name: "Erika Velasco", role: "Administración", image: erikaVelasco },
  { name: "Saúl López", role: "Contador" },
  { name: "Arlette López", role: "Contador" },
  { name: "Alonso Pérez", role: "Programador", image: alonsoPerez },
];

type Testimonial = {
  initials: string;
  name: string;
  role: string;
  quote: string;
  video: string;
};

const testimonials: Testimonial[] = [
  {
    initials: "LH",
    name: "Lizbeth Hernández",
    role: "Inversionista",
    quote:
      "Fue increíble, le dieron seguimiento a todo el proyecto. Es muy formal y te da mucha confianza.",
    video: `${VIDEO_BASE}/testimonio-lizbeth.mov`,
  },
  {
    initials: "RM",
    name: "Rosa María",
    role: "Inversionista",
    quote:
      "Nos transmitió mucha confianza Alexis: una persona muy agradable, tolerante y comprensiva para llegar a la conclusión de esta operación.",
    video: `${VIDEO_BASE}/testimonio-rosa.mp4`,
  },
  {
    initials: "AM",
    name: "Alfonso Mercado",
    role: "Inversionista",
    quote:
      "Recibir una renta fija es cómodo: no tener que lidiar con inquilinos ni con meses en que la propiedad no está ocupada. Para mí fue lo mejor.",
    video: `${VIDEO_BASE}/testimonio-alfonso.mp4`,
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

function Portrait({ person }: { person: Person }) {
  return (
    <div className="group h-full">
      <div className="relative aspect-[3/4] h-full overflow-hidden bg-[#041f49]">
        {person.image ? (
          <img
            src={person.image}
            alt={person.name}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_18%] transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#0a1628_0%,#041f49_55%,#1a3a6e_100%)]">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #c6a65a 0%, transparent 45%)" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-medium tracking-[.2em] text-[#c6a65a]/80 md:text-4xl">
                {initials(person.name)}
              </span>
            </div>
            <span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-[.22em] text-white/25">Foto</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041f49]/80 via-[#041f49]/25 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4">
          <p className="text-[15px] leading-tight tracking-[-.03em] text-white md:text-base">
            {person.name}
          </p>
          <p className="mt-1.5 text-[8px] font-bold uppercase tracking-[.18em] text-[#c6a65a] md:text-[9px]">{person.role}</p>
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

function TestimonialVideoModal({
  item,
  onClose,
}: {
  item: Testimonial;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#041f49]/88 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonio de ${item.name}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative w-full max-w-3xl overflow-hidden border border-white/15 bg-[#0a1628] shadow-[0_30px_80px_rgba(0,0,0,.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#c6a65a]">Ver testimonio</p>
            <p className="mt-1 text-sm tracking-[-.02em] text-white">{item.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-[#c6a65a]/50 hover:text-[#c6a65a]"
            aria-label="Cerrar video"
          >
            <X size={18} />
          </button>
        </div>
        <div className="aspect-video bg-black">
          <video
            key={item.video}
            src={item.video}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function QuienesSomos() {
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);

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
            className="mt-6 flex w-full max-w-[20.5rem] flex-col items-stretch gap-3 sm:mt-7 sm:max-w-md md:mt-8 md:max-w-none md:flex-row md:items-center md:justify-center md:gap-4"
          >
            <Link href="/contacto" className="w-full md:w-auto">
              <span className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#22c55e] px-5 py-3.5 text-center text-[10px] font-bold uppercase tracking-[.12em] text-white transition-colors hover:bg-[#16a34a] sm:gap-3 sm:px-8 sm:py-4 sm:text-[11px] sm:tracking-[.18em]">
                Quiero regenerar mi Ciudad <ArrowRight size={15} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/portafolio" className="w-full md:w-auto">
              <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/45 bg-black/25 px-5 py-3.5 text-center text-[10px] font-medium uppercase tracking-[.12em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[.18em]">
                <MapPin size={14} className="shrink-0" /> Proyecto activos
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#faf9f7] pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Reveal className="mb-10 md:mb-12">
            <h2 className="max-w-3xl text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.08] tracking-[-.03em] text-[#041f49]">
              El equipo que hace realidad cada{" "}
              <span className="text-[#c6a65a]">ZONA ZAIAH</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...founders, ...leadership, ...crew].map((person) => (
              <Reveal key={person.name}>
                <Portrait person={person} />
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
                  className={`group/card flex h-full flex-col border-white/12 py-8 md:border-r md:px-7 md:py-10 lg:px-9 ${
                    index === testimonials.length - 1 ? "md:border-r-0" : ""
                  } ${index > 0 ? "border-t md:border-t-0" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[10px] font-bold tracking-[.28em] text-[#c6a65a]/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveVideo(item)}
                      className="group inline-flex items-center gap-2.5 border border-[#c6a65a]/35 bg-white/[.03] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#c6a65a] transition-all duration-300 hover:border-[#c6a65a] hover:bg-[#c6a65a] hover:text-[#041f49]"
                      aria-label={`Ver video de ${item.name}`}
                    >
                      <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#c6a65a]/15 transition-colors group-hover:bg-[#041f49]/15">
                        <Play size={11} className="ml-0.5 fill-current" />
                      </span>
                      Ver video
                    </button>
                  </div>
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

      {activeVideo && (
        <TestimonialVideoModal item={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </main>
  );
}
