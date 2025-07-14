# 🧬 Pokédex + Teambuilder API

Proyecto final para **Ingeniería Web II**. Este backend permite administrar un catálogo de Pokémon (Pokédex) y construir equipos de hasta 6 Pokémon, con estadísticas personalizadas y funcionalidades inspiradas en Pokémon Showdown.

---

## 📦 Tecnologías usadas

- Node.js + Express
- Sequelize ORM
- PostgreSQL
- JWT (autenticación)
- dotenv
- bcrypt
- nodemon
- Postman (para pruebas)

---

## 📁 Estructura del proyecto

```
backend-poketeam/
├── src/
│   ├── config/             # Configuración de Sequelize y DB
│   ├── controllers/        # Controladores de rutas
│   ├── middlewares/        # Middlewares como auth
│   ├── models/             # Modelos Sequelize
│   ├── routes/             # Rutas de la API
│   ├── seeders/            # Seed inicial de datos
│   ├── services/           # Servicios como stat calculator
│   ├── utils/              # Helpers como naturaleza
│   └── index.js            # Archivo principal del servidor
├── .env
├── package.json
└── README.md
```

---

## 🚀 Instrucciones para correr el backend

### 1. Clonar repositorio
```bash
git clone <repositorio>
cd backend-poketeam
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar archivo `.env`
Crea un archivo `.env` con el siguiente contenido:

```
PORT=3000
DB_NAME=Pokedex
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
JWT_SECRET=clave_super_secreta
```

### 4. Poblar base de datos con seed
Esto borrará todo y cargará Pokémon, ítems y movimientos de prueba:

```bash
node src/seeders/seed.js
```

### 5. Levantar el servidor
```bash
npm run dev
```

Servidor corriendo en: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Autenticación

- Para acceder a rutas protegidas, primero loguearse con:
  ```
  POST /api/auth/login
  ```
  El token recibido debe ser enviado en el header:
  ```
  Authorization: Bearer <token>
  ```

---

## 🧪 Pruebas con Postman

1. Abre Postman
2. Importa el archivo:
   - [`pokedex-teambuilder-full.postman_collection.json`](./pokedex-teambuilder-full.postman_collection.json)
3. Probar rutas como:
   - `/api/auth/register`
   - `/api/pokemon`
   - `/api/equipos`
   - `/api/equipo-pokemon/:teamId`

---

## 📸 Capturas sugeridas para agregar al informe

- Registro/Login en Postman
- Creación de equipo
- Adición de Pokémon personalizado al equipo
- Cálculo de stats con EVs, IVs y naturaleza
- Rutas protegidas accesibles solo con token

---

## 👨‍💻 Autor
Limberg Ruiz Parejas ✌️ – Estudiante de Ingeniería Web II  
Universidad: Nur 
Año: 2025

---

