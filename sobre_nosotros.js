// 1. Crea una lista (array) con las rutas de tus fotos.
// Añade aquí todas las fotos que quieras que ciclen.
const misFotos = [
    "Catalogo4.jpeg", // Esta debe ser la misma que pusiste en el HTML
    "Personalizado1.jpeg", // Cambia estos nombres por tus archivos reales
    "Catalogo1.jpeg",
    "Personalizado2.jpeg",
    "Catalogo2.jpeg",
    "Personalizado3.png",
    "Catalogo3.jpeg"
];

// 2. Variables de control
let indiceActual = 0; // Empieza en la primera foto
const tiempoCambio = 3000; // Tiempo en milisegundos (3000ms = 3 segundos)

// 3. Selecciona el elemento de imagen del HTML
const imagenElemento = document.getElementById("foto-secuencia");

// 4. La función que hace el cambio
function cambiarFoto() {
    // Incrementa el índice
    indiceActual++;

    // Si llegamos al final de la lista, vuelve a empezar
    if (indiceActual >= misFotos.length) {
        indiceActual = 0;
    }

    // Cambia la fuente de la imagen. ¡El cambio es instantáneo!
    imagenElemento.src = misFotos[indiceActual];
}

// 5. Inicia el temporizador (ciclo)
// Llama a la función 'cambiarFoto' cada 'tiempoCambio' milisegundos.
setInterval(cambiarFoto, tiempoCambio);