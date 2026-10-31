import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist/public");
const require = createRequire(import.meta.url);

const ROUTES = [
  "/",
  "/modelo",
  "/portafolio",
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
  },
  "/modelo": {
    title: "Cómo invertir en inmuebles regenerados | Modelo ZAIAH",
    description:
      "Compramos edificios completos, los regeneramos y tú inviertes con escrituras y administración incluida. Así funciona el modelo ZAIAH.",
  },
  "/portafolio": {
    title: "Proyectos de inversión inmobiliaria en CDMX | ZAIAH",
    description:
      "Conoce el proyecto activo de ZAIAH y nuestros casos de éxito en CDMX. Inmuebles regenerados con escrituras y renta administrada.",
  },
  "/quienes-somos": {
    title: "Quiénes somos: equipo de inversión inmobiliaria | ZAIAH",
    description:
      "10 años regenerando inmuebles en CDMX. Conoce al equipo y a los asesores que acompañan a +30 inversionistas.",
  },
  "/contacto": {
    title: "Agenda una cita de inversión inmobiliaria | ZAIAH",
    description:
      "Agenda una reunión virtual: analizamos tu perfil y te recomendamos el proyecto que mejor encaja con tus objetivos.",
  },
  "/gracias": {
    title: "Gracias | Solicitud recibida · ZAIAH",
    description:
      "Hemos recibido tu mensaje. El equipo ZAIAH te contactará en un máximo de 48 horas hábiles.",
  },
  "/aviso-de-privacidad": {
    title: "Aviso de privacidad | ZAIAH",
    description:
      "Consulta el Aviso de Privacidad y Confidencialidad de Documentos de ZAIAH sobre el tratamiento de datos personales.",
  },
  "/__404__": {
    title: "Página no encontrada | ZAIAH",
    description: "La ruta que buscas no existe. Vuelve al inicio de ZAIAH.",
  },
};

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

function injectMeta(html, route) {
  const meta = META[route] ?? META["/"];
  const publicPath = route === "/__404__" ? "/404" : route;
  const canonical =
    publicPath === "/" ? "https://zaiah.com.mx/" : `https://zaiah.com.mx${publicPath}`;
  const ogImage = "https://zaiah.com.mx/og-default.webp";

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${meta.title}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${meta.description}" />`,
  );
  if (/rel="canonical"/.test(out)) {
    out = out.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`);
  } else {
    out = out.replace("</head>", `    <link rel="canonical" href="${canonical}" />\n  </head>`);
  }
  out = out.replace(/property="og:title"\s+content="[^"]*"/i, `property="og:title" content="${meta.title}"`);
  out = out.replace(
    /property="og:description"\s+content="[^"]*"/i,
    `property="og:description" content="${meta.description}"`,
  );
  out = out.replace(/property="og:url"\s+content="[^"]*"/i, `property="og:url" content="${canonical}"`);
  out = out.replace(/property="og:image"\s+content="[^"]*"/i, `property="og:image" content="${ogImage}"`);
  out = out.replace(/name="twitter:title"\s+content="[^"]*"/i, `name="twitter:title" content="${meta.title}"`);
  out = out.replace(
    /name="twitter:description"\s+content="[^"]*"/i,
    `name="twitter:description" content="${meta.description}"`,
  );
  out = out.replace(/name="twitter:image"\s+content="[^"]*"/i, `name="twitter:image" content="${ogImage}"`);
  return out;
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

async function prerenderWithBrowser(port) {
  const puppeteer = await loadPuppeteer();
  if (!puppeteer) {
    console.warn("[prerender] puppeteer no disponible — generando HTML estático con meta por ruta.");
    const base = await readFile(path.join(dist, "index.html"), "utf8");
    for (const route of ROUTES) {
      const html = injectMeta(base, route);
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
    return;
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      const navPath = route === "/__404__" ? "/ruta-inexistente-prerender" : route;
      await page.goto(`http://127.0.0.1:${port}${navPath}`, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });
      await page.waitForSelector("#root", { timeout: 30000 });
      await new Promise((r) => setTimeout(r, 800));
      let html = await page.content();
      html = injectMeta(html, route);
      if (route === "/") {
        await writeFile(path.join(dist, "index.html"), html, "utf8");
      } else if (route === "/__404__") {
        await writeFile(path.join(dist, "404.html"), html, "utf8");
      } else {
        const dir = path.join(dist, route.replace(/^\//, ""));
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, "index.html"), html, "utf8");
      }
      await page.close();
      console.log(`[prerender] ${route}`);
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  if (!(await exists(path.join(dist, "index.html")))) {
    throw new Error("dist/public/index.html no existe. Ejecuta vite build primero.");
  }

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
