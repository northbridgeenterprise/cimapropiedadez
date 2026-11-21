/* Llena las secciones de la página con lo que hay en datos.js. No necesitas editar este archivo. */
(function () {
  const D = window.CIMA || {};
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lista = (x) => (Array.isArray(x) ? x.filter(Boolean) : []);
  const WA = "https://wa.me/" + (D.whatsapp || "528140079355");
  const wa = (t) => WA + "?text=" + encodeURIComponent(t);
  const ICONO_WA = '<svg><use href="#i-wa"/></svg>';

  /* ---------- medición ---------- */
  if (D.googleAnalytics) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(D.googleAnalytics);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", D.googleAnalytics);
  }
  if (D.metaPixel) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", D.metaPixel);
    fbq("track", "PageView");
  }
  // Cuenta cada clic en WhatsApp o en llamar como un contacto.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href*="wa.me/"], a[href^="tel:"]');
    if (!a) return;
    const tipo = a.href.startsWith("tel:") ? "llamada" : "whatsapp";
    if (window.gtag) gtag("event", "contacto", { metodo: tipo, pagina: location.pathname });
    if (window.fbq) fbq("track", "Contact", { content_name: tipo });
  });

  /* ---------- pie de página legal ---------- */
  const legal = [D.razonSocial, D.rfc && "RFC " + D.rfc].filter(Boolean).join(" · ");
  document.querySelectorAll('[data-cima="legal"]').forEach((el) => { el.textContent = legal; el.hidden = !legal; });
  const resp = $('[data-cima="responsable"]');
  if (resp && (D.razonSocial || D.domicilio)) {
    resp.textContent = (D.razonSocial || "Cima Propiedades") + (D.rfc ? " (RFC " + D.rfc + ")" : "") + ", con domicilio en " + (D.domicilio || "Monterrey, Nuevo León, México");
  }

  /* ---------- confianza: cifras, notarías y reseñas ---------- */
  const cifras = lista(D.cifras);
  if ($("#cifras") && cifras.length) {
    $("#cifras").innerHTML = cifras.map((c) => `<div class="cifra"><b>${esc(c.numero)}</b><span>${esc(c.texto)}</span></div>`).join("");
    $("#cifras").hidden = false;
  }
  const notarias = lista(D.notarias);
  if ($("#notarias") && notarias.length) {
    $("#notarias").innerHTML = "<b>Firmamos en:</b> " + notarias.map(esc).join(", ") + ".";
    $("#notarias").hidden = false;
  }
  if ($("#boton-resenas") && D.googleResenas) {
    $("#boton-resenas").href = D.googleResenas;
    $("#boton-resenas").hidden = false;
  }
  if ($("#extra-confianza")) $("#extra-confianza").hidden = !(notarias.length || D.googleResenas);

  /* ---------- casos reales ---------- */
  const casos = lista(D.casos);
  if ($("#casos") && casos.length) {
    $("#casos-grid").innerHTML = casos.map((c) => {
      const fotos = c.fotoAntes || c.fotoDespues ? `<div class="fotos">
          ${c.fotoAntes ? `<figure><img src="${esc(c.fotoAntes)}" alt="La casa antes, en ${esc(c.municipio)}" loading="lazy"><figcaption>Antes</figcaption></figure>` : ""}
          ${c.fotoDespues ? `<figure><img src="${esc(c.fotoDespues)}" alt="La casa después, en ${esc(c.municipio)}" loading="lazy"><figcaption>Después</figcaption></figure>` : ""}
        </div>` : "";
      return `<article class="caso">${fotos}<div class="info">
          <span class="lugar">${esc(c.municipio)} · ${esc(c.situacion)}</span>
          <h3>${esc(c.titulo)}</h3>
          ${c.texto ? `<p>${esc(c.texto)}</p>` : ""}
          ${c.tiempo ? `<span class="tiempo">Se firmó en ${esc(c.tiempo)}</span>` : ""}
        </div></article>`;
    }).join("");
    $("#casos").hidden = false;
    document.querySelectorAll('[href="#casos"]').forEach((a) => (a.closest("li") || a).hidden = false);
  }

  /* ---------- equipo ---------- */
  const equipo = lista(D.equipo);
  if ($("#equipo") && equipo.length) {
    $("#equipo-grid").innerHTML = equipo.map((p) => `<div class="persona">
        ${p.foto ? `<img src="${esc(p.foto)}" alt="${esc(p.nombre)}" loading="lazy">` : ""}
        <b>${esc(p.nombre)}</b><span>${esc(p.puesto)}</span>
        ${p.texto ? `<p>${esc(p.texto)}</p>` : ""}
      </div>`).join("");
    $("#equipo").hidden = false;
  }

  /* ---------- referidos ---------- */
  if ($("#referidos-comision") && D.comisionReferidos) {
    $("#referidos-comision").textContent = D.comisionReferidos;
    $("#referidos-comision").hidden = false;
  }
  const compartir = $("#compartir-referido");
  if (compartir) {
    const url = location.protocol.startsWith("http") ? location.origin + location.pathname.replace(/[^/]*$/, "") : "";
    compartir.href = "https://wa.me/?text=" + encodeURIComponent(
      "Te recomiendo Cima Propiedades en Monterrey: compran casas con adeudo de Infonavit, gravamen o en mal estado, y todo se firma ante notario." +
      (url ? " " + url : " WhatsApp: 81 4007 9355"));
  }

  /* ---------- catálogo de casas ---------- */
  const grid = $("#propiedades-grid");
  if (grid) {
    const props = lista(D.propiedades);
    const pesos = (n) => Number(n) ? "$" + Number(n).toLocaleString("es-MX") : "Precio a consultar";
    const filtro = $("#filtro-municipio"), orden = $("#filtro-orden");
    const municipios = [...new Set(props.map((p) => p.municipio).filter(Boolean))].sort();
    filtro.innerHTML = '<option value="">Todos los municipios</option>' + municipios.map((m) => `<option>${esc(m)}</option>`).join("");
    $("#filtros").hidden = props.length < 2;

    const tarjeta = (p) => {
      const fotos = lista(p.fotos);
      const nombre = (p.titulo || "Casa") + (p.colonia ? " en " + p.colonia : "") + (p.municipio ? ", " + p.municipio : "");
      const vendida = /vendid/i.test(p.estado || "");
      const datos = [p.recamaras && p.recamaras + (p.recamaras == 1 ? " recámara" : " recámaras"), p.banos && p.banos + (p.banos == 1 ? " baño" : " baños"), p.m2 && p.m2 + " m²"].filter(Boolean);
      return `<article class="propiedad">
        <div class="foto">
          ${fotos[0] ? `<img src="${esc(fotos[0])}" alt="${esc(nombre)}" loading="lazy">` : ""}
          ${p.estado ? `<span class="estado">${esc(p.estado)}</span>` : ""}
          ${fotos.length > 1 ? `<span class="mas-fotos">${fotos.length} fotos</span>` : ""}
        </div>
        <div class="info">
          <span class="precio">${pesos(p.precio)}</span>
          <h3>${esc(p.titulo)}</h3>
          <span class="lugar">${esc([p.colonia, p.municipio].filter(Boolean).join(", "))}</span>
          ${datos.length ? `<div class="datos">${datos.map((d) => `<span>${esc(d)}</span>`).join("")}</div>` : ""}
          ${lista(p.credito).length ? `<div class="chips">${lista(p.credito).map((c) => `<span>${esc(c)}</span>`).join("")}</div>` : ""}
          ${vendida ? "" : `<a class="boton boton-ambar" href="${wa("Hola, me interesa la " + nombre + " (" + pesos(p.precio) + "). ¿Sigue disponible?")}" target="_blank" rel="noopener">${ICONO_WA} Me interesa</a>`}
        </div>
      </article>`;
    };
    const pintar = () => {
      let r = props.filter((p) => !filtro.value || p.municipio === filtro.value);
      if (orden.value === "menor") r = [...r].sort((a, b) => (a.precio || 0) - (b.precio || 0));
      if (orden.value === "mayor") r = [...r].sort((a, b) => (b.precio || 0) - (a.precio || 0));
      grid.innerHTML = r.map(tarjeta).join("");
      $("#vacio").hidden = props.length > 0;
    };
    filtro.addEventListener("change", pintar);
    orden.addEventListener("change", pintar);
    pintar();
  }
})();
