// Enunciado: Dado un objeto que representa un evento, usa desestructuración para extraer sus propiedades en variables individuales.

const evento = {
  tipo: "CLICK",
  coordenadas: { x: 100, y: 200 },
  usuario: "Ana"
};

const { tipo, coordenadas: { x, y }, usuario } = evento;

console.log(`Tipo: ${tipo}, X: ${x}, Y: ${y}, Usuario: ${usuario}`);