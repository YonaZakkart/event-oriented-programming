//lista de precios para ser modificados con .map y .filter
let preciosBase: number[] = [100, 200, 250, 80, 550]

//utilizando .map vamos a tomar cada elemento y lo vamos a modificar
// IVA del 13% a cada precio base
let precioConIVA: number[] = preciosBase.map((precio) => precio * 1.13);

console.log(`
    Precios Base: $${preciosBase}
    Precios con IVA: $${precioConIVA}`)

//Imprimir uno por uno
preciosBase.forEach((precios) =>{
    console.log("El precio base es $" + precios)
})
precioConIVA.forEach((precios) =>{
    console.log("El precio con IVA incluido es $" + precios)
})

//imprimir precio base y precio con IVA juntos
preciosBase.forEach((precioBase, precioIVA) => {
    let precioFinal = precioConIVA[precioIVA];
    console.log(`El precio base es $${precioBase} y con IVA es $${precioFinal.toFixed(2)}`);
});

//flitrar precios arriba de $200
let preciosAltos : number[] = preciosBase.filter((precioA) => precioA > 200);
console.log(`Los precios altos son: ${preciosAltos}`)