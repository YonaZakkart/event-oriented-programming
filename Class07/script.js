"use strict";
//buscar elementos o componentes de html
const boton = document.getElementById("btnAgregar");
const cajaTexto = document.getElementById("txtNombre");
const etiqueta = document.getElementById("lblEstado");
const lista = document.getElementById("lista");
//Registro de los eventos
boton.addEventListener("click", AgregarNombre);
function AgregarNombre() {
    //Verificar si hay un nombre
    if (cajaTexto.value.trim() === "") {
        alert("Debe de escribir un Nombre");
        return;
    }
    //cambiar estado de etiqueta
    etiqueta.textContent = "ultimo registro: " + cajaTexto.value; //el valor, lo que esta o se agrego en la caja de texto
    //crear nuevo elemento para la lista
    const elemento = document.createElement("li");
    //agregar texto a los elementos
    elemento.textContent = cajaTexto.value;
    //insertar elementos a la lista
    lista.appendChild(elemento);
    //limpiar el texto
    cajaTexto.value = "";
    //colocar el cursor nuevamente en la caja de texto
    cajaTexto.focus();
}
