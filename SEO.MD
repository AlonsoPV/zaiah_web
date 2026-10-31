ZAIAH
Brief de desarrollo y estrategia visual web
zaiah.com.mx · 23 de octubre de 2026 · Marian Mendiola
Resumen y prioridades
zaiah.com.mx se ve bien, pero los buscadores reciben una página vacía: es una SPA (React/Vite) cuyo HTML inicial pesa ~2 KB y no trae contenido. El primer cambio es prerenderizar; el segundo, mover Edison 58 a Casos de éxito porque ya se vendió.
#
Acción
Impacto
Responsable
1
Mover Edison 58 a Casos de éxito y actualizar copy "Dos proyectos"
Negocio
Contenido + Dev
2
Prerender/SSG, robots.txt, sitemap.xml, 404 real, canonical, OG image
Muy alto
Dev
3
Optimizar imágenes (~6.3 MB solo en 3 PNG decorativos)
Alto: SEO y costo por lead en Meta
Dev
4
Titles, descriptions y H1 por página con keywords de búsqueda
Alto
Contenido + Dev
5
Ajustes visuales del recorrido: hero real, CTA dorado, contraste, rostros
Medio-alto
Diseño
6
Nuevas páginas: Zaiah Health, FAQ, recursos
Medio (largo plazo)
Contenido + Dev


Revisión hecha el 23 oct 2026 sobre home, /quienes-somos, /portafolio, /modelo, /contacto y /aviso-de-privacidad, en escritorio. La vista móvil queda pendiente de validar.
Edison 58 pasa a Casos de éxito
Edison 58 sale de "proyectos activos" y se convierte en prueba social: un proyecto que ZAIAH adquirió, regeneró y vendió. Hoy aparece como activo en el home, en /portafolio y enlaza a edison58tabacalera.com.
Cambios por página
Home, sección "Proyectos actuales"
Dejar una sola card activa: San Pedro Patriotismo · Zaiah Health.
Cambiar "Dos proyectos. Dos maneras de construir patrimonio." por un copy de un proyecto activo, p. ej. "Hoy puedes invertir en consultorios del sector salud a 5 min del WTC."
Agregar debajo un bloque "Casos de éxito" con Edison 58 (foto actual de la fachada, etiqueta VENDIDO, CTA "Ver caso").
Corregir el CTA "PROYECTO ACTIVOS" → "PROYECTO ACTIVO" (o "VER PROYECTO").
/portafolio
Separar en dos secciones: "Proyecto activo" (Zaiah Health) y "Casos de éxito" (Edison 58).
Quitar el enlace saliente a edison58tabacalera.com o redirigir ese dominio a la nueva página del caso.
Nueva URL /casos-de-exito/edison-58
Estructura: reto del inmueble → intervención (antes/después) → resultado → cita del equipo o de un inversionista → CTA a Zaiah Health.
Title sugerido: "Edison 58, Tabacalera: caso de regeneración | ZAIAH".
Datos que debe aportar ZAIAH antes de publicar
Fotos antes/después de Edison 58
Fecha de venta y qué cifras se pueden publicar (plazo, plusvalía, unidades vendidas)
Testimonio de un inversionista o del equipo
Decisión sobre el dominio edison58tabacalera.com: redirigir (301) a /casos-de-exito/edison-58 o dejarlo vencer
SEO técnico para desarrollo
El stack actual es Vite + React con un solo bundle (index-*.js, 674 KB). Todo el contenido se pinta en el navegador, así que el HTML que reciben Google, los crawlers de IA y los previews de WhatsApp/LinkedIn no tiene texto.
Hallazgo
Evidencia
Qué hacer
Sin contenido en el HTML inicial
La respuesta de / pesa 1,999 bytes; el body está vacío
Prerender o SSG de todas las rutas (vite-plugin-prerender, vite-ssg, o migrar a Astro/Next)
Misma meta en todas las URLs
El servidor entrega title y description del home en /quienes-somos, /portafolio, etc.
Que cada ruta prerenderizada salga con su propio title, description y canonical
No hay robots.txt
/robots.txt devuelve el HTML del home con 200
Crear robots.txt con Allow: / y la línea Sitemap:
No hay sitemap.xml
/sitemap.xml devuelve el HTML del home con 200
Generar sitemap.xml en el build y darlo de alta en Search Console
Soft 404
Cualquier URL inventada responde 200 con el home
Página 404 propia que responda status 404 (regla en el hosting)
Sin canonical
No existe <link rel=canonical>
Canonical absoluto por página, versión https sin www (o la que se elija)
Sin og:image
No hay imagen para compartir
og:image 1200×630 por página; crítica porque los asesores comparten por WhatsApp
Sin datos estructurados
No hay JSON-LD
Organization + RealEstateAgent en el home; FAQPage en FAQ; BreadcrumbList en internas
Meta keywords
Presente en el head
Google la ignora; se puede quitar
maximum-scale=1 en viewport
Bloquea el zoom en móvil
Quitarlo (accesibilidad)

