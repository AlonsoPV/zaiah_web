import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/faq";
import hero from "@/assets/images/hero-day-4.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PreguntasFrecuentes() {
  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c]" data-testid="page-faq">
      <section className="relative overflow-hidden bg-[#0a1628] text-white">
        <motion.img
          src={hero}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,31,73,.75)_0%,rgba(4,31,73,.92)_100%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-32 text-center md:px-12 md:pb-20 md:pt-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-4 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#c6a65a]"
          >
            <span className="h-px w-9 bg-[#c6a65a]" /> Antes de invertir <span className="h-px w-9 bg-[#c6a65a]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-.03em]"
          >
            Preguntas frecuentes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            className="mx-auto mt-5 max-w-xl text-sm font-light leading-7 text-white/75 md:text-base"
          >
            Escrituras, rendimientos, administración y proceso notarial: respuestas claras antes de invertir con ZAIAH.
          </motion.p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="border-black/10"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium tracking-[-.02em] text-[#041f49] hover:no-underline hover:text-[#041f49] md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm font-light leading-7 text-black/60 md:text-[15px]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#f1efe9] py-14 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center md:px-12">
          <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-.03em] text-[#041f49]">
            ¿Listo para el siguiente paso?
          </h2>
          <p className="max-w-md text-sm font-light leading-7 text-black/60">
            Agenda una cita: revisamos tu perfil y te recomendamos el proyecto que mejor encaja.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contacto">
              <span className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#c6a65a] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:bg-[#041f49] hover:text-white">
                Agenda una cita <ArrowRight size={15} />
              </span>
            </Link>
            <Link href="/modelo">
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#041f49]/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#041f49] transition-colors hover:border-[#041f49]">
                Ver el modelo
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
