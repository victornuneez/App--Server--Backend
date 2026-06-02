# Backend

Servidor RESTful construido con **Node.js**, **Express** y **MongoDB/Mongoose**. Es la base compartida que consumen tanto la versión Vanilla JS como la versión React de la aplicación.

---

## 📋 Descripción

El backend expone una API para gestionar enlaces y etiquetas. Permite crear, leer, actualizar y eliminar recursos, así como agregar comentarios y votos a cada enlace.

---

## 🛠️ Tecnologías

| Herramienta | Versión | Uso |
|---|---|---|
| Node.js | >= 18 | Entorno de ejecución |
| Express | 5.2.1 | Framework HTTP |
| Mongoose | 9.5.0 | ODM para MongoDB |
| MongoDB | 7.2.0 | Base de datos |
| dotenv | 17.4.2 | Variables de entorno |
| cors | 2.8.6 | Política de acceso entre dominios |
| nodemon | 3.1.14 | Recarga automática en desarrollo |

---

## 📁 Estructura del proyecto

```
backend/
├── config.js              # Conexión a MongoDB
├── server.js              # Punto de entrada, middlewares y rutas
├── routes/
│   ├── appRoutes.js       # Rutas de lectura (GET)
│   └── userRoutes.js      # Rutas de escritura (POST, PUT, PATCH, DELETE)
├── controller/
│   ├── appController.js   # Lógica de lectura
│   └── userController.js  # Lógica de escritura
├── models/
│   ├── linkCollection.js  # Schema de enlaces
│   └── tagCollection.js   # Schema de etiquetas
├── package.json
└── .env                   # Variables de entorno (no subir al repo)
```

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/victornuneez/App--Server--Backend-.git
cd App--Server--Backend-
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
DB_URI=mongodb://localhost:27017/linkvault
```

> Si usás MongoDB Atlas, reemplazá `DB_URI` con tu connection string completo:
> `mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/<dbname>`

### 4. Iniciar el servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

---

## 🔌 Endpoints de la API

### Base URL

```
http://localhost:3000
```

---

### 📖 Rutas de lectura — `/app`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/app/links` | Devuelve todos los enlaces |
| GET | `/app/links?id=<tagId>` | Filtra enlaces por etiqueta |
| GET | `/app/details/:id` | Devuelve el detalle de un enlace |
| GET | `/app/tags` | Devuelve todas las etiquetas |

---

### ✏️ Rutas de escritura — `/api`

| Método | Endpoint | Descripción | Body |
|---|---|---|---|
| POST | `/api/create` | Crea un nuevo enlace | `{ title, url, description, tag }` |
| POST | `/api/tag` | Crea una etiqueta nueva | `{ name }` |
| PUT | `/api/update/:id` | Actualiza un enlace | `{ title, url, description }` |
| PATCH | `/api/comment/:id` | Agrega un comentario | `{ text }` |
| PATCH | `/api/vote/:id` | Suma un voto al enlace | — |
| DELETE | `/api/delete/:id` | Elimina un enlace | — |

---

## 🗄️ Modelos de datos

### Link

```js
{
  title:       String  // requerido
  url:         String  // requerido, único
  description: String  // requerido
  vote:        Number  // default: 0
  comments:    [String]
  tag:         ObjectId → Tag  // requerido
  createdAt:   Date
  updatedAt:   Date
}
```

### Tag

```js
{
  name:      String  // requerido, único
  createdAt: Date
  updatedAt: Date
}
```


---

## 📌 Notas

- El campo `tag` en la creación de un enlace acepta el **nombre** de la etiqueta como string. El backend busca si ya existe; si no, la crea automáticamente.
- Los comentarios tienen un límite de **100 caracteres** por entrada.
- Los votos solo se pueden **incrementar** (no decrementar).

---

*© Todos los derechos reservados — Victor Nunez*
