"use strict";
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(eventName, handler) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(handler);
    }
    emit(eventName, ...args) {
        const handlers = this.listeners[eventName] ?? [];
        handlers.forEach((handler) => handler(...args));
    }
}
//clase Biblioteca 
class Biblioteca extends EventEmitter {
    constructor() {
        super(...arguments);
        this.libros = [];
        this._idCounter = 1;
    }
    getLibros() {
        return this.libros;
    }
    //agregar Libro
    agregarLibro(libroData) {
        const nuevoLibro = {
            ...libroData,
            id: this._idCounter++,
            disponible: libroData.ejemplares > 0,
            esFavorito: false
        };
        this.libros.push(nuevoLibro);
        this.emit("libroAgregado", nuevoLibro, this.libros);
    }
    solicitarPrestamo(id) {
        const libro = this.libros.find(l => l.id === id);
        if (!libro)
            return;
        if (libro.ejemplares > 0) {
            libro.ejemplares--;
            libro.disponible = libro.ejemplares > 0;
            this.emit("prestamoExitoso", libro, this.libros);
        }
        else {
            this.emit("noDisponible", libro, this.libros);
        }
    }
    // metodo de devolver libro
    devolverLibro(id) {
        const libro = this.libros.find(l => l.id === id);
        if (!libro)
            return;
        libro.ejemplares++;
        libro.disponible = true;
        this.emit("devolucionExitosa", libro, this.libros);
    }
    toggleFavorito(id) {
        const libro = this.libros.find(l => l.id === id);
        if (libro) {
            libro.esFavorito = !libro.esFavorito;
            this.emit("estadoCambiado", this.libros);
        }
    }
}
//la clase Notificador Biblioteca
class NotificadorBiblioteca {
    notificarNuevoLibro(libro) {
        console.log(`Nuevo libro registrado: "${libro.titulo}" de ${libro.autor}`);
    }
    notificarPrestamo(libro) {
        console.log(`Prestamo concedido: "${libro.titulo}". Quedan ${libro.ejemplares} ejemplares`);
    }
    notificarNoDisponible(libro) {
        console.warn(`Préstamo fallido: No hay ejemplares de "${libro.titulo}"`);
    }
    notificarDevolucion(libro) {
        console.log(`Libro devuelto: "${libro.titulo}", Stock: ${libro.ejemplares}`);
    }
}
// clase Gestor
class GestorUIBiblioteca {
    constructor() {
        this.contenedor = document.querySelector("#contenedor-libros");
        this.contador = document.querySelector("#contador-libros");
        this.mensajeArea = document.querySelector("#mensaje-area");
    }
    renderizarLibros(libros) {
        this.contenedor.innerHTML = "";
        libros.forEach(libro => {
            const card = document.createElement("div");
            card.className = `card ${libro.esFavorito ? 'favorito' : ''}`;
            card.innerHTML = `
        <button class="btn-fav" data-id="${libro.id}">${libro.esFavorito ? '★' : '☆'}</button>
        <span class="badge">${libro.categoria}</span>
        <h3>${libro.titulo}</h3>
        <p><strong>Autor:</strong> ${libro.autor}</p>
        <p><strong>Año:</strong> ${libro.anio}</p>
        <p><strong>Disponibles:</strong> ${libro.ejemplares}</p>
        <div class="card-actions">
          <button class="btn-prestar" data-id="${libro.id}" ${libro.ejemplares === 0 ? 'disabled' : ''}>Prestar</button>
          <button class="btn-devolver" data-id="${libro.id}">Devolver</button>
        </div>
      `;
            this.contenedor.appendChild(card);
        });
    }
    actualizarContador(libros) {
        const total = libros.length;
        const disponibles = libros.filter(l => l.ejemplares > 0).length;
        this.contador.textContent = `Total: ${total} | Disponibles para préstamo: ${disponibles}`;
    }
    mostrarMensaje(mensaje, tipo) {
        this.mensajeArea.className = tipo;
        this.mensajeArea.textContent = mensaje;
        setTimeout(() => {
            this.mensajeArea.className = "";
            this.mensajeArea.textContent = "";
        }, 4000);
    }
}
// Instancias
const biblioteca = new Biblioteca();
const notificador = new NotificadorBiblioteca();
const ui = new GestorUIBiblioteca();
//Suscripciones con .on()
biblioteca.on("libroAgregado", (libro, libros) => {
    notificador.notificarNuevoLibro(libro);
    ui.mostrarMensaje(`Libro "${libro.titulo}" agregado correctamente`, "exito");
    aplicarFiltrosYRenderizar(libros);
});
biblioteca.on("prestamoExitoso", (libro, libros) => {
    notificador.notificarPrestamo(libro);
    ui.mostrarMensaje(`Préstamo procesado para "${libro.titulo}"`, "exito");
    aplicarFiltrosYRenderizar(libros);
});
biblioteca.on("noDisponible", (libro) => {
    notificador.notificarNoDisponible(libro);
    ui.mostrarMensaje(`No hay ejemplares disponibles de "${libro.titulo}"`, "error");
});
biblioteca.on("devolucionExitosa", (libro, libros) => {
    notificador.notificarDevolucion(libro);
    ui.mostrarMensaje(`Devolución exitosa de "${libro.titulo}"`, "info");
    aplicarFiltrosYRenderizar(libros);
});
biblioteca.on("estadoCambiado", (libros) => {
    aplicarFiltrosYRenderizar(libros);
});
// Variables de Estado ui
let filtroCategoriaActual = "TODAS";
let soloDisponiblesFiltro = false;
let criterioOrden = null;
function aplicarFiltrosYRenderizar(libros) {
    let resultado = [...libros];
    if (filtroCategoriaActual !== "TODAS") {
        resultado = resultado.filter(l => l.categoria === filtroCategoriaActual);
    }
    if (soloDisponiblesFiltro) {
        resultado = resultado.filter(l => l.ejemplares > 0);
    }
    if (criterioOrden === 'titulo') {
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }
    else if (criterioOrden === 'autor') {
        resultado.sort((a, b) => a.autor.localeCompare(b.autor));
    }
    ui.renderizarLibros(resultado);
    ui.actualizarContador(libros);
}
// Eventos DOM
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form-libro");
    const selectCategoria = document.querySelector("#filtro-categoria");
    const btnOrdenTitulo = document.querySelector("#btn-orden-titulo");
    const btnOrdenAutor = document.querySelector("#btn-orden-autor");
    const btnSoloDisponibles = document.querySelector("#btn-solo-disponibles");
    const contenedorLibros = document.querySelector("#contenedor-libros");
    // Agregar libro desde formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const titulo = document.querySelector("#titulo").value;
        const autor = document.querySelector("#autor").value;
        const categoria = document.querySelector("#categoria").value;
        const anio = parseInt(document.querySelector("#anio").value);
        const ejemplares = parseInt(document.querySelector("#ejemplares").value);
        biblioteca.agregarLibro({ titulo, autor, categoria, anio, ejemplares });
        form.reset();
    });
    // Eventos de Tarjetas 
    contenedorLibros.addEventListener("click", (e) => {
        const target = e.target;
        const id = Number(target.getAttribute("data-id"));
        if (!id)
            return;
        if (target.classList.contains("btn-prestar")) {
            biblioteca.solicitarPrestamo(id);
        }
        else if (target.classList.contains("btn-devolver")) {
            biblioteca.devolverLibro(id);
        }
        else if (target.classList.contains("btn-fav")) {
            biblioteca.toggleFavorito(id);
        }
    });
    // Filtro por categoría
    selectCategoria.addEventListener("change", () => {
        filtroCategoriaActual = selectCategoria.value;
        aplicarFiltrosYRenderizar(biblioteca.getLibros());
    });
    // Ordenar por Título
    btnOrdenTitulo.addEventListener("click", () => {
        criterioOrden = 'titulo';
        aplicarFiltrosYRenderizar(biblioteca.getLibros());
    });
    // Ordenar por Autor
    btnOrdenAutor.addEventListener("click", () => {
        criterioOrden = 'autor';
        aplicarFiltrosYRenderizar(biblioteca.getLibros());
    });
    // Mostrar Solo Disponibles
    btnSoloDisponibles.addEventListener("click", () => {
        soloDisponiblesFiltro = !soloDisponiblesFiltro;
        btnSoloDisponibles.style.background = soloDisponiblesFiltro ? "#d4af37" : "#0a192f";
        btnSoloDisponibles.style.color = soloDisponiblesFiltro ? "#0a192f" : "#fff";
        aplicarFiltrosYRenderizar(biblioteca.getLibros());
    });
    // Carga Inicial de Datos de Prueba
    const librosIniciales = [
        { titulo: "El arte de la guerra", autor: "Sun Tzu", categoria: "HISTORIA", anio: 500, ejemplares: 4 },
    ];
    librosIniciales.forEach(l => biblioteca.agregarLibro(l));
});
console.log("Sistema de Gestión de Biblioteca UNIVO iniciado");
//# sourceMappingURL=script.js.map