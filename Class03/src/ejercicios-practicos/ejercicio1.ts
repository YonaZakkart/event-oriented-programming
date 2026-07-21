// Enunciado: Crea un molde para registrar a los asistentes de un seminario de la universidad. El nombre y la carrera son obligatorios, pero el correo electrónico y el número de asiento asignado son opcionales. Crea dos asistentes (uno con datos completos y otro sin los opcionales) y usa condicionales para imprimirlos de forma limpia.

interface Asistente {
  nombre: string;
  carrera: string;
  email?: string;
  asiento?: number;
}

const asistente1: Asistente = {
  nombre: "Yona",
  carrera: "Ingenieria en Software",
  email: "yona@gmail.com",
  asiento: 14
};

const asistente2: Asistente = {
  nombre: "Carlos",
  carrera: "Ingenieria en Software"
};

function imprimirAsistente(a: Asistente): void {
  console.log(`\nNombre: ${a.nombre} | Carrera: ${a.carrera}`);
  console.log(a.email ? `Email: ${a.email}` : "Email: no registrado");
  console.log(a.asiento ? `Asiento: ${a.asiento}` : "Asiento: no asignado");
}

imprimirAsistente(asistente1);
imprimirAsistente(asistente2);