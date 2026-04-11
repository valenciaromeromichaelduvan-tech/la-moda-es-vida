/**
 * Business Strategy and Content Constants for LA MODA ES VIDA
 */

export const STRATEGY = {
  mission: "Democratizar la moda de alta gama en Colombia, fusionando tendencias globales con la esencia vibrante y diversa del estilo de vida local, garantizando accesibilidad y una experiencia personalizada sin precedentes.",
  vision: "Ser la plataforma de moda líder en Colombia para 2028, reconocida por nuestra capacidad de anticipar los deseos del consumidor local a través de tecnología inteligente y un compromiso inquebrantable con la diversidad.",
  values: [
    { name: "Diversidad Real", description: "Celebramos todas las formas, colores y expresiones de la identidad colombiana." },
    { name: "Innovación Humana", description: "Usamos la tecnología para simplificar la vida, no para complicarla." },
    { name: "Accesibilidad Consciente", description: "Moda aspiracional con un modelo de precios y logística adaptado a la realidad nacional." },
    { name: "Pasión Local", description: "Cada colección respira el ritmo y la calidez de nuestras regiones." }
  ],
  valueProposition: "LA MODA ES VIDA es la esencia del estilo contemporáneo en Colombia. Una invitación a descubrir una moda que respira tu ritmo, celebra tu identidad y anticipa tus deseos con la sofisticación de una firma global y la calidez de nuestra tierra. Aquí, tu estilo no solo se viste, se vive.",
  slogans: [
    "Tu estilo, nuestra inspiración.",
    "La esencia de ser tú.",
    "Moda que respira tu ritmo.",
    "Sofisticación global, alma colombiana."
  ]
};

export const SITEMAP = [
  { name: "Inicio", path: "/" },
  { name: "Tendencias Colombianas", path: "/tendencias" },
  { name: "Tu Espacio Personal", path: "/perfil" },
  { name: "Fidelidad & Beneficios", path: "/fidelidad" },
  { name: "Colecciones", sub: ["Mujer", "Hombre", "Accesorios", "Ediciones Especiales"] },
  { name: "Sostenibilidad", path: "/sostenibilidad" }
];
