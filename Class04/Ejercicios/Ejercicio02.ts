// Enunciado: Usando el mismo arreglo de productos, usa .filter() para crear un nuevo arreglo con los productos que cuesten más de $50.

const listaProductos = [ 
  { nombre: "Laptop", precio: 800 },
  { nombre: "Mouse", precio: 25 },
  { nombre: "Monitor", precio: 200 },
  { nombre: "USB", precio: 15 }
];

const precioAlto = listaProductos.filter((precioA) => precioA.precio > 50 )
console.log("Los precios altos son: ")
console.log(precioAlto)