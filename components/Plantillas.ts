export const plantillas = [
  {
    id: 1,
    nombre: "Carta formal",
    prompt: (texto: string) => `
Eres un redactor profesional. Convierte el siguiente contenido en una carta formal:

"${texto}"
    `
  },
  {
    id: 2,
    nombre: "Mensaje emocional",
    prompt: (texto: string) => `
Eres un escritor emocional. Convierte el siguiente contenido en un mensaje emotivo y profundo:

"${texto}"
    `
  },
  {
    id: 3,
    nombre: "Texto técnico",
    prompt: (texto: string) => `
Eres un analista técnico. Convierte el siguiente contenido en un texto técnico y profesional:

"${texto}"
    `
  },
  {
    id: 4,
    nombre: "Descripción de producto",
    prompt: (texto: string) => `
Eres un copywriter experto en productos. Convierte el siguiente contenido en una descripción de producto clara y atractiva:

"${texto}"
    `
  }
];
