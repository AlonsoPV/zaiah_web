import { createServer } from "node:http";
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist/public");
const require = createRequire(import.meta.url);
const SITE_URL = "https://zaiah.com.mx";

/** Normalize Vite BASE_PATH to a leading slash, no trailing slash ("" for root). */
function normalizeBase(raw) {
  if (!raw || raw === "/") return "";
  return `/${String(raw).replace(/^\/+|\/+$/g, "")}`;
}

const BASE = normalizeBase(process.env.BASE_PATH || "/");

const ROUTES = [
  "/",
  "/modelo",
  "/portafolio",
  "/zaiah-health",
  "/casos-de-exito/edison-58",
  "/preguntas-frecuentes",
  "/quienes-somos",
  "/contacto",
  "/gracias",
  "/aviso-de-privacidad",
  "/__404__",
];

const META = {
  "/": {
    title: "Inversión inmobiliaria con escrituras en CDMX | ZAIAH",
    description:
      "Invierte en inmuebles regenerados en CDMX con escrituras, operación profesional y renta pasiva. Conoce el modelo ZAIAH y agenda una cita.",
    h1: "Inversión inmobiliaria con escrituras en CDMX",
    ogImage: `${SITE_URL}/og-home.webp`,
    crumb: null,
  },
  "/modelo": {
    title: "Cómo invertir en inmuebles regenerados | Modelo ZAIAH",
    description:
      "Compramos edificios completos, los regeneramos y tú inviertes con escrituras y administración incluida. Así funciona el modelo ZAIAH.",
    h1: "Cómo funciona invertir con ZAIAH",
    ogImage: `${SITE_URL}/og-modelo.webp`,
    crumb: "Modelo",
  },
  "/portafolio": {
    title: "Proyectos de inversión inmobiliaria en CDMX | ZAIAH",
    description:
      "Conoce el proyecto activo de ZAIAH y nuestros casos de éxito en CDMX. Inmuebles regenerados con escrituras y renta administrada.",
    h1: "Proyectos de inversión inmobiliaria en CDMX",
    ogImage: `${SITE_URL}/og-portafolio.webp`,
    crumb: "Proyectos",
  },
  "/zaiah-health": {
    title: "Consultorios en venta para rentar en CDMX | Zaiah Health",
    description:
      "Invierte en consultorios a 5 min del WTC con escrituras y renta administrada por ZAIAH. Agenda un recorrido.",
    h1: "Consultorios en venta para inversión en CDMX",
    ogImage: `${SITE_URL}/og-zaiah-health.webp`,
    crumb: "Zaiah Health",
  },
  "/casos-de-exito/edison-58": {
    title: "Edison 58, Tabacalera: caso de regeneración | ZAIAH",
    description: "Cómo ZAIAH adquirió, regeneró y vendió Edison 58 en la Tabacalera, CDMX.",
    h1: "Edison 58: de edificio histórico a inversión vendida",
    ogImage: `${SITE_URL}/og-edison-58.webp`,
    crumb: "Edison 58",
  },
  "/preguntas-frecuentes": {
    title: "Preguntas frecuentes sobre invertir con ZAIAH",
    description:
      "Escrituras, rendimientos, administración y proceso notarial: respuestas claras antes de invertir.",
    h1: "Preguntas frecuentes",
    ogImage: `${SITE_URL}/og-faq.webp`,
    crumb: "Preguntas frecuentes",
  },
  "/quienes-somos": {
    title: "Quiénes somos: equipo de inversión inmobiliaria | ZAIAH",
    description:
      "10 años regenerando inmuebles en CDMX. Conoce al equipo y a los asesores que acompañan a +30 inversionistas.",
    h1: "Equipo ZAIAH: 10 años regenerando inmuebles en CDMX",
    ogImage: `${SITE_URL}/og-quienes-somos.webp`,
    crumb: "Nosotros",
  },
  "/contacto": {
    title: "Agenda una cita de inversión inmobiliaria | ZAIAH",
    description:
      "Agenda una reunión virtual: analizamos tu perfil y te recomendamos el proyecto que mejor encaja con tus objetivos.",
    h1: "Agenda tu cita de inversión",
    ogImage: `${SITE_URL}/og-contacto.webp`,
    crumb: "Agenda una cita",
  },
  "/gracias": {
    title: "Gracias | Solicitud recibida · ZAIAH",
    description:
      "Hemos recibido tu mensaje. El equipo ZAIAH te contactará en un máximo de 48 horas hábiles.",
    h1: "Gracias. Ya dimos el primer paso.",
    ogImage: `${SITE_URL}/og-default.webp`,
    crumb: "Gracias",
    noindex: true,
  },
  "/aviso-de-privacidad": {
    title: "Aviso de privacidad | ZAIAH",
    description:
      "Consulta el Aviso de Privacidad y Confidencialidad de Documentos de ZAIAH sobre el tratamiento de datos personales.",
    h1: "Aviso de privacidad",
    ogImage: `${SITE_URL}/og-default.webp`,
    crumb: "Aviso de privacidad",
  },
  "/__404__": {
    title: "Página no encontrada | ZAIAH",
    description: "La ruta que buscas no existe. Vuelve al inicio de ZAIAH.",
    h1: "Página no encontrada",
    ogImage: `${SITE_URL}/og-default.webp`,
    crumb: null,
  },
};

