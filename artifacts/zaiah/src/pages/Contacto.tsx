import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

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
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
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

export default function Contacto() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: "",
      empresa: "",
      correo: "",
      telefono: "",
      mensaje: "",
    },
  });

  function onSubmit(_data: ContactForm) {
    setSubmitted(true);
    toast({
      title: "Solicitud enviada",
      description: "Hemos recibido tu mensaje. El equipo ZAIAH te contactará pronto.",
    });
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  }

  const interesOptions = [
    { value: "inversion", label: "Inversión" },
    { value: "alianza", label: "Alianza estratégica" },
    { value: "venta-activo", label: "Venta de activo" },
    { value: "proyecto-inmobiliario", label: "Proyecto inmobiliario" },
    { value: "otro", label: "Otro" },
  ];

  return (
    <main>
      <Toaster />
      {/* HERO */}
      <section
        className="relative pt-44 pb-28 md:pb-40"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-contact-hero"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(202,170,87,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(202,170,87,0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-6">
              Contacto
            </p>
            <h1 className="text-white font-bold text-5xl md:text-7xl leading-tight tracking-tight max-w-4xl mb-8">
              Construyamos el siguiente<br />
              <span className="text-[#CAAA57]">nodo urbano.</span>
            </h1>
            <p className="text-white/50 text-lg font-light max-w-2xl leading-relaxed">
              Si buscas conocer el modelo ZAIAH, explorar inversión, presentar un activo o generar una alianza estratégica, podemos iniciar una conversación.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-contact-form"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
            {/* Left info */}
            <FadeIn className="lg:col-span-2">
              <div>
                <p className="text-[#CAAA57] text-xs tracking-[0.3em] uppercase font-semibold mb-8">
                  Información de contacto
                </p>
                <div className="space-y-8">
                  <div>
                    <p className="text-[#00246B] text-xs tracking-[0.15em] uppercase font-semibold mb-2">
                      Correo electrónico
                    </p>
                    <a
                      href="mailto:contacto@zaiah.mx"
                      className="text-[#00246B]/70 text-base hover:text-[#CAAA57] transition-colors"
                      data-testid="link-contact-email"
                    >
                      contacto@zaiah.mx
                    </a>
                  </div>
                  <div>
                    <p className="text-[#00246B] text-xs tracking-[0.15em] uppercase font-semibold mb-2">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/525500000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00246B]/70 text-base hover:text-[#CAAA57] transition-colors"
                      data-testid="link-contact-whatsapp"
                    >
                      +52 55 0000 0000
                    </a>
                  </div>
                  <div>
                    <p className="text-[#00246B] text-xs tracking-[0.15em] uppercase font-semibold mb-2">
                      Sede
                    </p>
                    <p className="text-[#00246B]/70 text-base">Ciudad de México</p>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-[#D5D3CE]">
                  <p className="text-[#00246B]/50 text-sm leading-relaxed mb-8">
                    Respondemos en un plazo de 48 horas hábiles. Para conversaciones urgentes, contáctanos directamente por WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/525500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-contact-whatsapp"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#1ebe5d] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    Hablar por WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={200} className="lg:col-span-3">
              <div className="bg-white p-10 md:p-14">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-12 h-px bg-[#CAAA57] mb-8" />
                    <h3 className="text-[#00246B] font-bold text-2xl mb-4">Solicitud enviada</h3>
                    <p className="text-[#00246B]/60 text-sm leading-relaxed">
                      Hemos recibido tu mensaje. El equipo ZAIAH te contactará pronto.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" data-testid="form-contact">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="nombre"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#00246B] text-xs tracking-[0.15em] uppercase font-semibold">
                                Nombre *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Tu nombre completo"
                                  className="border-[#D5D3CE] bg-transparent focus-visible:ring-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/30"
                                  data-testid="input-nombre"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="empresa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#00246B] text-xs tracking-[0.15em] uppercase font-semibold">
                                Empresa
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Tu empresa u organización"
                                  className="border-[#D5D3CE] bg-transparent focus-visible:ring-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/30"
                                  data-testid="input-empresa"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="correo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#00246B] text-xs tracking-[0.15em] uppercase font-semibold">
                                Correo electrónico *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="correo@ejemplo.com"
                                  className="border-[#D5D3CE] bg-transparent focus-visible:ring-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/30"
                                  data-testid="input-correo"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="telefono"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#00246B] text-xs tracking-[0.15em] uppercase font-semibold">
                                Teléfono *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="+52 55 0000 0000"
                                  className="border-[#D5D3CE] bg-transparent focus-visible:ring-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/30"
                                  data-testid="input-telefono"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="interes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#00246B] text-xs tracking-[0.15em] uppercase font-semibold">
                              Tipo de interés *
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger
                                  className="border-[#D5D3CE] bg-transparent focus:ring-[#00246B] rounded-none text-[#00246B]"
                                  data-testid="select-interes"
                                >
                                  <SelectValue placeholder="Selecciona una opción" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {interesOptions.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mensaje"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#00246B] text-xs tracking-[0.15em] uppercase font-semibold">
                              Mensaje *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Cuéntanos sobre tu interés, activo o proyecto..."
                                rows={5}
                                className="border-[#D5D3CE] bg-transparent focus-visible:ring-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/30 resize-none"
                                data-testid="textarea-mensaje"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <button
                        type="submit"
                        className="w-full py-4 bg-[#00246B] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#CAAA57] hover:text-black transition-all duration-300 disabled:opacity-50"
                        disabled={form.formState.isSubmitting}
                        data-testid="button-submit"
                      >
                        Enviar solicitud
                      </button>
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
