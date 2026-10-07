# Aurora Beauty Studio — sitio web de marketing

Landing page para un centro de estética en Colombia, hecha con React + TypeScript + Vite.

**Diseño:** estética *quiet luxury* (marfil, espresso, mocha y champán) con Cormorant Garamond y Manrope.

| Librería | Uso |
|---|---|
| [shadcn/ui](https://ui.shadcn.com) + Tailwind CSS v4 | Componentes de interfaz (`src/components/ui`): botones, formularios, diálogo, menú lateral, acordeón |
| [Motion](https://motion.dev) | Máquina de escribir, transiciones entre páginas, revelado al hacer scroll, tarjetas con inclinación 3D, carrusel 3D |
| [React Three Fiber](https://r3f.docs.pmnd.rs) + drei | Escena 3D del inicio (frasco de perfume, perlas y aro dorado), cargada de forma diferida y pausada fuera de pantalla |

Todas las animaciones respetan la preferencia del sistema de "reducir movimiento". Si el dispositivo no soporta WebGL, la escena 3D se reemplaza por un fondo estático. Incluye reservas en línea, promociones, testimonios, preguntas frecuentes, boletín y botón de WhatsApp, más las páginas legales que exige la normativa colombiana.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completa los valores
npm run dev                  # http://localhost:5173
npm run lint && npm run build
npm run preview              # prueba el build de producción
```

## Antes de publicar (obligatorio)

1. **`src/config/site.ts`**: razón social, NIT, dirección, teléfonos, correos, redes y horarios reales.
2. **`src/data/content.ts`**: servicios y precios reales (con IVA incluido).
3. **Testimonios y cifras**: los testimonios de `content.ts` y las cifras del hero (`src/sections/Hero.tsx`: "+2.500 clientas", "4,9/5", "8 años") son **de ejemplo**. Cámbialos por datos reales y verificables y usa solo testimonios con autorización escrita de sus autoras. Publicar datos inventados es publicidad engañosa (Ley 1480 de 2011).
4. **Promoción** (`src/sections/Promo.tsx`): vigencia, cupos y condiciones reales.
5. **Formulario**: crea un endpoint (p. ej. [Formspree](https://formspree.io)) y ponlo en `VITE_FORM_ENDPOINT`. Sin él, el formulario funciona en *modo demostración* y no envía nada. Si usas otro proveedor, añade su dominio a `connect-src` en la CSP (ver abajo).
6. **Registro Nacional de Bases de Datos (RNBD)**: si tu empresa está obligada (sociedades con activos totales superiores a 100.000 UVT), registra las bases de datos ante la SIC.
7. Haz que un abogado revise los textos legales: son una base sólida, pero deben ajustarse a tu operación real.

## Cumplimiento normativo en Colombia

| Norma | Cómo se cumple |
|---|---|
| Ley 1581 de 2012 y Decreto 1377 de 2013 (habeas data) | Política de tratamiento de datos, aviso de privacidad, autorización previa y expresa en cada formulario, derechos del titular y plazos de consultas y reclamos, canal de PQRS. |
| Datos sensibles (art. 6 Ley 1581) | Campo de salud opcional con autorización separada y facultativa. |
| Menores de edad (art. 7 Ley 1581) | Declaración obligatoria de mayoría de edad. |
| Cookies (guía de la SIC) | Banner con *Aceptar*, *Rechazar* y *Configurar* con el mismo peso visual; consentimiento granular por categoría; **Google Analytics y Meta Pixel solo se cargan después de aceptar**; registro con fecha, versión e ID; vence a los 12 meses o al cambiar la versión de la política; revocable desde el pie de página (se borran las cookies). |
| Ley 2300 de 2023 ("Dejen de fregar") | El usuario elige los canales comerciales (WhatsApp, correo, SMS); se informan los horarios y la frecuencia permitidos. |
| Ley 1480 de 2011 (Estatuto del Consumidor) | Precios con IVA, condiciones de promociones, derecho de retracto, garantía y PQRS, enlace a la SIC. |
| Ley 527 de 1999 | Identificación del prestador y términos y condiciones. |
| Cosméticos (INVIMA) | Aviso de que los servicios son estéticos y no médicos. |

## Seguridad

- Cabeceras HTTP: Content-Security-Policy estricta, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` y `Permissions-Policy` (en `vercel.json`, `netlify.toml` y `deploy/security-headers.conf`).
- Sin scripts en línea, sin `dangerouslySetInnerHTML` y fuentes autoalojadas (no se envía la IP del visitante a Google Fonts).
- `style-src` permite `'unsafe-inline'` porque las librerías de interfaz (Base UI, sonner) inyectan estilos en tiempo de ejecución. Los **scripts** siguen restringidos a `'self'` y a los dominios de analítica, que es donde está el riesgo real de XSS.
- Formularios: validación y saneamiento, límites de longitud, honeypot antispam y espera de 30 s entre envíos.
- Los enlaces externos usan `rel="noopener noreferrer"`. Los secretos nunca van en el código: las variables `VITE_*` son públicas, así que solo pon IDs públicos.
- CI en GitHub Actions: lint, build y `npm audit`.

**Si agregas otro servicio externo** (otro proveedor de formularios, un chat o un mapa embebido), añade su dominio a la CSP en los tres archivos de despliegue o el navegador lo bloqueará.

## Despliegue

### Opción A: Vercel (recomendada)
1. Sube el proyecto a GitHub.
2. En [vercel.com](https://vercel.com), selecciona **Add New → Project** e importa el repositorio. `vercel.json` ya configura el build, las rutas y las cabeceras.
3. En **Settings → Environment Variables**, añade las variables de `.env.example` y vuelve a desplegar.

O desde la terminal: `npx vercel --prod`.

### Opción B: Netlify
Importa el repositorio en [netlify.com](https://netlify.com) (`netlify.toml` ya está listo) o ejecuta `npx netlify deploy --prod --dir=dist` después de `npm run build`.

### Opción C: Docker (servidor propio o VPS)
```bash
docker build -t aurora-web --build-arg VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx .
docker run -d -p 80:8080 --name aurora-web aurora-web
```
Nginx corre sin privilegios de root. Sirve el sitio detrás de HTTPS (Caddy, Traefik o un balanceador con certificado).

## Estructura

```
src/
  config/site.ts         Datos del negocio y variables de entorno
  data/content.ts        Servicios, beneficios, testimonios y preguntas frecuentes
  context/               Proveedores de consentimiento y de rutas
  lib/                   Consentimiento, trackers, validación, envío y router
  components/            Header, Footer, banner y modal de cookies, WhatsApp
  components/ui/         Componentes de shadcn/ui
  components/motion/     Máquina de escribir, Reveal, Tilt 3D, encabezados animados
  components/three/      Escena 3D del inicio
  sections/              Secciones de la página de inicio
  pages/                 Inicio, páginas legales y 404
deploy/                  Configuración de Nginx
```
