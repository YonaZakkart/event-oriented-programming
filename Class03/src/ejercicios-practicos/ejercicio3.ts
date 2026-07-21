// Enunciado: Crea una función flecha que calcule el precio de la entrada a un evento universitario. La función debe recibir obligatoriamente el precio base y el tipo de boleto ("GENERAL" o "VIP"). Además, debe recibir un código de descuento de estudiante que es opcional.

// Si el boleto es "VIP" se le suman $20 al costo.
// Si el usuario pasa el código opcional "ESTUDIANTE", se le aplica un 50% de descuento al total.

const calcularPrecio = (precioBase: number, tipo: string, codigo?: string): number => {
  let total = precioBase;

  if (tipo === "VIP") {
    total += 20;
  }

  if (codigo === "ESTUDIANTE") {
    total = total * 0.5;
  }

  return total;
};

console.log(`Entrada general: $${calcularPrecio(30, "GENERAL")}`);
console.log(`Entrada VIP: $${calcularPrecio(30, "VIP")}`);
console.log(`Entrada VIP con descuento: $${calcularPrecio(30, "VIP", "ESTUDIANTE")}`);