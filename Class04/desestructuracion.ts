type Usuario = {
    username: string,
    rol: string,
    experiencia: number
}

let Desarrollador : Usuario ={
    username: "Yona",
    rol: "Backend",
    experiencia: 1
}

// forma tradicional
let nombre = Desarrollador.username;
let Rol = Desarrollador.rol;
console.log(`Nombre: ${nombre}, Rol: ${Rol}`)

const {username,rol} = Desarrollador;
console.log(`Nombre: ${username}, Rol: ${rol}`)

let coord: [number, number] = [146.23, -87.34];

const [latitud, longitud] = coord;

console.log(`Latitud: ${latitud}`);
console.log(`Longitud: ${longitud}`);