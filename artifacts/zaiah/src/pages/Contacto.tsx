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
  const [vis, setVis] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

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
    <main>
      <Toaster />

      {/* HERO */}
      <section
        className="relative pt-40 pb-20 md:pb-28"
        style={{ backgroundColor: "#00246B" }}
        data-testid="section-contact-hero"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#CAAA57 1px, transparent 1px), linear-gradient(90deg, #CAAA57 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.35em] uppercase mb-6">
              Contacto
            </p>
            <h1 className="text-white font-bold text-[2.6rem] md:text-[3.4rem] leading-[1.08] tracking-tight max-w-2xl mb-7">
              Construyamos el siguiente nodo urbano.
            </h1>
            <div className="w-10 h-px bg-[#CAAA57] mb-7" />
            <p className="text-white/50 text-base font-light max-w-md leading-relaxed">
              Si buscas conocer el modelo ZAIAH, explorar inversión, presentar un activo o generar una alianza estratégica, podemos iniciar una conversación.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT BODY */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#EFEEED" }}
        data-testid="section-contact-form"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left info */}
            <FadeIn className="lg:col-span-4">
              <div>
                <p className="text-[#CAAA57] text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                  Información de contacto
                </p>

                <div className="space-y-8 mb-12">
                  {[
                    { label: "Correo electrónico", val: "contacto@zaiah.mx", href: "mailto:contacto@zaiah.mx", testid: "link-contact-email" },
                    { label: "WhatsApp", val: "+52 55 0000 0000", href: "https://wa.me/525500000000", testid: "link-contact-whatsapp" },
                    { label: "Sede", val: "Ciudad de México", href: null, testid: null },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[#00246B] text-[10px] tracking-[0.2em] uppercase font-bold mb-2">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#00246B]/60 text-sm hover:text-[#CAAA57] transition-colors" data-testid={item.testid ?? undefined} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                          {item.val}
                        </a>
                      ) : (
                        <p className="text-[#00246B]/60 text-sm">{item.val}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#D5D3CE] pt-10">
                  <p className="text-[#00246B]/40 text-sm leading-relaxed mb-7">
                    Respondemos en un plazo de 48 horas hábiles. Para conversaciones urgentes, escríbenos directamente por WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/525500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-contact-whatsapp"
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#25D366] text-white text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1ebe5d] transition-colors"
                  >
                    {WA_ICON}
                    Hablar por WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={150} className="lg:col-span-8">
              <div className="bg-white p-10 md:p-14 border border-[#D5D3CE]/60">
                {submitted ? (
                  <div className="flex flex-col items-start justify-center py-20">
                    <div className="w-8 h-px bg-[#CAAA57] mb-8" />
                    <h3 className="text-[#00246B] font-bold text-2xl mb-4">Solicitud enviada</h3>
                    <p className="text-[#00246B]/55 text-sm leading-relaxed max-w-sm">
                      Hemos recibido tu mensaje. El equipo ZAIAH te contactará en las próximas 48 horas hábiles.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7" data-testid="form-contact">
                      <p className="text-[#00246B] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                        Datos de contacto
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="nombre" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#00246B] text-[10px] tracking-[0.18em] uppercase font-bold">Nombre *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Tu nombre completo"
                                className="border-0 border-b border-[#D5D3CE] bg-transparent focus-visible:ring-0 focus-visible:border-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/25 px-0"
                                data-testid="input-nombre" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="empresa" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#00246B] text-[10px] tracking-[0.18em] uppercase font-bold">Empresa</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Tu empresa u organización"
                                className="border-0 border-b border-[#D5D3CE] bg-transparent focus-visible:ring-0 focus-visible:border-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/25 px-0"
                                data-testid="input-empresa" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="correo" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#00246B] text-[10px] tracking-[0.18em] uppercase font-bold">Correo *</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="correo@ejemplo.com"
                                className="border-0 border-b border-[#D5D3CE] bg-transparent focus-visible:ring-0 focus-visible:border-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/25 px-0"
                                data-testid="input-correo" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="telefono" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#00246B] text-[10px] tracking-[0.18em] uppercase font-bold">Teléfono *</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" placeholder="+52 55 0000 0000"
                                className="border-0 border-b border-[#D5D3CE] bg-transparent focus-visible:ring-0 focus-visible:border-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/25 px-0"
                                data-testid="input-telefono" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="interes" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#00246B] text-[10px] tracking-[0.18em] uppercase font-bold">Tipo de interés *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-0 border-b border-[#D5D3CE] bg-transparent focus:ring-0 rounded-none text-[#00246B] px-0" data-testid="select-interes">
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
                          <FormLabel className="text-[#00246B] text-[10px] tracking-[0.18em] uppercase font-bold">Mensaje *</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Cuéntanos sobre tu interés, activo o proyecto..."
                              rows={4}
                              className="border-0 border-b border-[#D5D3CE] bg-transparent focus-visible:ring-0 focus-visible:border-[#00246B] rounded-none text-[#00246B] placeholder:text-[#00246B]/25 px-0 resize-none"
                              data-testid="textarea-mensaje" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full py-4 bg-[#00246B] text-white text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-[#CAAA57] hover:text-black transition-all duration-300 disabled:opacity-50"
                          disabled={form.formState.isSubmitting}
                          data-testid="button-submit"
                        >
                          Enviar solicitud
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
