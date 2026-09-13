# Resumidor-de-texto

Proyecto web de un resumidor de textos largos utilizando un modelo de inteligencia artificial open-source ejecutado localmente, sin registro y sin utilizar una API externa de inteligencia artificial.

## Tecnologías utilizadas

* HTML
* CSS
* JavaScript
* Node.js
* Express
* Python 3.11
* Transformers
* PyTorch
* SentencePiece
* Modelo `mrm8488/bert2bert_shared-spanish-finetuned-summarization`

## Estructura del proyecto

```text
proyecto/
├── index.html
├── styles.css
├── script.js
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── python/
│   └── resumir.py
├── .gitignore
└── README.md
```

## Requisitos

Para ejecutar el proyecto se necesita tener instalado:

* Node.js
* Python 3.11


## Instalación

### 1. Clonar el repositorio

Clona el repositorio y abre una terminal dentro de la carpeta principal del proyecto.

### 2. Crear el entorno virtual de Python

En PowerShell:

```powershell
py -3.11 -m venv entorno311
```

### 3. Activar el entorno virtual

Si PowerShell bloquea la activación, ejecutar:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Después:

```powershell
.\entorno311\Scripts\Activate.ps1
```

Cuando esté activado, aparecerá algo parecido a:

```text
(entorno311) PS C:\...\proyecto>
```

### 4. Instalar las dependencias de Python

Con el entorno `entorno311` activado:

```powershell
pip install "transformers==4.46.3"
pip install torch sentencepiece
```

### 5. Instalar las dependencias de Node.js

Entrar a la carpeta `backend`:

```powershell
cd backend
```

Después ejecutar:

```powershell
npm install
```

Esto instalará las dependencias que están guardadas en `package.json`.

### 6. Ejecutar el servidor

Desde la carpeta `backend`:

```powershell
node server.js
```

Debe aparecer:

```text
Servidor funcionando en http://localhost:3000
```

También aparecerá:

```text
Python: Cargando modelo...
```

La primera vez puede tardar porque el modelo debe descargarse.

Cuando aparezca:

```text
Python: Modelo cargado.
```

el sistema estará listo para generar resúmenes.

## 7. Abrir la página

Abrir el `index.html` utilizando el servidor local del proyecto.

El frontend se comunica con el backend mediante:

```text
http://localhost:3000/resumir
```

## Modelo utilizado

El proyecto utiliza:

```text
mrm8488/bert2bert_shared-spanish-finetuned-summarization
```

Es un modelo de resumen en español basado en BERT2BERT y ajustado para realizar tareas de resumen.

El modelo se descarga automáticamente la primera vez que se ejecuta.


## Opciones de resumen

La aplicación permite seleccionar tres longitudes:

* **Corto**
* **Mediano**
* **Largo**

Estas opciones controlan la cantidad mínima y máxima de tokens que puede generar el modelo.

Actualmente se utilizan:

```text
Corto:
mínimo 20 tokens
máximo 50 tokens

Mediano:
mínimo 40 tokens
máximo 100 tokens

Largo:
mínimo 60 tokens
máximo 150 tokens
```


## Orden rápido para ejecutar el proyecto

```powershell
# Crear entorno de Python
py -3.11 -m venv entorno311

# Activar entorno
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\entorno311\Scripts\Activate.ps1

# Instalar dependencias de Python
pip install "transformers==4.46.3"
pip install torch sentencepiece

# Entrar al backend
cd backend

# Instalar dependencias de Node
npm install

# Ejecutar servidor
node server.js
```

Después se debe abrir la página web y esperar a que aparezca en la consola:

```text
Python: Modelo cargado.
```

Una vez cargado el modelo, se puede utilizar el resumidor.
