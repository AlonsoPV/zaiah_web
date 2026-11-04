import { SITE_URL } from "@/lib/seo";

export type FaqItem = {
  question: string;
  answer: string;
};

/** Preguntas frecuentes alineadas al brief SEO (recorridos reales). */
export const faqItems: FaqItem[] = [
  {
    question: "¿Recibo escrituras a mi nombre?",
    answer:
      "Sí. Cada inversión se documenta ante notario y recibes escrituras a tu nombre. El proceso notarial forma parte del modelo ZAIAH desde la firma hasta la entrega.",
  },
  {
    question: "¿Qué rendimientos puedo esperar?",
    answer:
      "Depende del proyecto y del momento de entrada. En Zaiah Health, por ejemplo, la rentabilidad estimada parte de alrededor del 9% anual sobre la operación administrada. En la cita revisamos números actualizados de preventa y escenarios de renta.",
  },
  {
    question: "¿Quién administra el inmueble?",
    answer:
      "ZAIAH (o un operador especializado del proyecto) se encarga de la administración: ocupación, mantenimiento y relación con inquilinos. Tú inviertes; no operas el día a día.",
  },
  {
    question: "¿Cuáles son los plazos típicos?",
    answer:
      "Desde la primera conversación hasta la escritura suelen pasar semanas, según disponibilidad de unidades y agenda notarial. En preventa hay un calendario de avances de obra y entregas que te compartimos en la cita.",
  },
  {
    question: "¿Hay enganche o formas de pago?",
    answer:
      "Sí. Cada proyecto define esquemas de enganche y parcialidades. Te presentamos el plan de pagos vigente y qué documentos necesitas para avanzar.",
  },
  {
    question: "¿Qué gastos notariales y de cierre debo considerar?",
    answer:
      "Además del precio de la unidad, existen honorarios notariales, impuestos y gastos de registro. En la cita te entregamos un desglose estimado para que no haya sorpresas.",
  },
  {
    question: "¿Puedo invertir desde fuera de CDMX o del país?",
    answer:
      "Sí. Muchas operaciones se cierran de forma remota con acompañamiento del equipo y, cuando aplica, poderes o videollamadas con notaría. Validamos el caso en la reunión inicial.",
  },
  {
    question: "¿Qué diferencia a ZAIAH de comprar un depto tradicional?",
    answer:
      "No vendemos metros sueltos: regeneramos edificios completos dentro de Zonas Zaiah, con operación profesional y una tesis de patrimonio a largo plazo. El objetivo es renta y plusvalía con menos fricción operativa para ti.",
  },
  {
    question: "¿Qué pasó con Edison 58?",
    answer:
      "Edison 58 en Tabacalera es un caso de éxito: lo adquirimos, regeneramos y vendimos. Sirve como prueba del modelo. Hoy el proyecto activo para invertir es Zaiah Health.",
  },
  {
    question: "¿Cómo agenda una cita?",
    answer:
      "En /contacto dejas tu nombre, WhatsApp e interés. El equipo te responde en un máximo de 48 horas hábiles para revisar tu perfil y proponerte el siguiente paso.",
  },
];

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: `${SITE_URL}/preguntas-frecuentes`,
  };
}
