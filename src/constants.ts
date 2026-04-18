/**
 * Business Strategy and Content Constants for LA MODA ES VIDA
 */

export const STRATEGY = {
  mission: "Revolucionar la industria de la moda en Colombia mediante un ecosistema inteligente que reconoce al ser humano detrás del cliente. Creemos en la eficiencia absoluta de los datos, utilizando la Cédula como el único vínculo necesario para eliminar formularios y trámites innecesarios, ofreciendo un valor personalizado que celebra tu identidad en cada interacción.",
  vision: "Liderar la personalización tecnológica y la sostenibilidad en el mercado de lujo accesible en Colombia, siendo reconocidos como la opción número uno para el consumidor consciente y digitalmente nativo.",
  values: [
    { 
      name: "Innovación Invisible", 
      description: "La tecnología debe ser el hilo oculto que perfecciona la experiencia sin interrumpir la belleza de la moda." 
    },
    { 
      name: "Diversidad Dinámica", 
      description: "Honramos el ritmo de vida de cada ciudad colombiana, desde el frío solemne de Bogotá hasta el calor vibrante de Barranquilla." 
    },
    { 
      name: "Ética de Impacto", 
      description: "Moda de alta gama con responsabilidad circular, respetando los materiales y las comunidades que dan vida a nuestras prendas." 
    }
  ],
  valueProposition: "LA MODA ES VIDA no es solo una tienda; es un ecosistema inteligente que te reconoce.",
  heroSubtext: "Eliminamos la fricción: recordamos tus tallas, conocemos tu estilo y sugerimos tendencias basadas en el clima de tu ciudad y tus eventos locales sin que tengas que pedirlo.",
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
  { name: "MI ESPACIO & BENEFICIOS", path: "/ecosistema" },
  { name: "Colecciones", sub: ["Mujer", "Hombre", "Accesorios", "Ediciones Especiales"] },
  { name: "Sostenibilidad", path: "/sostenibilidad" }
];
