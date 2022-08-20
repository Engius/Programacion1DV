/* 1- Calcular e informar un sueldo sabiendo que:

La categoria define el sueldo basico mensual (1: u$s 1000, 2: u$s 1500, 3: u$s 2000)
La subcategoria define el multiplicador (A: x1.5, B: x2, C: x2.5)
Ambos datos son ingresados por el usuario
3- Informar dentro de que rango esta el sueldo:

Rango inicial: entre u$s 1500 inclusive y u$s 3000 inclusive
Rango intermedio: entre u$s 3000 exclusive y u$s 4000 inclusive
Rango avanzado: si supera los u$s 4000 */

let categoria = prompt("Ingrese la categoria del empleado");
while (categoria !== "1" && categoria !== "2" && categoria !== "3") {
    categoria = prompt("Ingrese la categoria del empleado recordando que son solo validos 1, 2 o 3");
}


let subcategoria = prompt("Ingrese la subcategoria del empleado").toUpperCase();
while (subcategoria !== "A" && subcategoria !== "B" && subcategoria !== "C"){
    subcategoria = prompt("Ingrese la subcategoria del empleado, recordando que son solo validos A, B y C");
}

let sueldoBasico;
switch (categoria) {
    case 1:
        sueldoBasico = 1000
        break;

    case 2:
        sueldoBasico = 1500
        break;

    default:
        sueldoBasico = 2000
        break;
}

let multiplicador;
switch (subcategoria) {
    case "A":
        multiplicador = 1.5
        break;

    case "B":
        multiplicador = 2
        break;

    default:
        multiplicador = 2.5
        break;
}

let sueldoTotal = sueldoBasico*multiplicador;

if (sueldoTotal >= 1500 && sueldoTotal <= 3000){
    alert("El empleado esta en el rango incial");
} else if (sueldoTotal > 3000 && sueldoTotal <= 4000){
    alert("El empleado esta en el rango intermedio");
} else {
    alert("El empleado esta en el rango avanzado.");
}