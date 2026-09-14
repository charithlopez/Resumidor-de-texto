let longitud = "";

const textoOriginal = document.querySelector("#textoOriginal");
const contadorOriginal = document.querySelector("#contadorOriginal");
const contadorResumen = document.querySelector("#contadorResumen");

const botonCorto = document.querySelector("#corto");
const botonMediano = document.querySelector("#mediano");
const botonLargo = document.querySelector("#largo");

const botonResumir = document.querySelector(".btn-resumir");
const textoResumen = document.querySelector("#textoResumen");

const botonCopiar = document.querySelector("#btnCopiar");

textoOriginal.addEventListener("input", function() {


botonResumir.textContent = "Resumir";

const texto = textoOriginal.value.trim();

if (texto === "") {
    contadorOriginal.textContent = "Palabras: 0";
    return;
}

const palabras = texto.split(/\s+/);

contadorOriginal.textContent = "Palabras: " + palabras.length;


});

botonCorto.addEventListener("click", function() {


longitud = "corto";

botonCorto.classList.add("seleccionado");
botonMediano.classList.remove("seleccionado");
botonLargo.classList.remove("seleccionado");

botonResumir.textContent = "Resumir";


});

botonMediano.addEventListener("click", function() {


longitud = "mediano";

botonMediano.classList.add("seleccionado");
botonCorto.classList.remove("seleccionado");
botonLargo.classList.remove("seleccionado");

botonResumir.textContent = "Resumir";


});

botonLargo.addEventListener("click", function() {


longitud = "largo";

botonLargo.classList.add("seleccionado");
botonCorto.classList.remove("seleccionado");
botonMediano.classList.remove("seleccionado");

botonResumir.textContent = "Resumir";


});

botonResumir.addEventListener("click", async function() {


console.log("El botón funciona");

const texto = textoOriginal.value.trim();

if (texto === "") {
    textoResumen.value = "Primero escribe un texto.";
    contadorResumen.textContent = "Palabras: 0";
    return;
}

if (longitud === "") {
    textoResumen.value = "Primero selecciona una longitud.";
    contadorResumen.textContent = "Palabras: 0";
    return;
}

botonResumir.textContent = "Resumiendo...";

console.log("Voy a enviar el texto al servidor");

const respuesta = await fetch("http://localhost:3000/resumir", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        texto: texto,
        longitud: longitud
    })

});

const data = await respuesta.json();

const resumen = data.resumen.trim();

textoResumen.value = resumen;

if (resumen === "") {

    contadorResumen.textContent = "Palabras: 0";

} else {

    const palabras = resumen.split(/\s+/);

    contadorResumen.textContent = "Palabras: " + palabras.length;

}

botonResumir.textContent = "Resumir";


});

botonCopiar.addEventListener("click", function() {


const resumen = textoResumen.value;

if (resumen === "") {
    return;
}

navigator.clipboard.writeText(resumen);

alert("Texto copiado");

});
