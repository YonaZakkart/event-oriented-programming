// console.log("Hola pocho")

// let nombre = "Yo"
// let edad = 21
// let esEstudiante = true
// console.log(nombre, edad, esEstudiante)

//Condicional if
let nota: number = 6.2
if(nota >= 9.0){
    //Las instruucciones si la condicion se cumple.
    console.log("Excelente")
} else if (nota >= 6.0){
    console.log("Aprobado")
} else {
    console.log("Reprobado")
}

//Condicional con operador ternario
let edad: number= 21
let resultado: string = (edad >= 18) ? "Es mayor" : "Es menor"
console.log(resultado)

//Arreglos 
let materias: string[] = ["POE", "ASW", "Mate", "Estructura de datos"]
console.log(materias)

//forEach
materias.forEach((materia) =>{
    console.log("La materia es " + materia)
})

console.log(materias.join(", "))


// funciones
function sumar (a:number, b:number): number{
    return a+b;
}
console.log(`La suma es: ${sumar(5,7)}`)


function restar (a:number, b:number): number{
    return a-b;
}
console.log(`La resta es: ${restar(12,7)}`)


function multiplicar (a:number, b:number): number{
    return a*b;
}
console.log(`El resultadode la multiplicacion es: ${multiplicar(8,10)}`)


function dividir (a:number, b:number): number{
    return a/b;
}
console.log(`El resultadode la divicion es: ${dividir(100,10)}`)

//modelado o plantillas | creacion de objetos 

type Alumno = {
    nombre: string;
    edad: number;
    activo: boolean;
    telefono?: string
}

let nAlumno : Alumno = {
    nombre : "Yona",
    edad : 21,
    activo: false
}

