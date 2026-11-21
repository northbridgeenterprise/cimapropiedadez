# Cima Propiedades — sitio web

Sitio estático (HTML + CSS + un poco de JavaScript, sin dependencias). Se puede publicar tal cual en GitHub Pages, Netlify o Cloudflare Pages.

## Cómo actualizar la página sin tocar código

Todo lo que cambia con el tiempo vive en **`datos.js`**: casas en venta, casos reales, equipo, cifras, notarías, reseñas, razón social y medición. Cada sección aparece sola cuando le pones datos y se oculta si está vacía. Las fotos van en la carpeta `fotos/`.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Portada |
| `propiedades.html` | Catálogo de casas en venta (se llena desde `datos.js`) |
| `vender-casa-*.html` | Páginas por situación (Infonavit, herencia, gravamen, mal estado) |
| `aviso-de-privacidad.html` | Aviso de privacidad |
| `404.html` | Página para enlaces rotos |
| `datos.js` | **Lo único que necesitas editar** |
| `sitio.js` | Pinta las secciones a partir de `datos.js` y mide los clics de contacto |
| `estilos.css` | Estilos compartidos |
| `sitemap.xml`, `robots.txt`, `_headers` | Para Google y para Cloudflare Pages |
| `favicon.svg`, `og-imagen.png`, `icono-180.png` | Imagen al compartir el enlace e ícono del celular |
| `propuestas-logo/` | Tres propuestas de logo (versión clara y oscura) y `comparacion.png` |

## Teléfonos

- **81 4007 9355**: principal, WhatsApp y llamadas.
- **81 2198 0008**: línea alterna para urgencias.

## Guía para completar lo que falta

### 1. Reseñas de Google (lo que más confianza da)
1. Entra a business.google.com y crea el perfil "Cima Propiedades" (categoría: *Agencia inmobiliaria*). Puedes ocultar tu domicilio y marcar "área de servicio" con los municipios.
2. Google te pide verificar el negocio (video, llamada o carta).
3. En el perfil, pulsa **Pedir reseñas**, copia el enlace y pégalo en `googleResenas` dentro de `datos.js`.
4. Mándale ese enlace a cada cliente después de firmar.

### 2. Fotos
- Tu cara y la de tu equipo, con luz natural, de frente y sin lentes oscuros. Una foto con el celular está bien.
- Para los casos: la casa antes (tal como la compraron) y después (arreglada), desde el mismo ángulo.
- Horizontales, de menos de 400 KB cada una (puedes comprimirlas en squoosh.app).
- Si la foto muestra la fachada de un cliente, pídele permiso o tapa el número de la casa.

### 3. Casos reales
Por cada caso: municipio, situación (ej. "8 meses de atraso con Infonavit"), qué se logró, en cuánto tiempo se firmó y, si tienes, las fotos de antes y después. Puedes cambiar los nombres.

### 4. Medición
- **Google Analytics**: en analytics.google.com, crea una propiedad, copia el ID `G-XXXXXXXXXX` y pégalo en `googleAnalytics`.
- **Pixel de Meta**: en el Administrador de eventos de Meta, crea un píxel y pega su número en `metaPixel`.
- Cada clic en WhatsApp o en llamar se cuenta automáticamente como "contacto".

### 5. Publicar en Cloudflare Pages (cimapropiedades.com)
1. En el panel de Cloudflare entra a **Workers y Pages → Crear → Pages → Conectar a Git** y elige el repositorio `cimapropiedadez`.
2. Rama de producción: la rama donde esté el sitio (`main`, o esta rama si todavía no se ha fusionado).
3. Configuración de compilación: **Framework: Ninguno**, comando de compilación **vacío**, directorio de salida **`/`**.
4. Al terminar, en el proyecto ve a **Dominios personalizados → Configurar dominio** y escribe `cimapropiedades.com`. Repite con `www.cimapropiedades.com`. Como el dominio ya está en Cloudflare, el DNS se configura solo.
5. Cada vez que se suba un cambio al repositorio, Cloudflare publica la nueva versión en uno o dos minutos.
6. Ya publicado, entra a search.google.com/search-console, agrega `cimapropiedades.com` y envía el mapa del sitio: `https://cimapropiedades.com/sitemap.xml`.

### 6. Aviso de privacidad
Pon `razonSocial`, `rfc` y `domicilio` en `datos.js`: aparecen solos en el pie de página y en el aviso.
