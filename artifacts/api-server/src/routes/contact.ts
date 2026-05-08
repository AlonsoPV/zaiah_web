import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

const RECIPIENT = "mkt@zaiah.com.mx";

router.post("/contact", async (req, res) => {
  const { nombre, empresa, correo, telefono, interes, mensaje } = req.body as Record<string, string>;

  if (!nombre || !correo || !telefono || !interes || !mensaje) {
    res.status(400).json({ ok: false, error: "Campos requeridos faltantes." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    req.log.warn("RESEND_API_KEY no configurada — formulario no enviado");
    res.status(500).json({ ok: false, error: "Servicio de correo no configurado." });
    return;
  }

  const resend = new Resend(apiKey);

  const interesLabels: Record<string, string> = {
    inversion: "Inversión",
    alianza: "Alianza estratégica",
    "venta-activo": "Venta de activo",
    "proyecto-inmobiliario": "Proyecto inmobiliario",
    otro: "Otro",
  };

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
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0; color: #333;">${nombre}</td>
          </tr>
          ${empresa ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Empresa</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0; color: #333;">${empresa}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Correo</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0;">
              <a href="mailto:${correo}" style="color: #CAAA57;">${correo}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Teléfono</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0; color: #333;">${telefono}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Interés</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3e0; color: #333;">${interesLabels[interes] ?? interes}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #00246B;">Mensaje</strong>
            </td>
            <td style="padding: 10px 0; color: #333; line-height: 1.6;">${mensaje.replace(/\n/g, "<br>")}</td>
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
    const { error } = await resend.emails.send({
      from: "ZAIAH Contacto <no-reply@zaiah.com.mx>",
      to: [RECIPIENT],
      replyTo: correo,
      subject: `Nueva solicitud — ${nombre} · ${interesLabels[interes] ?? interes}`,
      html,
    });

    if (error) {
      req.log.error({ err: error }, "Resend error");
      res.status(502).json({ ok: false, error: "Error al enviar el correo." });
      return;
    }

    req.log.info({ correo, interes }, "Contacto enviado correctamente");
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Error inesperado en /contact");
    res.status(500).json({ ok: false, error: "Error interno." });
  }
});

export default router;
