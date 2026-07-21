"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hola desde Ts!");
let nombre = "Yona";
let miEdad = 21;
let esEstudiante = true;
console.log(nombre, miEdad, esEstudiante);
//Condicional if
let nota = 6.2;
if (nota >= 9.0) {
    //Las instruucciones si la condicion se cumple.
    console.log("Excelente");
}
else if (nota >= 6.0) {
    console.log("Aprobado");
}
else {
    console.log("Reprobado");
}
//Condicional con operador ternario
let edad = 21;
let resultado = (edad >= 18) ? "Es mayor" : "Es menor";
console.log(resultado);
//Arreglos 
let materias = ["POE", "ASW", "Mate", "Estructura de datos"];
console.log(materias);
//forEach
materias.forEach((materia) => {
    console.log("La materia es " + materia);
});
console.log(materias.join(", "));
// funciones
function sumar(a, b) {
    return a + b;
}
console.log(`La suma es: ${sumar(5, 7)}`);
function restar(a, b) {
    return a - b;
}
console.log(`La resta es: ${restar(12, 7)}`);
function multiplicar(a, b) {
    return a * b;
}
console.log(`El resultadode la multiplicacion es: ${multiplicar(8, 10)}`);
function dividir(a, b) {
    return a / b;
}
console.log(`El resultadode la divicion es: ${dividir(100, 10)}`);
let nAlumno = {
    nombre: "Yona",
    edad: 21,
    activo: false
};
//# sourceMappingURL=index.js.map