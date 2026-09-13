const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());


const python = spawn(
    "../entorno311/Scripts/python.exe",
    ["../python/resumir.py"],
    {
        env: {
            ...process.env,
            PYTHONIOENCODING: "utf-8"
        }
    }
);


let pythonListo = false;
let respuestaPendiente = null;
let datosPython = "";


python.stderr.on("data", function(datos) {

    const mensaje = datos.toString();

    console.log("Python:", mensaje);

    if (mensaje.includes("Modelo cargado.")) {
        pythonListo = true;
    }

});


python.stdout.on("data", function(datos) {

    datosPython += datos.toString();

    const partes = datosPython.split("\n");

    while (partes.length > 1) {

        const linea = partes.shift();

        datosPython = partes.join("\n");

        if (linea.trim() === "") {
            continue;
        }

        try {

            const resultado = JSON.parse(linea);

            if (respuestaPendiente) {

                if (resultado.error) {

                    respuestaPendiente.status(500).json({
                        error: resultado.error
                    });

                } else {

                    console.log("Respuesta de Python:");
                    console.log(resultado.resumen);

                    respuestaPendiente.json({
                        resumen: resultado.resumen
                    });

                }

                respuestaPendiente = null;
            }

        } catch (error) {

            console.log("Error leyendo respuesta de Python:", error);

        }

    }

});


python.on("error", function(error) {

    console.log("Error iniciando Python:", error);

});


python.on("close", function(codigo) {

    console.log("Python terminó con código:", codigo);

    pythonListo = false;

});


app.post("/resumir", function(req, res) {

    const texto = req.body.texto;
    const longitud = req.body.longitud;

    console.log("Texto recibido:");
    console.log(texto);

    if (!pythonListo) {

        return res.status(503).json({
            error: "El modelo todavía se está cargando."
        });

    }


    if (respuestaPendiente) {

        return res.status(429).json({
            error: "Ya hay un resumen en proceso."
        });

    }


    respuestaPendiente = res;


    const datos = JSON.stringify({
        texto: texto,
        longitud: longitud
    });


    python.stdin.write(datos + "\n");

});


app.listen(3000, function() {

    console.log("Servidor funcionando en http://localhost:3000");

});