Rendimiento (impacta SEO y el costo por lead de Meta Ads)
Archivo
Peso
Acción
reto-trees-cdmx-right.png
2,221 KB
WebP/AVIF, ancho máx. 1200 px, objetivo < 150 KB
reto-trees-cdmx-left.png
2,199 KB
Igual
reto-trees-left-v2.png
1,859 KB
Igual
index.js
674 KB
Code-splitting por ruta, revisar librerías de animación
hero-fallback.jpeg
485 KB
WebP/AVIF, fetchpriority="high", preload
zonas-zaiah.webp
373 KB
Comprimir; que se vea sin esperar la animación
edison-58.jpeg
192 KB
WebP


Todas las imágenes tienen loading="auto": usar loading="lazy" debajo del primer pantallazo.
Precargar la fuente Qualion (font-display: swap).
Accesibilidad e imágenes
El wordmark animado ZAIAH usa 10 imágenes base64 con alt "Z", "A", "I"… Dejar un solo elemento con aria-label="ZAIAH" y las letras con alt="".
4 imágenes sin alt (hero y árboles decorativos): si son decorativas, alt="" explícito; el hero debe describir el inmueble.
Revisar contraste WCAG AA en textos grises sobre crema/beige y en textos sobre fotos.
Medición
Verificar el dominio en Google Search Console y enviar el sitemap
Confirmar que GA4 y Meta Pixel disparan eventos en cada ruta (en una SPA hay que enviarlos al cambiar de ruta)
Evento de conversión en clic a WhatsApp y en envío de cita
Metadatos y encabezados por página
Los H1 actuales son frases de marca que nadie busca. La propuesta mantiene el claim como texto visual y lleva al H1 la keyword que busca el inversionista. Titles ≤ 60 caracteres, descriptions ≤ 155.
URL
Title propuesto
Meta description propuesta
H1 propuesto
/
Inversión inmobiliaria con escrituras en CDMX | ZAIAH
Invierte en inmuebles regenerados en CDMX con escrituras, operación profesional y renta pasiva. Conoce el modelo ZAIAH y agenda una cita.
Inversión inmobiliaria con escrituras en CDMX
/modelo
Cómo invertir en inmuebles regenerados | Modelo ZAIAH
Compramos edificios completos, los regeneramos y tú inviertes con escrituras y administración incluida. Así funciona el modelo ZAIAH.
Cómo funciona invertir con ZAIAH
/portafolio
Proyectos de inversión inmobiliaria en CDMX | ZAIAH
Conoce el proyecto activo de ZAIAH y nuestros casos de éxito en CDMX. Inmuebles regenerados con escrituras y renta administrada.
Proyectos de inversión inmobiliaria en CDMX
/zaiah-health (nueva)
Consultorios en venta para rentar en CDMX | Zaiah Health
Invierte en consultorios a 5 min del WTC con escrituras y renta administrada por ZAIAH. Agenda un recorrido.
Consultorios en venta para inversión en CDMX
/casos-de-exito/edison-58 (nueva)
Edison 58, Tabacalera: caso de regeneración | ZAIAH
Cómo ZAIAH adquirió, regeneró y vendió Edison 58 en la Tabacalera, CDMX.
Edison 58: de edificio histórico a inversión vendida
/quienes-somos
Quiénes somos: equipo de inversión inmobiliaria | ZAIAH
10 años regenerando inmuebles en CDMX. Conoce al equipo y a los asesores que acompañan a +30 inversionistas.
Equipo ZAIAH: 10 años regenerando inmuebles en CDMX
/contacto
Agenda una cita de inversión inmobiliaria | ZAIAH
Agenda una reunión virtual: analizamos tu perfil y te recomendamos el proyecto que mejor encaja con tus objetivos.
Agenda tu cita de inversión
/preguntas-frecuentes (nueva)
Preguntas frecuentes sobre invertir con ZAIAH
Escrituras, rendimientos, administración y proceso notarial: respuestas claras antes de invertir.
Preguntas frecuentes

H1 actuales (para referencia)
URL
H1 actual
/
Redefinimos el futuro urbano de las grandes ciudades
/modelo
Construimos Zonas Zaiah mediante la compra progresiva de edificios completos.
/portafolio
Proyectos que nacen de escuchar lo que una zona necesita
/quienes-somos
"Construimos abundancia para compartir"
/contacto
Empecemos por conocerte. Lo demás viene después.

