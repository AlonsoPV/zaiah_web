import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/images/hero-day-4.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

export default function Gracias() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a1628] text-white" data-testid="page-gracias">
      <motion.img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: EASE }}
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.55)_0%,rgba(0,0,0,.2)_40%,rgba(4,31,73,.78)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-28 text-center sm:px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a] md:mb-6"
        >
          <span className="h-px w-9 bg-[#c6a65a]" /> Solicitud recibida <span className="h-px w-9 bg-[#c6a65a]" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.22 }}
          className="max-w-3xl text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.05] tracking-[-.03em]"
        >
          Gracias. <em className="font-serif font-normal italic text-[#c6a65a]">Ya dimos el primer paso.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="mt-6 max-w-lg text-sm font-light leading-7 text-white/75 md:mt-7 md:text-base"
        >
          Hemos recibido tu mensaje. El equipo ZAIAH te contactará en un máximo de 48 horas hábiles para continuar la conversación.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          className="mt-9 flex w-full max-w-[20.5rem] flex-col items-stretch gap-3 sm:mt-10 sm:max-w-md md:max-w-none md:flex-row md:items-center md:justify-center md:gap-4"
        >
          <Link href="/" className="w-full md:w-auto">
            <span className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#c6a65a] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#041f49] transition-colors hover:bg-white sm:gap-3 sm:px-8 sm:py-4 sm:text-[11px] sm:tracking-[.18em]">
              Volver al inicio <ArrowRight size={15} className="shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link href="/portafolio" className="w-full md:w-auto">
            <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/45 bg-black/25 px-5 py-3.5 text-[10px] font-medium uppercase tracking-[.12em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[.18em]">
              Ver portafolio
            </span>
          </Link>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          href="https://wa.me/5215570759959"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[.18em] text-white/70 transition-colors hover:text-[#25D366]"
        >
          {WA_ICON}
          ¿Prefieres WhatsApp?
        </motion.a>
      </div>
    </main>
  );
}
