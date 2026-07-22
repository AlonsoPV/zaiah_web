import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/images/hero-bg.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const links = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/modelo", label: "Modelo" },
  { href: "/portafolio", label: "Portafolio" },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a1628] text-white">
      <motion.img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.55)_0%,rgba(0,0,0,.2)_45%,rgba(4,31,73,.75)_100%)]" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] flex justify-center select-none md:top-[12%]"
      >
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="text-[clamp(7rem,28vw,16rem)] font-bold leading-none tracking-[-.06em] text-white/30"
        >
          404
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a]"
        >
          <span className="h-px w-9 bg-[#c6a65a]" /> Página no encontrada <span className="h-px w-9 bg-[#c6a65a]" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.22 }}
          style={{ fontFamily: "var(--app-font-serif)" }}
          className="max-w-3xl text-[clamp(2.8rem,6vw,5.2rem)] font-normal leading-[1.05] tracking-[-.02em]"
        >
          Esta ruta no existe. <em className="italic">La ciudad, sí.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="mt-7 max-w-lg text-sm font-light leading-7 text-white/70 md:text-base"
        >
          El destino que buscas no está en el mapa. Volvamos a un territorio que sí conocemos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/">
            <span className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#c6a65a] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:bg-white">
              Volver al inicio <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link href="/contacto">
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/45 bg-black/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10">
              Agendar una cita
            </span>
          </Link>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.75 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/15 pt-8"
          aria-label="Navegación sugerida"
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="cursor-pointer text-[10px] font-bold uppercase tracking-[.22em] text-white/45 transition-colors hover:text-[#c6a65a]">
                {link.label}
              </span>
            </Link>
          ))}
        </motion.nav>
      </div>
    </main>
  );
}