function organizationJsonLd() {
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
        areaServed: { "@type": "City", name: "Ciudad de México" },
        description:
          "Regeneración urbana e inversión inmobiliaria con escrituras y operación profesional en CDMX.",
      },
    ],
  };
}

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

/** Minimal FAQ schema for static HTML (mirrors src/lib/faq.ts). */
function faqPageJsonLd() {
  const questions = [
    ["¿Recibo escrituras a mi nombre?", "Sí. Cada inversión se documenta ante notario y recibes escrituras a tu nombre."],
    ["¿Qué rendimientos puedo esperar?", "Depende del proyecto. En Zaiah Health la rentabilidad estimada parte de alrededor del 9% anual."],
    ["¿Quién administra el inmueble?", "ZAIAH o un operador especializado se encarga de la administración del día a día."],
    ["¿Cuáles son los plazos típicos?", "Desde la primera conversación hasta la escritura suelen pasar semanas, según unidades y notaría."],
    ["¿Hay enganche o formas de pago?", "Sí. Cada proyecto define esquemas de enganche y parcialidades."],
    ["¿Qué gastos notariales debo considerar?", "Además del precio hay honorarios notariales, impuestos y registro; te damos un desglose estimado."],
    ["¿Puedo invertir desde fuera de CDMX?", "Sí. Muchas operaciones se cierran de forma remota con acompañamiento del equipo."],
    ["¿Qué diferencia a ZAIAH de un depto tradicional?", "Regeneramos edificios completos con operación profesional y tesis de patrimonio a largo plazo."],
    ["¿Qué pasó con Edison 58?", "Es un caso de éxito: lo adquirimos, regeneramos y vendimos. Hoy el proyecto activo es Zaiah Health."],
    ["¿Cómo agenda una cita?", "En /contacto dejas nombre, WhatsApp e interés; respondemos en máximo 48 horas hábiles."],
  ];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
    url: `${SITE_URL}/preguntas-frecuentes`,
  };
}

function breadcrumbsForRoute(route) {
  if (route === "/zaiah-health") {
    return [
      { name: "Inicio", path: "/" },
      { name: "Proyectos", path: "/portafolio" },
      { name: "Zaiah Health", path: "/zaiah-health" },
    ];
  }
  if (route === "/casos-de-exito/edison-58") {
    return [
      { name: "Inicio", path: "/" },
      { name: "Casos de éxito", path: "/portafolio" },
      { name: "Edison 58", path: "/casos-de-exito/edison-58" },
    ];
  }
  const meta = META[route];
  if (!meta?.crumb) return null;
  return [
    { name: "Inicio", path: "/" },
    { name: meta.crumb, path: route },
  ];
}

