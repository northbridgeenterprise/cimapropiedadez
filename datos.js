/*
  =====================================================================
  DATOS DE CIMA PROPIEDADES
  ---------------------------------------------------------------------
  Este es el único archivo que necesitas editar para actualizar la
  página. Cada sección aparece sola en cuanto le pones información, y
  si la dejas vacía, no se muestra.

  Reglas:
  - El texto va entre comillas: "así".
  - Separa cada elemento de una lista con una coma.
  - Las fotos van en la carpeta /fotos y se escriben como "fotos/nombre.jpg".
  - Solo información verdadera: un caso o una cifra inventada destruye
    la confianza que esta página intenta ganar.
  =====================================================================
*/
window.CIMA = {

  /* ---------- Contacto ---------- */
  whatsapp: "528140079355",          // principal (WhatsApp y llamadas)
  whatsappUrgencias: "528121980008", // línea alterna

  /* ---------- Datos legales (pie de página y aviso de privacidad) ---------- */
  razonSocial: "",   // ej. "Cima Propiedades S.A. de C.V." o tu nombre completo
  rfc: "",           // ej. "CPR000000XX0"
  domicilio: "",     // ej. "Av. Constitución 123, Col. Centro, Monterrey, N.L., C.P. 64000"

  /* ---------- Medición (déjalos vacíos si no los usas) ---------- */
  googleAnalytics: "", // ej. "G-XXXXXXXXXX"
  metaPixel: "",       // ej. "123456789012345"

  /* ---------- Reseñas de Google ---------- */
  // Enlace a tus reseñas de Google Business. Lo obtienes en tu perfil:
  // "Pedir reseñas" o "Compartir perfil".
  googleResenas: "",

  /* ---------- Cifras verificables ---------- */
  // Ejemplo: { numero: "8", texto: "años comprando casas en Monterrey" }
  cifras: [
  ],

  /* ---------- Notarías con las que trabajan ---------- */
  // Ejemplo: "Notaría Pública 00, Monterrey"
  notarias: [
  ],

  /* ---------- Casos reales ---------- */
  // Puedes cambiar los nombres de las personas, pero los datos deben ser reales.
  // Ejemplo:
  // {
  //   municipio: "Apodaca",
  //   situacion: "8 meses de atraso con Infonavit",
  //   titulo: "Se liquidó el crédito y la familia recibió la diferencia",
  //   texto: "Revisamos el saldo, hicimos la oferta por escrito y se firmó ante notario.",
  //   tiempo: "3 semanas",
  //   fotoAntes: "fotos/caso-apodaca-antes.jpg",
  //   fotoDespues: "fotos/caso-apodaca-despues.jpg"
  // },
  casos: [
  ],

  /* ---------- Equipo ---------- */
  // Ejemplo: { nombre: "Ana López", puesto: "Directora", foto: "fotos/ana.jpg", texto: "Atiende personalmente cada caso de Infonavit." }
  equipo: [
  ],

  /* ---------- Referidos ---------- */
  // Si das una comisión por recomendar, descríbela aquí. Si no, déjalo vacío.
  // Ej. "Si la venta se concreta, te damos una comisión por recomendarnos."
  comisionReferidos: "Si tu recomendación termina en una venta, te damos una comisión. El monto depende de cada caso y te lo decimos antes de empezar.",

  /* ---------- Casas en venta ---------- */
  // Ejemplo:
  // {
  //   titulo: "Casa de 2 plantas en fraccionamiento privado",
  //   municipio: "Apodaca",
  //   colonia: "Pueblo Nuevo",
  //   precio: 1450000,
  //   recamaras: 3,
  //   banos: 2,
  //   m2: 120,                       // metros de construcción
  //   credito: ["Infonavit", "Bancario", "Contado"],
  //   fotos: ["fotos/casa1-1.jpg", "fotos/casa1-2.jpg"],
  //   estado: "Disponible"           // "Disponible", "Apartada" o "Vendida"
  // },
  propiedades: [
  ]
};
