export type PageMeta = {
  title: string;
  description: string;
  keywords?: string;
};

/** Meta del sitio (fallback / OG base). */
export const siteMeta: PageMeta = {
  title: "ZAIAH | Regeneración urbana e inversión patrimonial en CDMX",
  description:
    "ZAIAH regenera inmuebles estratégicos en CDMX. Invierte con triple impacto, escrituras y operación profesional. Descubre el modelo y agenda una cita.",
  keywords:
    "ZAIAH, regeneración urbana CDMX, inversión inmobiliaria, Zonas Zaiah, patrimonio con escrituras, renta pasiva, certeza jurídica, invertir en CDMX",
};

export const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "ZAIAH | Invierte en regeneración urbana en CDMX",
    description:
      "Invierte en Zonas Zaiah: regenera edificios en CDMX, genera patrimonio con escrituras y renta con certeza jurídica. Agenda tu cita hoy.",
    keywords:
      "invertir en CDMX, Zonas Zaiah, regeneración urbana, patrimonio inmobiliario, escrituras, renta pasiva, inversión con propósito, agenda una cita",
  },
  "/quienes-somos": {
    title: "Quiénes somos | Equipo ZAIAH de regeneración urbana",
    description:
      "Conoce al equipo ZAIAH que regenera la ciudad: founders, liderazgo y operación para invertir con propósito y certeza jurídica en CDMX.",
    keywords:
      "equipo ZAIAH, quiénes somos, regeneración urbana CDMX, founders ZAIAH, inversión con propósito, comunidad de inversionistas",
  },
  "/modelo": {
    title: "Modelo ZAIAH | Zonas Zaiah y triple impacto",
    description:
      "Conoce el modelo ZAIAH: compra progresiva de edificios, Zonas Zaiah y triple impacto. Patrimonio estructurado con certeza jurídica.",
  },
  "/portafolio": {
    title: "Portafolio ZAIAH | Proyectos activos en CDMX",
    description:
      "Revisa proyectos activos de ZAIAH en CDMX. Invierte en regeneración urbana con operación profesional y horizonte de rentabilidad.",
  },
  "/contacto": {
    title: "Contacto ZAIAH | Agenda una cita de inversión",
    description:
      "Agenda una cita con ZAIAH. Analizamos tu perfil y te acompañamos a invertir en regeneración urbana en CDMX con claridad y certeza.",
  },
  "/aviso-de-privacidad": {
    title: "Aviso de privacidad | ZAIAH",
    description:
      "Consulta el Aviso de Privacidad y Confidencialidad de Documentos de ZAIAH sobre el tratamiento de datos personales.",
  },
};

export function metaForPath(path: string): PageMeta {
  const normalized = path.replace(/\/$/, "") || "/";
  return pageMeta[normalized] ?? siteMeta;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function applyPageMeta(meta: PageMeta) {
  document.title = meta.title;
  upsertMeta("name", "description", meta.description);
  if (meta.keywords) upsertMeta("name", "keywords", meta.keywords);
  upsertMeta("property", "og:title", meta.title);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("name", "twitter:title", meta.title);
  upsertMeta("name", "twitter:description", meta.description);
}