/** @returns {{ id: string, data: object }[] | null} */
function jsonLdBlocksForRoute(route) {
  if (route === "/") {
    return [{ id: "zaiah-jsonld-org", data: organizationJsonLd() }];
  }
  if (route === "/__404__") return null;

  const blocks = [];
  if (route === "/preguntas-frecuentes") {
    blocks.push({ id: "zaiah-jsonld-faq", data: faqPageJsonLd() });
  }
  const crumbs = breadcrumbsForRoute(route);
  if (crumbs) {
    blocks.push({ id: "zaiah-jsonld-breadcrumb", data: breadcrumbJsonLd(crumbs) });
  }
  return blocks.length ? blocks : null;
}

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".woff2")) return "font/woff2";
  if (filePath.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (filePath.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (filePath.endsWith(".mp4")) return "video/mp4";
  return "application/octet-stream";
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url || "/", "http://127.0.0.1");
        let pathname = decodeURIComponent(url.pathname);

        // Strip Vite base so assets resolve under dist/public.
        if (BASE && (pathname === BASE || pathname.startsWith(`${BASE}/`))) {
          pathname = pathname.slice(BASE.length) || "/";
        }

        if (pathname === "/") pathname = "/index.html";
        const filePath = path.join(dist, pathname.replace(/^\//, ""));
        if (await exists(filePath)) {
          const data = await readFile(filePath);
          res.writeHead(200, { "Content-Type": contentType(filePath) });
          res.end(data);
          return;
        }
        const indexHtml = await readFile(path.join(dist, "index.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(indexHtml);
      } catch {
        res.writeHead(500);
        res.end("error");
      }
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function injectMeta(html, route) {
  const meta = META[route] ?? META["/"];
  const publicPath = route === "/__404__" ? "/404" : route;
  const canonical = publicPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${publicPath}`;
  const ogImage = meta.ogImage || `${SITE_URL}/og-default.webp`;
  const jsonLdBlocks = jsonLdBlocksForRoute(route);

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );

  if (meta.noindex) {
    if (/name="robots"/i.test(out)) {
      out = out.replace(
        /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="robots" content="noindex, nofollow" />`,
      );
    } else {
      out = out.replace("</head>", `    <meta name="robots" content="noindex, nofollow" />\n  </head>`);
    }
  }

  if (/rel="canonical"/.test(out)) {
    out = out.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonical}" />`,
    );
  } else {
    out = out.replace("</head>", `    <link rel="canonical" href="${canonical}" />\n  </head>`);
  }

  out = out.replace(
    /property="og:title"\s+content="[^"]*"/i,
    `property="og:title" content="${escapeHtml(meta.title)}"`,
  );
  out = out.replace(
    /property="og:description"\s+content="[^"]*"/i,
    `property="og:description" content="${escapeHtml(meta.description)}"`,
  );
  out = out.replace(/property="og:url"\s+content="[^"]*"/i, `property="og:url" content="${canonical}"`);
  out = out.replace(
    /property="og:image"\s+content="[^"]*"/i,
    `property="og:image" content="${ogImage}"`,
  );
  out = out.replace(
    /name="twitter:title"\s+content="[^"]*"/i,
    `name="twitter:title" content="${escapeHtml(meta.title)}"`,
  );
  out = out.replace(
    /name="twitter:description"\s+content="[^"]*"/i,
    `name="twitter:description" content="${escapeHtml(meta.description)}"`,
  );
  out = out.replace(
    /name="twitter:image"\s+content="[^"]*"/i,
    `name="twitter:image" content="${ogImage}"`,
  );

  // Drop any client-injected JSON-LD, then re-add the correct blocks for this route.
  out = out.replace(/<script[^>]*id="zaiah-jsonld-[^"]*"[^>]*>[\s\S]*?<\/script>/gi, "");
  if (jsonLdBlocks) {
    const tags = jsonLdBlocks
      .map(
        ({ id, data }) =>
          `<script id="${id}" type="application/ld+json">${JSON.stringify(data)}</script>`,
      )
      .join("\n    ");
    out = out.replace("</head>", `    ${tags}\n  </head>`);
  }

  return out;
}

