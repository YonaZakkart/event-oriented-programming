# Sesion 4 — Metodos de Arreglos, Desestructuración y Enumeraciones

Ejercicios prácticos de TypeScript sobre map(), filter(), desestructuración y enum. Programación Orientada a Eventos (POE).

## Opcion 1 — Ejecutar directo con tsx

### Requisitos previos
- Node.js instalado
- tsx instalado globalmente

### Instalación
```bash
npm install -g tsx
```

### Pasos
1. Descargar esta carpeta o crear una nueva y copiar los archivos `.ts`.
2. Abrir una terminal en la carpeta donde están los archivos.
3. Ejecutar para cada archivo:
```bash
npx tsx nombreArchivo.ts
```

## Opción 2 — Compilar con TypeScript

### Requisitos previos
- Node.js instalado

### Pasos
1. Crear una carpeta para el proyecto y abrir una terminal dentro de ella.
2. Inicializar el proyecto e instalar TypeScript:
```bash
npm init -y
npm install -D typescript
npx tsc --init --target ES6 --module commonjs
```
3. En `tsconfig.json`, descomentar `rootDir` y `outDir`.
4. Crear una carpeta `src/` y colocar dentro los archivos `.ts` (o copiar los de este repositorio).
5. Compilar:
```bash
npx tsc
```
6. Ejecutar para cada archivo:
```bash
node dist/nombreArchivo.js
```

## Descripción de los ejercicios

### Archivo: Ejercicios/Ejercicio01.ts
**Conceptos clave:** map(), inmutabilidad, transformación de datos.
**Descripción:** aplica un descuento del 10% a una lista de productos generando un nuevo arreglo, sin modificar el original.

### Archivo: Ejercicios/Ejercicio02.ts
**Conceptos clave:** filter(), condiciones de filtrado.
**Descripción:** filtra productos con precio superior a $50, generando un nuevo arreglo con posible menor cantidad de elementos.

### Archivo: Ejercicios/Ejercicio03.ts
**Conceptos clave:** desestructuración de objetos, desestructuración anidada.
**Descripción:** extrae propiedades individuales de un objeto evento, incluyendo un objeto anidado (coordenadas), en variables independientes.

### Archivo: Ejercicios/Ejercicio04.ts
**Conceptos clave:** enum, mapeo inverso.
**Descripción:** define un enum con los estados posibles de un usuario y demuestra su uso junto con la obtención del nombre legible a partir del valor numérico.