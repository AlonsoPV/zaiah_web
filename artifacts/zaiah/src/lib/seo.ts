export const SITE_URL = "https://zaiah.com.mx";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.webp`;

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
};

/** Meta del sitio (fallback / OG base). */
export const siteMeta: PageMeta = {
  title: "Inversión inmobiliaria con escrituras en CDMX | ZAIAH",
  description:
    "Invierte en inmuebles regenerados en CDMX con escrituras, operación profesional y renta pasiva. Conoce el modelo ZAIAH y agenda una cita.",
  path: "/",
};

export const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "Inversión inmobiliaria con escrituras en CDMX | ZAIAH",
    description:
      "Invierte en inmuebles regenerados en CDMX con escrituras, operación profesional y renta pasiva. Conoce el modelo ZAIAH y agenda una cita.",
    path: "/",
  },
  "/modelo": {
    title: "Cómo invertir en inmuebles regenerados | Modelo ZAIAH",
    description:
      "Compramos edificios completos, los regeneramos y tú inviertes con escrituras y administración incluida. Así funciona el modelo ZAIAH.",
    path: "/modelo",
  },
  "/portafolio": {
    title: "Proyectos de inversión inmobiliaria en CDMX | ZAIAH",
    description:
      "Conoce el proyecto activo de ZAIAH y nuestros casos de éxito en CDMX. Inmuebles regenerados con escrituras y renta administrada.",
    path: "/portafolio",
  },
  "/quienes-somos": {
    title: "Quiénes somos: equipo de inversión inmobiliaria | ZAIAH",
    description:
      "10 años regenerando inmuebles en CDMX. Conoce al equipo y a los asesores que acompañan a +30 inversionistas.",
    path: "/quienes-somos",
  },
  "/contacto": {
    title: "Agenda una cita de inversión inmobiliaria | ZAIAH",
    description:
      "Agenda una reunión virtual: analizamos tu perfil y te recomendamos el proyecto que mejor encaja con tus objetivos.",
    path: "/contacto",
  },
  "/gracias": {
    title: "Gracias | Solicitud recibida · ZAIAH",
    description:
      "Hemos recibido tu mensaje. El equipo ZAIAH te contactará en un máximo de 48 horas hábiles.",
    path: "/gracias",
    noindex: true,
  },
  "/aviso-de-privacidad": {
    title: "Aviso de privacidad | ZAIAH",
    description:
      "Consulta el Aviso de Privacidad y Confidencialidad de Documentos de ZAIAH sobre el tratamiento de datos personales.",
    path: "/aviso-de-privacidad",
  },
};

/** Public routes included in sitemap (excludes gracias). */
export const sitemapPaths = [
  "/",
  "/modelo",
  "/portafolio",
  "/quienes-somos",
  "/contacto",
  "/aviso-de-privacidad",
] as const;

export function normalizePath(path: string): string {
  const clean = path.split("?")[0]?.split("#")[0] ?? "/";
  return clean.replace(/\/$/, "") || "/";
}

export function metaForPath(path: string): PageMeta {
  const normalized = normalizePath(path);
  return pageMeta[normalized] ?? { ...siteMeta, path: normalized };
}

export function absoluteUrl(path: string): string {
  const normalized = normalizePath(path);
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
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

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removeMeta(attr: "name" | "property", key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

export function applyPageMeta(meta: PageMeta) {
  const url = absoluteUrl(meta.path);
  const image = meta.ogImage ?? DEFAULT_OG_IMAGE;

  document.title = meta.title;
  upsertMeta("name", "description", meta.description);
  removeMeta("name", "keywords");

  if (meta.noindex) {
    upsertMeta("name", "robots", "noindex, nofollow");
  } else {
    removeMeta("name", "robots");
  }

  upsertLink("canonical", url);

  upsertMeta("property", "og:title", meta.title);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:locale", "es_MX");
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:site_name", "ZAIAH");

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", meta.title);
  upsertMeta("name", "twitter:description", meta.description);
  upsertMeta("name", "twitter:image", image);
}

export function upsertJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "ZAIAH",
        url: SITE_URL,
        logo: `${SITE_URL}/logo-zaiah.png`,
        email: "alexis.marin@zaiah.com.mx",
        telephone: "+52-1-55-7075-9959",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ciudad de México",
          addressCountry: "MX",
        },
        sameAs: ["https://wa.me/5215570759959"],
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}/#realestate`,
        name: "ZAIAH",
        url: SITE_URL,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "City",
          name: "Ciudad de México",
        },
        description:
          "Regeneración urbana e inversión inmobiliaria con escrituras y operación profesional en CDMX.",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
