class Disco {
    nombre;
    disco;
    id;
    canciones;
    duracion;
    constructor(nombre, disco, id) {
        this.nombre = nombre;
        this.disco = disco;
        this.id = id;
        this.canciones = [];
        this.duracion = [];
    }

    agregarCanciones(cancion) {
        let flag = false
        do {
            if (cancion == undefined || cancion === "") {
                alert("La cancion no puede estar vacia")
                cancion = ingresoDeDatos("el nombre de la cancion")
            } else if (cancion > 7999 || cancion < 1) {

            } else {
                this.canciones.push(cancion)
                flag = true
            }
        } while (!(flag == true));
    }

    agregarDuracion(duracion) {
        let flag = false;
        do {
            if (isNaN(duracion) || duracion == "") {
                duracion = ingresoDeDatos("la duracion de la cancion (en segundos)")
            } else if (duracion >= 7200 || duracion < 0) {
                alert("La duracion debe ser entre 0 y 7200 segundos.")
                duracion = ingresoDeDatos("la duracion de la cancion (en segundos)")
            } else {
                flag = true
                this.duracion.push(duracion)
            }
        } while (!(flag == true))
    }
}

/**
 * Se solicita los datos a ingresar
 * @param {string} tipoDeDato Se indica el tipo de dato a solicitar
 * @returns Dato ingresado por usuario
 */
function ingresoDeDatos(tipoDeDato) {
    let flag = true
    let dato = ""
    do{
        flag =true
        dato = prompt(`Ingrese ${tipoDeDato}`)
        if(dato === ""){
            alert(`Atencion: ${tipoDeDato} no puede estar vacio.`)
            flag = false
        }
    }while(!(flag == true))
    return dato;
}

/**
 * Se valida y verifica que el valor de ID ingresado por el usuario no este repetido en los objetos y que este dentro de los parametros asignados.
 * @param {number} numEvaluar Valor de ID ingresado por usuario
 * @param {*} minNum Valor minimo a validar
 * @param {*} maxNum Valor maximo a validar
 * @returns Numero validado y verificado que no se encuentre en los distintos objetos.
 */
function validarNumerosId(numEvaluar, minNum, maxNum) {
    let flag = false
    do {
        let ids = [];
        if (numEvaluar > maxNum || numEvaluar < minNum || isNaN(numEvaluar)) {
            alert(`El numero debe estar entre ${minNum} y ${maxNum}`)
        } else {
            flag = true

            for (i = 0; i < discos.length; i++) {
                ids[i] = discos[i].id
            }

            if (ids.indexOf(numEvaluar) !== -1) {
                alert("El numero de ID ya se encuentra utilizado")
                flag = false
            }
        }

        if (flag == false) {
            numEvaluar = prompt("Ingrese nuevamente el ID")
        }

    } while (!(flag == true))
    return numEvaluar;
}

function mostrarAlbumPorId(idSolicitado) {
    let contenedor = document.querySelector(".contenedor");

    let html = ""
    flag = true
    for (let i = 0; i < discos.length; i++) {
        const element = discos[i].id
        if (element == idSolicitado) {
            flag = false
            html += `<div class="disco">`
            html += `\n <h2>Artista: ${discos[i].nombre}</h2>`;
            html += `\n <p>ID #${discos[i].id} - Disco: ${discos[i].disco}</p>`;
            html += `\ <p>Canciones totales del disco: ${discos[i].canciones.length}</p>`
            for (let j = 0; j < discos[i].canciones.length; j++) {
                html += `\n <div> <p>Cancion ${j + 1}: ${discos[i].canciones[j]}</p>`

                if (discos[i].duracion[j] >= 180) {
                    html += `\n <p class=red>Duracion del tema: ${discos[i].duracion[j]} </p>`
                } else {
                    html += `\n <p> Duracion del tema: ${discos[i].duracion[j]} </p>`
                }
                html += `</div>`

            }

            html += `<p>Duracion total del disco: ${discos[i].duracion.reduce((a, b) => a + b, 0)}</p>`
            html += `<p>El promedio de duracion es de: ${((discos[i].duracion.reduce((a, b) => a + b, 0) / discos[i].duracion.length)).toFixed(0) }</p>`
            html += `</div>`
            contenedor.innerHTML = html


        }
    }
    if(flag == true){
        alert("El numero de ID no se encontro.")
    }
}
