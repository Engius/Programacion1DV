"use sctrict"
// Promedio de edad general
// Promedio de edad de las mujeres
// Promedio de edad de los hombres
// Porcentaje de mujeres menores a 21 años
// Porcentaje de hombres mayores a 21 años
// La mayor edad ingresada de las mujeres
// La menor edad ingresada de los hombres

let edadGeneral = 0;
let edadMujeres = 0;
let edadHombres = 0;

let cantMujeres = 0;
let cantHombres = 0;

let edadMaxMujeres = Number.NEGATIVE_INFINITY;
let edadMinHombres = Number.POSITIVE_INFINITY;
let mayoresHombres = 0;
let menoresMujeres = 0;



do {

    let ciudad = prompt(`Ingrese ciudad`);
    while (!isNaN(ciudad)) {
        ciudad = prompt(`Ingrese ciudad, no pueden ser numeros`)
    }

    let sexo = prompt(`Ingrese sexo`).toUpperCase();
    while (!isNaN(sexo) && sexo !== "H" && sexo !== "M") {
         sexo = prompt(`Ingrese sexo. Solo se permite H o M`).toUpperCase();
    }

    let edad = parseInt(prompt (`Ingrese edad`));
    while (isNaN(edad) || edad > 110 || edad < 0) {
         edad = parseInt(prompt(`Ingrese edad, solamente podra ingresar numeros validos mayores a 0 y menores a 110.`));
    }

    edadGeneral += edad;

    if (sexo == "H") {
        cantHombres++;
        edadHombres+= edad;

        if (edad > 21) {
            mayoresHombres++
        }

        if (edad < edadMinHombres) {
            edadMinHombres = edad;
        }

    } else {

        cantMujeres++;
        edadMujeres+=edad;

        if(edad > edadMaxMujeres){
        edadMaxMujeres = edad;
        }

        if (edad < 21) {
            menoresMujeres++
        }
    }
} while (confirm(`¿Desea agregar mas personas?`));

alert(`El promedio de edades es de: ${(edadGeneral / (cantHombres + cantMujeres)).toFixed(0)}`)
alert(`El promedio de edad en mujeres es de: ${(edadMujeres / cantMujeres).toFixed(0)}`)
alert(`El promedio de edad en hombres es de: ${(edadHombres / cantHombres).toFixed(0)}`)
alert(`El porcentaje de mujeres menores a 21 años es de: ${(menoresMujeres * 100 / cantMujeres).toFixed(0)}%`)
alert(`El porcentaje de Hombres mayores a 21 es: ${(mayoresHombres * 100 / cantHombres).toFixed(0)}%`)
alert(`La mayor edad ingresada por mujeres es: ${edadMaxMujeres}`)
alert(`La menor edad ingresada por hombres es: ${edadMinHombres}`)