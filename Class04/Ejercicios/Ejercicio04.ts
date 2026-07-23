// Enunciado: Define un enum llamado EstadoUsuario con los valores: ACTIVO, INACTIVO, SUSPENDIDO. Luego crea una variable que use este enum.

enum EstadoUsuario {
  ACTIVO,
  INACTIVO,
  SUSPENDIDO
}

const estadoActual: EstadoUsuario = EstadoUsuario.ACTIVO;

console.log(estadoActual);
console.log(EstadoUsuario[estadoActual]);