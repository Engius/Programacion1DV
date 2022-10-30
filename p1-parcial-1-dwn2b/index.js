let discos = []
function cargarAlbum() {
    
    do {

        let disco = new Disco(ingresoDeDatos("el nombre del artista"), ingresoDeDatos("el nombre del album"), validarNumerosId(ingresoDeDatos("el ID del disco"), 1, 999))

        do {

            let cancion = ingresoDeDatos(`el nombre de la cancion`)
            disco.agregarCanciones(cancion)
            let duraciones = parseInt(`${ingresoDeDatos(`la duracion de la cancion`)}`)
            disco.agregarDuracion(duraciones)

        } while (confirm(`Lleva cargada(s) ${disco.canciones.length} cancion(es). Desea agregar mas canciones al disco?`))
        discos.push(disco);

    } while (confirm(`Lleva cargado(s) ${discos.length} disco(s). Desea cargar mas?`))
}

function mostrarAlbum() {
    let contenedor = document.querySelector(".contenedor");

    let html = ""

    for (let i = 0; i < discos.length; i++) {
        html += `<div class="disco">`
        html += `\n <h2>Artista: ${discos[i].nombre}</h2>`;
        html += `\n <p>ID #${discos[i].id} - Disco: ${discos[i].disco}</p>`;
        html += `\n <p>Canciones totales del disco: ${discos[i].canciones.length}`
        for (let j = 0; j < discos[i].canciones.length; j++) {
            html += `\n <div> <p>Cancion ${j + 1}: ${discos[i].canciones[j]}</p>`

            if (discos[i].duracion[j] >= 180) {
                html += `\n <p class=red>Duracion del tema: ${discos[i].duracion[j]}</p>`
            } else {
                html += `\n <p>Duracion del tema: ${discos[i].duracion[j]}</p>`
            }
            html += `</div>`
            
        }
        html += `<p>Duracion total del disco: ${discos[i].duracion.reduce((a, b) => a + b, 0)}</p>`
        html += `<p>El promedio de duracion es de: ${((discos[i].duracion.reduce((a, b) => a + b, 0) / discos[i].duracion.length)).toFixed(0) }</p>`
        html += `</div>`
    }

    contenedor.innerHTML = html
}