"use strict";
// Enunciado: Crea un molde para registrar a los asistentes de un seminario de la universidad. El nombre y la carrera son obligatorios, pero el correo electrónico y el número de asiento asignado son opcionales. Crea dos asistentes (uno con datos completos y otro sin los opcionales) y usa condicionales para imprimirlos de forma limpia.
Object.defineProperty(exports, "__esModule", { value: true });
const asistente1 = {
    nombre: "Yona",
    carrera: "Ingenieria en Software",
    email: "yona@gmail.com",
    asiento: 14
};
const asistente2 = {
    nombre: "Carlos",
    carrera: "Ingenieria en Software"
};
function imprimirAsistente(a) {
    console.log(`\nNombre: ${a.nombre} | Carrera: ${a.carrera}`);
    console.log(a.email ? `Email: ${a.email}` : "Email: no registrado");
    console.log(a.asiento ? `Asiento: ${a.asiento}` : "Asiento: no asignado");
}
imprimirAsistente(asistente1);
imprimirAsistente(asistente2);
//# sourceMappingURL=ejercicio1.js.map