/** Fallback when Chromium is unavailable: meta + JSON-LD + crawlable noscript body. */
function injectFallbackBody(html, route) {
  const meta = META[route] ?? META["/"];
  const noscript = `<noscript>
  <main>
    <h1>${escapeHtml(meta.h1)}</h1>
    <p>${escapeHtml(meta.description)}</p>
    <p><a href="${SITE_URL}/">ZAIAH</a> · regeneración urbana e inversión inmobiliaria en CDMX.</p>
  </main>
</noscript>`;

  let out = html;
  if (!/<noscript>/i.test(out)) {
    out = out.replace(/<div id="root"><\/div>/i, `<div id="root"></div>\n    ${noscript}`);
  }
  return out;
}

async function writeRouteHtml(route, html) {
  if (route === "/") {
    await writeFile(path.join(dist, "index.html"), html, "utf8");
  } else if (route === "/__404__") {
    await writeFile(path.join(dist, "404.html"), html, "utf8");
  } else {
    const dir = path.join(dist, route.replace(/^\//, ""));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), html, "utf8");
  }
}

async function loadPuppeteer() {
  try {
    return require("puppeteer");
  } catch {
    try {
      return require("puppeteer-core");
    } catch {
      return null;
    }
  }
}

async function prerenderFallback() {
  console.warn("[prerender] puppeteer no disponible — meta + JSON-LD + noscript por ruta.");
  const base = await readFile(path.join(dist, "index.html"), "utf8");
  for (const route of ROUTES) {
    let html = injectMeta(base, route);
    html = injectFallbackBody(html, route);
    await writeRouteHtml(route, html);
    console.log(`[prerender:fallback] ${route}`);
  }
}

function systemChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const candidates = [
    "C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",
    "C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];
  for (const p of candidates) {
    try {
      require("node:fs").accessSync(p);
      return p;
    } catch {
      /* continue */
    }
  }
  return null;
}

async function launchBrowser(puppeteer) {
  const args = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"];
  try {
    return await puppeteer.launch({ headless: true, args });
  } catch (err) {
    const exe = systemChromePath();
    if (!exe) throw err;
    console.warn(`[prerender] bundled Chromium failed (${err.message}); using ${exe}`);
    return puppeteer.launch({ headless: true, executablePath: exe, args });
  }
}

async function prerenderWithBrowser(port) {
  const puppeteer = await loadPuppeteer();
  if (!puppeteer) {
    await prerenderFallback();
    return;
  }

  const browser = await launchBrowser(puppeteer);

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(60000);
      // Skip heavy media so networkidle / load aren't blocked by hero videos.
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const type = req.resourceType();
        const url = req.url();
        if (type === "media" || /\.(mp4|webm|mov)(\?|$)/i.test(url)) {
          req.abort();
          return;
        }
        req.continue();
      });

      const navPath =
        route === "/__404__"
          ? `${BASE}/ruta-inexistente-prerender`
          : route === "/"
            ? `${BASE}/` || "/"
            : `${BASE}${route}`;

      try {
        await page.goto(`http://127.0.0.1:${port}${navPath}`, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });

        await page.waitForSelector("#root", { timeout: 30000 });
        await page
          .waitForFunction(
            () => {
              const root = document.querySelector("#root");
              if (!root) return false;
              const h1 = root.querySelector("h1");
              return Boolean(h1 && h1.textContent && h1.textContent.trim().length > 3);
            },
            { timeout: 45000 },
          )
          .catch(() => {
            console.warn(`[prerender] h1 wait timed out for ${route} — saving current DOM`);
          });

        await new Promise((r) => setTimeout(r, 500));
        let html = await page.content();
        html = injectMeta(html, route);
        await writeRouteHtml(route, html);
        console.log(`[prerender] ${route}`);
      } catch (err) {
        console.warn(`[prerender] failed ${route}: ${err.message} — writing meta fallback`);
        const base = await readFile(path.join(dist, "index.html"), "utf8");
        let html = injectMeta(base, route);
        html = injectFallbackBody(html, route);
        await writeRouteHtml(route, html);
      } finally {
        await page.close().catch(() => {});
      }
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  if (!(await exists(path.join(dist, "index.html")))) {
    throw new Error("dist/public/index.html no existe. Ejecuta vite build primero.");
  }

  console.log(`[prerender] BASE_PATH=${BASE || "/"}`);
  const { server, port } = await startStaticServer();
  try {
    await prerenderWithBrowser(port);
  } finally {
    server.close();
  }
  console.log("[prerender] done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
