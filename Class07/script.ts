//buscar elementos o componentes de html

const boton = document.getElementById("btnAgregar") as HTMLButtonElement;
const cajaTexto = document.getElementById("txtNombre") as HTMLInputElement;
const etiqueta = document.getElementById("lblEstado") as HTMLHeadingElement;
const lista = document.getElementById("lista") as HTMLUListElement;

//Registro de los eventos
boton.addEventListener("click", AgregarNombre);

function AgregarNombre():void{
    //Verificar si hay un nombre
    if (cajaTexto.value.trim()==="") {
        alert("Debe de escribir un Nombre");
        return;
    }
}