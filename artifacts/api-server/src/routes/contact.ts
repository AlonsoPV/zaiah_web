import { Router, type IRouter, type Request } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

const RECIPIENTS = ["alexis.marin@zaiah.com.mx"];
const ALLOWED_INTEREST = new Set(["inversion", "alianza", "proyecto-inmobiliario", "otro"]);
const MIN_FILL_MS = 2500;
const MAX_FILL_MS = 1000 * 60 * 60 * 24;
const RATE_WINDOW_MS = 1000 * 60 * 15;
const RATE_MAX = 5;

type RateEntry = { count: number; resetAt: number };
const rateByIp = new Map<string, RateEntry>();

function clientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() || req.ip || "unknown";
  }
  return req.ip || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateByIp.get(ip);
  if (!entry || now > entry.resetAt) {
    rateByIp.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asTrimmedString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

router.post("/contact", async (req, res) => {
  const ip = clientIp(req);

  if (isRateLimited(ip)) {
    req.log.warn({ ip }, "Contacto bloqueado por rate limit");
    res.status(429).json({ ok: false, error: "Demasiados intentos. Intenta más tarde." });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const website = asTrimmedString(body.website, 200);
  const openedAt = typeof body._t === "number" ? body._t : Number(body._t);

  // Honeypot: bots that fill hidden fields are silently accepted (no email sent)
  if (website) {
    req.log.info({ ip }, "Contacto descartado por honeypot");
    res.json({ ok: true });
    return;
  }

  if (!Number.isFinite(openedAt)) {
    res.status(400).json({ ok: false, error: "Solicitud inválida." });
    return;
  }

  const elapsed = Date.now() - openedAt;
  if (elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    req.log.info({ ip, elapsed }, "Contacto descartado por timing");
    res.status(400).json({ ok: false, error: "Solicitud inválida." });
    return;
  }

  const nombre = asTrimmedString(body.nombre, 120);
  const correo = asTrimmedString(body.correo, 160);
  const telefono = asTrimmedString(body.telefono, 40);
  const interes = asTrimmedString(body.interes, 40);
  const mensaje = asTrimmedString(body.mensaje, 4000);

  if (!nombre || !correo || !telefono || !interes || !mensaje) {
    res.status(400).json({ ok: false, error: "Campos requeridos faltantes." });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || !ALLOWED_INTEREST.has(interes)) {
    res.status(400).json({ ok: false, error: "Datos inválidos." });
    return;
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    req.log.warn("GMAIL_USER / GMAIL_APP_PASSWORD no configurados");
    res.status(500).json({ ok: false, error: "Servicio de correo no configurado." });
    return;
  }

  const interesLabels: Record<string, string> = {
    inversion: "Inversión",
    alianza: "Alianza estratégica",
    "proyecto-inmobiliario": "Proyecto inmobiliario",
    otro: "Otro",
  };

  const safeNombre = escapeHtml(nombre);
  const safeCorreo = escapeHtml(correo);
  const safeTelefono = escapeHtml(telefono);
  const safeInteres = escapeHtml(interesLabels[interes] ?? interes);
  const safeMensaje = escapeHtml(mensaje).replace(/\n/g, "<br>");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #00246B; padding: 24px 32px;">
        <h1 style="color: #ffffff; font-size: 18px; margin: 0; letter-spacing: 0.1em; font-weight: 700;">
          ZAIAH — Nueva solicitud de contacto
        </h1>
      </div>
      <div style="padding: 32px; background-color: #f9f8f7; border: 1px solid #e5e3e0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0; width: 140px;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Nombre</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0; color: #333;">${safeNombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Correo</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0;">
              <a href="mailto:${safeCorreo}" style="color: #CAAA57;">${safeCorreo}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Teléfono</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0; color: #333;">${safeTelefono}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Interés</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0; color: #333;">${safeInteres}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Mensaje</strong>
            </td>
            <td style="padding: 10px 0; color: #333; line-height: 1.6;">${safeMensaje}</td>
          </tr>
        </table>
      </div>
      <div style="padding: 16px 32px; background-color: #00246B; text-align: center;">
        <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0; letter-spacing: 0.08em;">
          ZAIAH · Regeneración Urbana Estructurada · Ciudad de México
        </p>
      </div>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"ZAIAH Formulario" <${gmailUser}>`,
      to: RECIPIENTS.join(", "),
      replyTo: correo,
      subject: `Nueva solicitud — ${nombre} · ${interesLabels[interes] ?? interes}`,
      html,
    });

    req.log.info({ correo, interes, ip }, "Contacto enviado correctamente");
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Error al enviar correo");
    res.status(502).json({ ok: false, error: "Error al enviar el correo." });
  }
});

export default router;
