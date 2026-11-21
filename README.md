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
| `og-imagen.png`, `icono-180.png` | Imagen al compartir el enlace e ícono del celular |
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

### 5. Dominio y publicación
1. Compra el dominio (por ejemplo, en Namecheap, GoDaddy o Akky para un `.mx`).
2. Publica el repositorio en Netlify o Cloudflare Pages (gratis) y conecta el dominio.
3. Cuando lo tengas, avísanos para poner la URL completa en `og:image` y `canonical`, y agregar `sitemap.xml`.

### 6. Aviso de privacidad
Pon `razonSocial`, `rfc` y `domicilio` en `datos.js`: aparecen solos en el pie de página y en el aviso.
