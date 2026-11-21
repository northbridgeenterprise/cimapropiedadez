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
    const iniciales = (n) => String(n || "").split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2).toUpperCase();
    $("#equipo-grid").innerHTML = equipo.map((p) => {
      const dentro = `${p.foto ? `<img src="${esc(p.foto)}" alt="${esc(p.nombre)}" loading="lazy">` : `<span class="sin-foto" aria-hidden="true">${esc(iniciales(p.nombre))}</span>`}
        <b>${esc(p.nombre)}</b><span>${esc(p.puesto)}</span>
        ${p.texto ? `<p>${esc(p.texto)}</p>` : ""}
        ${p.perfil ? `<span class="ver-perfil">Ver perfil →</span>` : ""}`;
      return p.perfil ? `<a class="persona" href="${esc(p.perfil)}">${dentro}</a>` : `<div class="persona">${dentro}</div>`;
    }).join("");
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

  /* ---------- perfil de asesor ---------- */
  const clave = document.body.dataset.asesor;
  const A = clave && (D.asesores || {})[clave];
  if (A) {
    const num = A.whatsapp || D.whatsapp || "528140079355";
    const telA = A.telefono || num;
    const nombreCorto = (A.nombre || "").split(" ")[0];
    const waA = (t) => "https://wa.me/" + num + "?text=" + encodeURIComponent(t);
    const saludo = "Hola " + nombreCorto + ", vi tu perfil en Cima Propiedades y quiero información.";
    const fmt = (n) => String(n).replace(/^52/, "").replace(/(\d{2})(\d{4})(\d{4})/, "$1 $2 $3");
    document.querySelectorAll('[data-a="nombre"]').forEach((e) => (e.textContent = A.nombre));
    document.querySelectorAll('[data-a="wa"]').forEach((e) => (e.href = waA(saludo)));
    document.querySelectorAll('[data-a="tel"]').forEach((e) => (e.href = "tel:+" + telA));
    document.querySelectorAll('[data-a-texto="tel"]').forEach((e) => (e.textContent = fmt(telA)));
    document.querySelectorAll("[data-a-msg]").forEach((e) => (e.href = waA(e.dataset.aMsg)));
    if (A.foto) {
      const img = $("#a-foto");
      img.onload = () => { img.hidden = false; $("#a-monograma").hidden = true; };
      img.src = A.foto;
    }
    if (A.bio) $("#a-bio").textContent = A.bio;
    const cif = lista(A.cifras);
    if (cif.length) {
      $("#a-cifras").innerHTML = cif.map((c) => `<div><b>${esc(c.numero)}</b><span>${esc(c.texto)}</span></div>`).join("");
      $("#a-cifras").hidden = false;
    }
    const chips = (id, xs) => {
      const el = $(id); if (!el) return;
      if (!lista(xs).length) return;
      el.querySelector("ul").innerHTML = lista(xs).map((x) => `<li>${esc(x)}</li>`).join("");
      el.hidden = false;
    };
    chips("#a-especialidades", A.especialidades);
    chips("#a-zonas", A.zonas);
    chips("#a-certificaciones", A.certificaciones);
    if (lista(A.especialidades).length) $("#a-chips").innerHTML = ["Monterrey y área metropolitana"].concat(lista(A.especialidades).slice(0, 3)).map((x) => `<li>${esc(x)}</li>`).join("");
    if (A.horario) { $("#a-horario p").textContent = A.horario; $("#a-horario").hidden = false; }
    if (A.correo) { const a = $("#a-correo a"); a.href = "mailto:" + A.correo; a.textContent = A.correo; $("#a-correo").hidden = false; }
    const R = A.redes || {};
    const ICONOS = {
      facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.5c0-.8.2-1.5 1.5-1.5H17V2h-2.6C11.3 2 10 3.7 10 6.3V8H8v3h2v11h4V11h2.6l.4-3z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
      tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2h-3.2v13.1a2.9 2.9 0 1 1-2.1-2.8V9a6.1 6.1 0 1 0 5.3 6.1V8.6a7.6 7.6 0 0 0 4.5 1.4V6.8a4.5 4.5 0 0 1-4.5-4.8z"/></svg>'
    };
    const redes = Object.keys(ICONOS).filter((k) => R[k]);
    if (redes.length) {
      $("#a-redes .redes").innerHTML = redes.map((k) => `<a href="${esc(R[k])}" target="_blank" rel="noopener" aria-label="${k}">${ICONOS[k]}</a>`).join("");
      $("#a-redes").hidden = false;
    }
    // casas del asesor
    const suyas = lista(D.propiedades).filter((p) => p.asesor === clave && !/vendid/i.test(p.estado || ""));
    if (suyas.length) {
      const pesos = (n) => Number(n) ? "$" + Number(n).toLocaleString("es-MX") : "Precio a consultar";
      $("#a-casas").innerHTML = suyas.map((p) => {
        const f = lista(p.fotos)[0];
        const nombre = (p.titulo || "Casa") + (p.colonia ? " en " + p.colonia : "") + (p.municipio ? ", " + p.municipio : "");
        return `<article class="propiedad"><div class="foto">${f ? `<img src="${esc(f)}" alt="${esc(nombre)}" loading="lazy">` : ""}${p.estado ? `<span class="estado">${esc(p.estado)}</span>` : ""}</div>
          <div class="info"><span class="precio">${pesos(p.precio)}</span><h3>${esc(p.titulo)}</h3><span class="lugar">${esc([p.colonia, p.municipio].filter(Boolean).join(", "))}</span>
          <a class="boton boton-ambar" href="${waA("Hola " + nombreCorto + ", me interesa la " + nombre + ". ¿Sigue disponible?")}" target="_blank" rel="noopener">${ICONO_WA} Me interesa</a></div></article>`;
      }).join("");
      $("#a-casas-sec").hidden = false;
    }
    // testimonios
    const tes = lista(A.testimonios);
    if (tes.length) {
      $("#a-testimonios").innerHTML = tes.map((t) => `<blockquote class="testimonio">
          ${t.estrellas ? `<span class="estrellas" aria-label="${Number(t.estrellas)} de 5 estrellas">${"★".repeat(Math.min(5, Number(t.estrellas) || 0))}</span>` : ""}
          <p>“${esc(t.texto)}”</p><footer><b>${esc(t.nombre)}</b>${t.municipio ? " · " + esc(t.municipio) : ""}</footer></blockquote>`).join("");
      $("#a-testimonios-sec").hidden = false;
    }
    // guardar contacto (vCard)
    const url = location.protocol.startsWith("http") ? location.href.split("#")[0] : "https://cimapropiedades.com/" + clave;
    const partes = (A.nombre || "").split(" ");
    const vcf = ["BEGIN:VCARD", "VERSION:3.0", "N:" + partes.slice(1).join(" ") + ";" + partes[0] + ";;;", "FN:" + A.nombre,
      "ORG:Cima Propiedades", "TITLE:" + (A.puesto || "Asesor inmobiliario"), "TEL;TYPE=CELL,VOICE:+" + telA,
      A.correo ? "EMAIL:" + A.correo : "", "URL:" + url, "ADR;TYPE=WORK:;;;Monterrey;Nuevo León;;México", "END:VCARD"].filter(Boolean).join("\r\n");
    $("#a-vcard").href = "data:text/vcard;charset=utf-8," + encodeURIComponent(vcf);
    // compartir y copiar enlace
    $("#a-compartir").href = "https://wa.me/?text=" + encodeURIComponent("Te paso el contacto de " + A.nombre + ", asesor de Cima Propiedades en Monterrey: " + url);
    $("#a-copiar").addEventListener("click", async () => {
      const b = $("#a-copiar");
      try { await navigator.clipboard.writeText(url); b.textContent = "¡Enlace copiado!"; }
      catch (e) { prompt("Copia este enlace:", url); }
      setTimeout(() => (b.textContent = "Copiar enlace"), 2200);
    });
    // formulario a WhatsApp
    const fN = $("#af-nombre"), fS = $("#af-necesidad"), fM = $("#af-mensaje"), fB = $("#af-enviar");
    const armar = () => {
      const t = ["Hola " + nombreCorto + ", soy " + (fN.value.trim() || "—") + ".", "Necesito: " + fS.value + "."];
      if (fM.value.trim()) t.push(fM.value.trim());
      fB.href = waA(t.join("\n"));
    };
    $("#a-form").addEventListener("input", armar);
    $("#a-form").addEventListener("submit", (e) => e.preventDefault());
    fB.addEventListener("click", (e) => {
      if (!fN.value.trim()) { e.preventDefault(); $("#af-error").textContent = "Escribe tu nombre para saber a quién responder."; fN.focus(); }
      else $("#af-error").textContent = "";
    });
    armar();
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

/* ---------- experiencia: navegación, menú móvil, barra inferior y animaciones ---------- */
(function () {
  const D = window.CIMA || {};
  const ase = (D.asesores || {})[document.body.dataset.asesor] || null;
  const tel = "+" + ((ase && ase.telefono) || D.whatsapp || "528140079355");
  const wa = "https://wa.me/" + ((ase && ase.whatsapp) || D.whatsapp || "528140079355") +
    (ase ? "?text=" + encodeURIComponent("Hola " + ase.nombre.split(" ")[0] + ", vi tu perfil en Cima Propiedades y quiero información.") : "");
  const nav = document.querySelector(".nav");
  const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Navegación con fondo al bajar
  const barra = document.createElement("div");
  barra.className = "barra-movil";
  barra.innerHTML = `<a class="wa" href="${wa}" target="_blank" rel="noopener"><svg><use href="#i-wa"/></svg> WhatsApp</a><a class="tel" href="tel:${tel}"><svg><use href="#i-tel"/></svg> Llamar</a>`;
  document.body.appendChild(barra);
  const alBajar = () => {
    const y = scrollY;
    if (nav && !nav.classList.contains("solida")) nav.classList.toggle("con-fondo", y > 40);
    barra.classList.toggle("visible", y > 320 || !!document.querySelector(".nav.solida"));
  };
  addEventListener("scroll", alBajar, { passive: true });
  alBajar();

  // Menú móvil
  const enlaces = nav && nav.querySelector("nav ul");
  if (nav && enlaces) {
    const boton = document.createElement("button");
    boton.className = "menu-boton";
    boton.setAttribute("aria-label", "Abrir menú");
    boton.setAttribute("aria-expanded", "false");
    boton.innerHTML = "<span></span>";
    nav.querySelector(".envoltura").appendChild(boton);
    const cajon = document.createElement("div");
    cajon.className = "cajon";
    cajon.id = "menu-movil";
    cajon.setAttribute("aria-hidden", "true");
    cajon.innerHTML = `<ul>${enlaces.innerHTML}</ul>
      <div class="pie-cajon">
        <a class="boton boton-ambar" href="${wa}" target="_blank" rel="noopener"><svg><use href="#i-wa"/></svg> Escríbenos por WhatsApp</a>
        <a class="boton boton-linea" href="tel:${tel}"><svg><use href="#i-tel"/></svg> Llamar al 81 4007 9355</a>
        <small>Urgencias: 81 2198 0008</small>
      </div>`;
    boton.setAttribute("aria-controls", "menu-movil");
    document.body.appendChild(cajon);
    const alternar = (abrir) => {
      cajon.classList.toggle("abierto", abrir);
      document.body.classList.toggle("menu-abierto", abrir);
      boton.setAttribute("aria-expanded", abrir);
      boton.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
      cajon.setAttribute("aria-hidden", !abrir);
      nav.classList.toggle("con-fondo", abrir || scrollY > 40);
    };
    boton.addEventListener("click", () => alternar(!cajon.classList.contains("abierto")));
    cajon.addEventListener("click", (e) => { if (e.target.closest("a")) alternar(false); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") alternar(false); });
  }

  // Aparición al hacer scroll
  if (reducir || !("IntersectionObserver" in window)) return;
  const sel = ".ayuda-grid article,.testimonio,.ficha,.titulo-seccion,.ceja,.intro,.garantias,.camino,.paso,.tarjeta,.caso,.persona,.otras-grid a,.lista-zonas,.preguntas details,.texto-largo .cuerpo,.propiedad,.situaciones,.respuesta,.contacto form,.cifra";
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  const observar = () => document.querySelectorAll(sel).forEach((el) => {
    if (el.classList.contains("revelar") || el.closest(".heroe-sub")) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight * 0.92) return; // ya visible: no lo escondemos
    const hermanos = [...el.parentElement.children].filter((x) => x.matches(sel));
    el.style.transitionDelay = Math.min(hermanos.indexOf(el), 5) * 70 + "ms";
    el.classList.add("revelar");
    io.observe(el);
  });
  observar();
  // Por si el catálogo o los casos se pintan después
  setTimeout(observar, 300);
})();