Arquitectura y enlazado interno
Agregar /modelo al menú principal (hoy solo se llega desde un CTA).
Renombrar "Sinergia" en el menú → "Agenda una cita".
Menú sugerido: Inicio · Modelo · Proyectos · Casos de éxito · Nosotros · Agenda una cita.
Desde cada página, un enlace contextual a /modelo y a /zaiah-health.
La landing sanpedropatriotismo.com sigue para campañas; /zaiah-health es la versión orgánica dentro del dominio.
Contenido que falta (para el equipo de contenido)
FAQ con 8–10 preguntas reales de los recorridos: escrituras, rendimiento esperado, quién administra, plazos, enganche, gastos notariales.
Sección de recursos: convertir cada webinar en un artículo (ej. "Cómo invertir tu aguinaldo en bienes raíces").
Home: subir de ~490 a 800–1,000 palabras útiles (FAQ resumida, proceso, testimonios).
Estrategia visual desde que nos visita
La identidad (navy, dorado, crema, Qualion) transmite solidez y lujo discreto, que es lo correcto para un producto patrimonial. El problema no es la estética sino el recorrido: en cada etapa hay un detalle que le resta confianza a alguien que está por invertir ~$1.5M.

Las tres entradas convergen en el hero del home; las dos primeras ya llegan con un freno técnico (ver SEO técnico).
Etapa
Qué ve hoy
Qué cambiar
0. Antes de entrar
El link compartido por WhatsApp sale sin imagen ni descripción; en Google, la página no tiene texto indexable
og:image por página con foto real de inmueble; prerender
1. Primer vistazo (hero)
Render de torres nuevas con jardines verticales; ZAIAH regenera edificios existentes. Botón verde brillante, único verde del sitio. Logo duplicado (arriba y al centro). Titular en mayúsculas mezclando dos tipografías sobre una imagen cargada
Foto real: antes/después de un edificio intervenido o Zaiah Health terminado. CTA dorado sólido, como el de /contacto. Un solo logo. Titular en caja mixta con overlay más oscuro. Bajo el CTA, una línea de confianza: "Escrituras · Proceso notariado · +30 inversionistas"
2. Entiende el modelo
El reto y las Zonas Zaiah se explican bien. El mapa isométrico (mejor activo visual) deja casi una pantalla navy vacía hasta que entra la animación. Textos grises sobre crema/beige con bajo contraste
Mostrar el mapa desde el inicio y animar encima. Subir el contraste de párrafos a gris oscuro. Mantener la numeración 01/02/03 y los íconos dorados
3. Confía
Home sin rostros ni testimonios. En /quienes-somos, 7 de 13 cards de equipo muestran "FOTO" o iniciales y varias fotos tardan en cargar. Los testimonios en video existen pero solo en /quienes-somos. Edison 58 aparece como activo
Llevar 2 testimonios en video al home, justo después de los proyectos. Completar fotos del equipo o mostrar solo quien tiene foto profesional. Incluir a los asesores comerciales con foto y WhatsApp directo. Edison 58 como caso de éxito con etiqueta VENDIDO
4. Agenda
La página se llama "Agenda una cita" pero es un formulario de 6 campos con mensaje obligatorio; promete respuesta en 48 h hábiles. "Sinergia" en el menú no dice que ahí se agenda
Calendario embebido (GoHighLevel o Calendly) para elegir día y hora al momento. Formulario de 3 campos (nombre, WhatsApp, interés), mensaje opcional. Renombrar el menú a "Agenda una cita"
5. Después del envío
No se probó el envío del formulario; validar si existe confirmación o página de gracias
Página /gracias con foto del asesor asignado, qué sigue y botón a WhatsApp. Sirve también como evento de conversión para Meta y GA4

Lo que se conserva
Paleta navy + dorado + crema y la tipografía Qualion.
El mapa isométrico de Zonas Zaiah.
El hero de /contacto (foto real de CDMX con el Monumento a la Revolución): es la referencia de tono para el resto del sitio.
Las cards de proyecto con foto real a sangre.
Material que necesita diseño
Sesión de fotos: Zaiah Health terminado, equipo y asesores con el mismo fondo y luz
Antes/después de Edison 58
og:image 1200×630 por página
Versión móvil del hero revisada sobre dispositivo real
Checklist de entrega y QA
El desarrollador entrega cuando todo esto pasa en producción.
"Ver código fuente" de cada URL muestra el texto de la página, su propio title, description y canonical
/robots.txt responde texto plano y apunta al sitemap
/sitemap.xml lista todas las URLs públicas, incluidas las nuevas
Una URL inexistente responde 404 con página propia
Al compartir cada URL por WhatsApp se ve imagen, título y descripción
JSON-LD válido en Rich Results Test (search.google.com/test/rich-results)
PageSpeed Insights móvil ≥ 80 en home y /zaiah-health; LCP < 2.5 s
Peso total del home < 2 MB
Edison 58 aparece solo como caso de éxito; el copy "Dos proyectos" ya no existe
Ninguna card de equipo muestra "FOTO" o iniciales
GA4 y Meta Pixel registran vista por ruta, clic a WhatsApp y envío de cita
Revisión completa en móvil (iPhone y Android) antes de publicar
