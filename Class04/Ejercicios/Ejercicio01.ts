// Enunciado: Dado un arreglo de productos con nombre y precio, usa .map() para crear un nuevo arreglo que incluya un descuento del 10% a cada precio.

const productos = [
    { nombre: "Laptop", precio: 800 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Teclado", precio: 60 }
];

const productosConDescuento = productos.map((p) => ({
    nombre: p.nombre,
    precio: p.precio - (p.precio * 0.10)
}))

console.log("Lista de productos con 10% de descuento!")
console.log(productosConDescuento)