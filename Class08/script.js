"use strict";
/**
 * ================================================================
 * SPIDER-VERSE: REGISTRO DE HÉROES
 * Sistema de reclutamiento multiversal
 * ================================================================
 *
 * Este script maneja el registro de héroes del Spider-Verse,
 * permitiendo agregar, listar y eliminar reclutas del multiverso.
 * ================================================================
 */
// ================================================================
// PASO 2: REFERENCIAS A LOS ELEMENTOS DEL DOM
// ================================================================
// Explicar: en vez de escribir document.getElementById(...) una y otra
// vez por todo el archivo, lo hacemos UNA sola vez aquí y lo guardamos
// en un objeto llamado DOM. Así, si el HTML cambia, solo tocamos este bloque.
const DOM = {
    // Input donde se escribe el nombre del héroe
    txtNombre: document.getElementById('txtNombre'),
    // Select para elegir el universo de origen
    selectUniverso: document.getElementById('selectCarrera'),
    // Botón para reclutar un nuevo héroe
    btnAgregar: document.getElementById('btnAgregar'),
    // Botón para limpiar los campos del formulario
    btnLimpiar: document.getElementById('btnLimpiar'),
    // Contenedor (grid) donde se muestran las tarjetas de héroes
    listaHeroes: document.getElementById('listaEstudiantes'),
    // Párrafo que muestra el estado actual del sistema
    estado: document.getElementById('estado'),
    // Número que muestra cuántos héroes hay reclutados
    contadorHeroes: document.getElementById('contadorHeroes'),
    // Bloque que se muestra solo cuando NO hay héroes reclutados
    emptyState: document.getElementById('emptyState'),
    // Texto del footer que muestra el último universo reclutado
    dimensionFooter: document.getElementById('dimensionFooter')
};
// ================================================================
// PASO 3: ESTADO GLOBAL DE LA APLICACIÓN
// ================================================================
// Explicar: estas dos variables representan "la memoria" del programa.
// heroes guarda la lista completa; idCounter genera un id distinto
// para cada héroe nuevo (nunca se repite, siempre sube).
let heroes = []; // Arreglo con todos los héroes reclutados
let idCounter = 1; // Contador para asignar IDs únicos
// ================================================================
// PASO 4: ACTUALIZAR EL CONTADOR EN PANTALLA
// ================================================================
// Explicar: esta función NO agrega ni elimina nada, solo actualiza
// lo que se VE en pantalla según el estado actual del arreglo "heroes".
function actualizarContador() {
    const total = heroes.length;
    DOM.contadorHeroes.textContent = total.toString();
    // Si hay al menos un héroe, mostramos su universo en el footer
    if (heroes.length > 0) {
        const ultimoUniverso = heroes[heroes.length - 1].universo;
        DOM.dimensionFooter.textContent = ultimoUniverso;
    }
}
// ================================================================
// PASO 5: ACTUALIZAR EL MENSAJE DE ESTADO
// ================================================================
// Explicar: el parámetro "mensaje?" es OPCIONAL (el "?" lo indica).
// Si se lo pasamos, mostramos ese mensaje específico.
// Si NO se lo pasamos, calculamos un mensaje genérico según cuántos
// héroes hay en total.
function actualizarEstado(mensaje) {
    if (mensaje) {
        DOM.estado.textContent = mensaje;
        return;
    }
    const total = heroes.length;
    if (total === 0) {
        DOM.estado.textContent = 'Estado: Esperando reclutas del multiverso...';
    }
    else {
        // Explicar: usamos un operador ternario para agregar la "s" de plural
        // solo cuando corresponde ("1 héroe" vs "2 héroes")
        const plural = total > 1 ? 's' : '';
        DOM.estado.textContent = `Estado: ${total} héroe${plural} reclutado${plural} en el Spider-Verse`;
    }
}
// ================================================================
// PASO 6: MOSTRAR U OCULTAR EL "ESTADO VACÍO"
// ================================================================
// Explicar: classList.add/remove permite agregar o quitar una clase
// CSS desde TypeScript. La clase "hidden" (definida en el CSS) es la
// que hace que el bloque desaparezca.
function toggleEmptyState() {
    if (heroes.length === 0) {
        DOM.emptyState.classList.remove('hidden');
    }
    else {
        DOM.emptyState.classList.add('hidden');
    }
}
// ================================================================
// PASO 7: RENDERIZAR (DIBUJAR) LA LISTA DE HÉROES
// ================================================================
// Explicar: "renderizar" significa tomar los datos (el arreglo heroes)
// y convertirlos en HTML real dentro de la página. Esta función se
// vuelve a llamar CADA VEZ que el arreglo heroes cambia.
function renderizarHeroes() {
    // Muestra el estado del arreglo heroes en consola cada vez que se ejecuta esta función
    console.log('Estado actual del arreglo heroes:', heroes);
    // Caso 1: no hay héroes, dejamos el contenedor vacío
    if (heroes.length === 0) {
        DOM.listaHeroes.innerHTML = '';
        toggleEmptyState();
        actualizarContador();
        actualizarEstado();
        return;
    }
    // Caso 2: hay héroes, ocultamos el mensaje de "vacío"
    toggleEmptyState();
    // Explicar: .map() recorre el arreglo y convierte CADA héroe en un
    // string de HTML. Luego .join('') une todos esos strings en uno solo.
    // El atributo data-id guarda el id del héroe dentro del propio HTML,
    // para poder identificarlo después al hacer clic en "Expulsar".
    DOM.listaHeroes.innerHTML = heroes.map(heroe => `
    <div class="hero-card ${heroe.esFavorito ? 'favorito' : ''}" data-id="${heroe.id}">
        <div class="hero-info">
            <span class="hero-name">${heroe.nombre}</span>
            <span class="hero-universe">
                Origen: <span class="dimension-badge">${heroe.universo}</span>
            </span>
        </div>
        <div class="hero-actions">
            <button class="btn-favorito" data-id="${heroe.id}">
                ${heroe.esFavorito ? '★ Quitar de favoritos' : '☆ Marcar como favorito'}
            </button>
            <button class="btn-eliminar" data-id="${heroe.id}">
                Expulsar
            </button>
        </div>
    </div>
`).join('');
    actualizarContador();
    actualizarEstado();
    // Límite de 6 héroes: deshabilita o habilita el botón según el total
    if (heroes.length >= 6) {
        DOM.btnAgregar.disabled = true;
        actualizarEstado('Limite de equipo alcanzado (maximo 6 héroes)');
    }
    else {
        DOM.btnAgregar.disabled = false;
    }
    // IMPORTANTE: los botones "Expulsar" que acabamos de crear con
    // innerHTML NO tienen todavía ningún addEventListener propio.
    // Por eso usamos DELEGACIÓN DE EVENTOS (ver setupEliminarHeroes).
}
// ================================================================
// PASO 8: DELEGACIÓN DE EVENTOS PARA LOS BOTONES "EXPULSAR"
// ================================================================
// Explicar: en vez de poner un addEventListener en CADA botón nuevo
// (que además se borran y se vuelven a crear todo el tiempo), ponemos
// UN SOLO listener en el contenedor padre (listaHeroes). Cuando se hace
// clic en cualquier parte adentro, revisamos si el clic fue sobre un
// botón "Expulsar" usando closest().
function setupEliminarHeroes() {
    DOM.listaHeroes.addEventListener('click', (event) => {
        const target = event.target;
        // closest() busca hacia "arriba" en el HTML hasta encontrar
        // un elemento con la clase .btn-eliminar (o devuelve null si no hay)
        const btnEliminar = target.closest('.btn-eliminar');
        if (btnEliminar) {
            const id = parseInt(btnEliminar.getAttribute('data-id') || '0');
            if (id > 0) {
                eliminarHeroe(id);
            }
        }
        // Detección del botón Favorito
        const btnFavorito = target.closest('.btn-favorito');
        if (btnFavorito) {
            const id = parseInt(btnFavorito.getAttribute('data-id') || '0');
            if (id > 0) {
                toggleFavorito(id);
            }
        }
    });
}
// ================================================================
// PASO 9: ELIMINAR UN HÉROE POR SU ID
// ================================================================
// Explicar: find() busca UN elemento que cumpla la condición (para
// poder mostrar su nombre en el mensaje). filter() crea un arreglo
// NUEVO con todos los héroes MENOS el que tiene ese id.
function eliminarHeroe(id) {
    const heroeEliminado = heroes.find(h => h.id === id);
    heroes = heroes.filter(heroe => heroe.id !== id);
    renderizarHeroes();
    if (heroeEliminado) {
        actualizarEstado(`${heroeEliminado.nombre} ha sido expulsado del Spider-Verse`);
    }
}
function toggleFavorito(id) {
    const heroe = heroes.find(h => h.id === id);
    if (heroe) {
        heroe.esFavorito = !heroe.esFavorito;
        renderizarHeroes();
    }
}
// ================================================================
// PASO 10: AGREGAR UN NUEVO HÉROE
// ================================================================
// Explicar: esta es la función principal del formulario. Primero VALIDA
// que el nombre no esté vacío; si está vacío, avisa y se detiene con
// "return" (no sigue ejecutando el resto de la función).
function agregarHeroe() {
    const nombre = DOM.txtNombre.value.trim();
    const universo = DOM.selectUniverso.value;
    // Validación: si el campo nombre está vacío, mostramos aviso y salimos
    if (nombre === '') {
        actualizarEstado('Ingresa un alias o nombre para el héroe');
        DOM.txtNombre.focus();
        // Efecto visual temporal: el borde se pone rojo 2 segundos
        DOM.txtNombre.style.borderColor = 'var(--spider-red)';
        setTimeout(() => {
            DOM.txtNombre.style.borderColor = '';
        }, 2000);
        return;
    }
    //Validacion de limite de caracteres
    if (nombre.length > 20) {
        actualizarEstado(`¡Error! El nombre no debe superar los 20 caracteres (actual: ${nombre.length})`);
        DOM.txtNombre.focus();
        DOM.txtNombre.style.borderColor = 'var(--spider-red)';
        setTimeout(() => {
            DOM.txtNombre.style.borderColor = '';
        }, 2000);
        return;
    }
    // Validación: Nombre duplicado
    const existeDuplicado = heroes.some(heroe => heroe.nombre.toLowerCase() === nombre.toLowerCase());
    if (existeDuplicado) {
        actualizarEstado(`El héroe "${nombre}" ya está registrado`);
        DOM.txtNombre.focus();
        DOM.txtNombre.style.borderColor = 'var(--spider-red)';
        setTimeout(() => {
            DOM.txtNombre.style.borderColor = '';
        }, 2000);
        return;
    }
    // Validación 4: Límite de héroes por si se intenta enviar con la tecla Enter
    if (heroes.length >= 6) {
        actualizarEstado('No se pueden agregar más héroes. Límite alcanzado [6]');
        return;
    }
    // Creamos el objeto héroe siguiendo la interfaz definida en el Paso 1
    const nuevoHeroe = {
        id: idCounter++, // usamos el contador y LUEGO lo incrementamos
        nombre: nombre,
        universo: universo,
        esFavorito: false // inicializado por defecto en false
    };
    heroes.push(nuevoHeroe);
    DOM.txtNombre.value = '';
    DOM.txtNombre.focus();
    renderizarHeroes();
    actualizarEstado(`${nombre} ha sido reclutado en el Spider-Verse`);
}
// ================================================================
// PASO 11: LIMPIAR LOS CAMPOS DEL FORMULARIO
// ================================================================
// Explicar: esta función NO toca el arreglo heroes, solo resetea
// lo que el usuario ve en el formulario (sin agregar ni eliminar nada).
function limpiarCampos() {
    DOM.txtNombre.value = '';
    DOM.selectUniverso.selectedIndex = 0;
    DOM.txtNombre.focus();
    actualizarEstado('Campos limpiados. Listo para nuevo recluta');
}
// ================================================================
// PASO 12: INICIALIZACIÓN — CONECTAR TODOS LOS EVENTOS
// ================================================================
// Explicar: esta función es la que "arma" toda la aplicación,
// conectando cada botón/input con la función que le corresponde.
// Se ejecuta una sola vez, cuando la página termina de cargar.
function init() {
    const ahora = new Date().toLocaleString();
    console.log(`Iniciando sistema de reclutamiento Spider-Verse... [${ahora}]`);
    // Clic en "Reclutar"
    DOM.btnAgregar.addEventListener('click', agregarHeroe);
    // Clic en "Limpiar"
    DOM.btnLimpiar.addEventListener('click', limpiarCampos);
    // Permitir reclutar presionando la tecla Enter dentro del input
    DOM.txtNombre.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // evita comportamiento por defecto del navegador
            agregarHeroe();
        }
    });
    // Activar la delegación de eventos para los botones "Expulsar"
    setupEliminarHeroes();
    // Estado inicial de la página al cargar (sin héroes todavía)
    actualizarEstado();
    toggleEmptyState();
    console.log('Sistema Spider-Verse listo para reclutar héroes multiversales');
    console.log(`${DOM.selectUniverso.options.length} universos disponibles para reclutamiento`);
}
// ================================================================
// PASO 13: PUNTO DE ENTRADA DEL PROGRAMA
// ================================================================
// Explicar: 'DOMContentLoaded' es un evento del navegador que se
// dispara cuando TODO el HTML ya terminó de cargar. Es importante
// esperar a este evento, porque si init() se ejecutara antes, los
// document.getElementById(...) del Paso 2 devolverían null
// (el HTML todavía no existiría).
document.addEventListener('DOMContentLoaded', init);
