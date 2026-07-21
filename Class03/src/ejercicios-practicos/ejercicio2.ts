// Enunciado: Crea una lista de productos de tecnología. Cada producto tiene un nombre y un precio, pero el descuento es opcional. Recorre la lista con un bucle forEach y calcula el precio final que pagará el usuario usando un operador ternario.

interface Producto {
  nombre: string;
  precio: number;
  descuento?: number;
}

const productos: Producto[] = [
  { nombre: "Mouse", precio: 25 },
  { nombre: "Teclado", precio: 60, descuento: 0.1 },
  { nombre: "Monitor", precio: 180, descuento: 0.15 }
];

productos.forEach((p) => {
  const precioFinal = p.precio - (p.descuento ? p.precio * p.descuento : 0);
  console.log(`${p.nombre}: $${precioFinal.toFixed(2)}`);
});