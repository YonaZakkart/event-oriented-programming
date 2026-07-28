# Sesión 5 — Sistema de Eventos con EventEmitter

Implementación de un sistema de coordinación basado en eventos utilizando EventEmitter de Node.js. -- Programación Orientada a Eventos (POE).

## Obtener el proyecto

Clonar el repositorio:
```bash
git clone [URL del repositorio]
```

O descargar el ZIP desde GitHub (botón "Code" → "Download ZIP") y descomprimir en una carpeta local.

## Instalación

Dentro de la carpeta del proyecto:
```bash
npm install
```

Si el proyecto se inicia desde cero (sin `package.json`/`node_modules` incluidos):
```bash
npm init -y
npm install -D typescript tsx @types/node
```

## Ejecución

```bash
npx tsx script.ts
npx tsx patrullaje.ts
```

## Descripción de los archivos

### script.ts (ejemplo del tutor)
**Conceptos clave:** EventEmitter, herencia (extends), emit(), on(), interface, tipos unión.
**Descripción:** implementa una central de policía (`CentralPoliciaNY`) que hereda de EventEmitter. Al reportar un incidente mediante `reportarIncidente()`, emite el evento `crimenEnProceso` con los datos tipados según la interfaz `AlertaCrimen`. Dos oyentes independientes (`SpiderMan` y `PeriodicoDailyBugle`) se suscriben al mismo evento y reaccionan cada uno con su propia lógica, sin que la central tenga conocimiento de su existencia.

### patrullaje.ts (ejercicio práctico)
**Conceptos clave:** EventEmitter, herencia, tipos unión múltiples, suscripción con múltiples oyentes, desacoplamiento, Publish/Subscribe.
**Descripción:** implementa un sistema de patrullaje vecinal (`CentralVecinal`) que hereda de EventEmitter. Al reportar un incidente, emite el evento `alertaVecinal` con los datos tipados según la interfaz `ReporteVecinal`. Cuatro oyentes independientes (`PatrullaSpider`, `AmbulanciaComunitaria`, `VecinosVigilantes`, `ConsejoDelBarrio`) se suscriben al mismo evento mediante `.on()`, y cada uno reacciona con lógica propia según el tipo de incidente y su nivel de urgencia, demostrando desacoplamiento total entre el emisor y los receptores.