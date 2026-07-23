import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import heroImage from "@/assets/images/hero-bg.png";

const EASE = [0.22, 1, 0.36, 1] as const;

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const contactSchema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre completo"),
  empresa: z.string().optional(),
  correo: z.string().email("Ingresa un correo válido"),
  telefono: z.string().min(8, "Ingresa un número de teléfono válido"),
  interes: z.enum(["inversion", "alianza", "venta-activo", "proyecto-inmobiliario", "otro"], {
    required_error: "Selecciona un tipo de interés",
  }),
  mensaje: z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)"),
});

type ContactForm = z.infer<typeof contactSchema>;

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLElement>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { nombre: "", empresa: "", correo: "", telefono: "", mensaje: "" },
  });

  async function onSubmit(data: ContactForm) {
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json() as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error ?? "Error al enviar");
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 8000);
    } catch {
      toast({
        title: "Error al enviar",
        description: "Hubo un problema. Escríbenos directamente a mkt@zaiah.com.mx",
        variant: "destructive",
      });
    }
  }

  const interesOptions = [
    { value: "inversion", label: "Inversión" },
    { value: "alianza", label: "Alianza estratégica" },
    { value: "venta-activo", label: "Venta de activo" },
    { value: "proyecto-inmobiliario", label: "Proyecto inmobiliario" },
    { value: "otro", label: "Otro" },
  ];

  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c]">
      <Toaster />

      {/* HERO — homologado con inicio */}
      <section
        className="relative min-h-[92vh] overflow-hidden bg-[#0a1628] text-white"
        data-testid="section-contact-hero"
      >
        <motion.img
          src={heroImage}
          alt="Conversación patrimonial ZAIAH"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
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
            <span className="h-px w-9 bg-[#c6a65a]" /> Agenda una cita <span className="h-px w-9 bg-[#c6a65a]" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.22 }}
            className="text-[clamp(2.9rem,6.5vw,5.8rem)] font-medium leading-[1.05] tracking-[-.02em] text-white"
          >
            Empecemos por conocerte. <em className="font-serif font-normal italic">Lo demás viene después.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
            className="mt-7 max-w-xl text-sm font-light leading-7 text-white/75 md:text-base"
          >
            Si buscas comprar y delegar la operación, cuéntanos qué quieres proteger y qué te gustaría construir. Nosotros te explicamos con claridad cómo podemos acompañarte.
          </motion.p>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="mt-10 inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#c6a65a] px-8 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#041f49] transition-colors hover:bg-white"
          >
            Ir al formulario
          </motion.button>
        </div>
      </section>

      {/* CONTACT BODY */}
      <section
        ref={formRef}
        className="bg-[#faf9f7] py-12 md:py-16"
        data-testid="section-contact-form"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left info */}
            <FadeIn className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="mb-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.3em] text-[#c6a65a]">
                <span className="h-px w-9 bg-[#c6a65a]" /> Qué puedes esperar
              </p>
              <h2 className="text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.08] tracking-[-.03em] text-[#041f49]">
                Una conversación entre personas. Sin discursos de venta.
              </h2>
              <p className="mt-4 text-sm font-light leading-6 text-[#041f49]/60">
                Queremos escucharte, responder tus preguntas y entender si ZAIAH puede aportar a tus planes. Sin ejecutar remodelaciones, administrar rentas o perseguir inquilinos por tu cuenta.
              </p>

              <div className="mt-8 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { label: "Correo", val: "mkt@zaiah.com.mx", href: "mailto:mkt@zaiah.com.mx", testid: "link-contact-email" },
                  { label: "WhatsApp", val: "+52 55 5145 2047", href: "https://wa.me/5215551452047", testid: "link-contact-whatsapp" },
                  { label: "Sede", val: "Ciudad de México", href: null as string | null, testid: null as string | null },
                ].map((item) => (
                  <div key={item.label} className="border-b border-black/10 pb-4 last:border-0 last:pb-0 lg:border-b lg:pb-4 lg:last:border-b lg:last:pb-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-[#041f49]/45">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-[#041f49] transition-colors hover:text-[#c6a65a]"
                        data-testid={item.testid ?? undefined}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {item.val}
                      </a>
                    ) : (
                      <p className="text-sm text-[#041f49]">{item.val}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-black/10 pt-6">
                <p className="text-xs font-light leading-5 text-[#041f49]/45">
                  Te responderemos en un máximo de 48 horas hábiles. Si prefieres escribirnos directamente, estamos en WhatsApp.
                </p>
                <a
                  href="https://wa.me/5215551452047"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-contact-whatsapp"
                  className="inline-flex w-fit items-center gap-2.5 bg-[#25D366] px-5 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-white transition-colors hover:bg-[#1ebe5d]"
                >
                  {WA_ICON}
                  Hablar por WhatsApp
                </a>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={120} className="lg:col-span-8">
              <div className="border border-black/10 bg-white p-6 md:p-10">
                {submitted ? (
                  <div className="flex flex-col items-start py-10">
                    <div className="mb-6 h-px w-8 bg-[#c6a65a]" />
                    <h3 className="mb-3 text-2xl text-[#041f49]">Solicitud enviada</h3>
                    <p className="max-w-sm text-sm font-light leading-6 text-[#041f49]/55">
                      Hemos recibido tu mensaje. El equipo ZAIAH te contactará en las próximas 48 horas hábiles.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#041f49]">
                        Cuéntanos un poco de ti
                      </p>
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <FormField control={form.control} name="nombre" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[.18em] text-[#041f49]">Nombre *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Tu nombre completo"
                                className="rounded-none border-0 border-b border-[#d9d6cf] bg-transparent px-0 text-[#041f49] placeholder:text-[#041f49]/25 focus-visible:border-[#041f49] focus-visible:ring-0"
                                data-testid="input-nombre" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="empresa" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[.18em] text-[#041f49]">Empresa</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Tu empresa u organización"
                                className="rounded-none border-0 border-b border-[#d9d6cf] bg-transparent px-0 text-[#041f49] placeholder:text-[#041f49]/25 focus-visible:border-[#041f49] focus-visible:ring-0"
                                data-testid="input-empresa" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <FormField control={form.control} name="correo" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[.18em] text-[#041f49]">Correo *</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="correo@ejemplo.com"
                                className="rounded-none border-0 border-b border-[#d9d6cf] bg-transparent px-0 text-[#041f49] placeholder:text-[#041f49]/25 focus-visible:border-[#041f49] focus-visible:ring-0"
                                data-testid="input-correo" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="telefono" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[.18em] text-[#041f49]">Teléfono *</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" placeholder="+52 55 0000 0000"
                                className="rounded-none border-0 border-b border-[#d9d6cf] bg-transparent px-0 text-[#041f49] placeholder:text-[#041f49]/25 focus-visible:border-[#041f49] focus-visible:ring-0"
                                data-testid="input-telefono" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="interes" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-[.18em] text-[#041f49]">Tipo de interés *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none border-0 border-b border-[#d9d6cf] bg-transparent px-0 text-[#041f49] focus:ring-0" data-testid="select-interes">
                                <SelectValue placeholder="Selecciona una opción" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {interesOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="mensaje" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-[.18em] text-[#041f49]">Mensaje *</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="¿Qué estás buscando y cómo podemos ayudarte?"
                              rows={3}
                              className="resize-none rounded-none border-0 border-b border-[#d9d6cf] bg-transparent px-0 text-[#041f49] placeholder:text-[#041f49]/25 focus-visible:border-[#041f49] focus-visible:ring-0"
                              data-testid="textarea-mensaje" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-[#041f49] py-4 text-[11px] font-bold uppercase tracking-[.22em] text-white transition-all duration-300 hover:bg-[#c6a65a] hover:text-[#041f49] disabled:opacity-50"
                          disabled={form.formState.isSubmitting}
                          data-testid="button-submit"
                        >
                          Quiero conversar con ZAIAH
                        </button>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
