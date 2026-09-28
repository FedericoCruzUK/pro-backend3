```
# ShipNow Backend API

API RESTful profesional desarrollada con Node.js, Express y MongoDB para la gestión logística, seguimiento de envíos, subida de comprobantes y administración de usuarios.

Arquitectura del Proyecto

El proyecto implementa una arquitectura en capas (Layered Architecture) estricta para garantizar la separación de responsabilidades, mantenibilidad y escalabilidad:

- Routes (`src/routes/`): Exposición de endpoints y anotaciones OpenAPI (Swagger).
- Controllers (`src/controllers/`): Gestión de peticiones/respuestas HTTP y delegación de tareas.
- Services (`src/services/`): Lógica de negocio (números de tracking automáticos, simulación de datos con Faker).
- Repositories (`src/repositories/`): Capa de abstracción y persistencia en MongoDB.
- Models (`src/models/`): Esquemas de Mongoose para envíos (`Shipment`) y usuarios (`User`).
- Middlewares (`src/middlewares/`): Manejo global de errores, logging estructurado con Winston y subida de archivos con Multer.

Tecnologías Utilizadas

- Entorno de ejecución: Node.js (v18+)
- Framework Web: Express.js
- **Base de Datos: MongoDB &amp; Mongoose ORM
- Documentación Interactiva: Swagger UI (`swagger-ui-express`, `swagger-jsdoc`)
- Testing Automatizado: Mocha, Chai, Supertest
- Logging &amp; Monitoreo: Winston
- Manejo de Archivos: Multer
- Generación de Mocks: @faker-js/faker
- Contenedorización: Docker &amp; Docker Compose

Requisitos Previos

- Node.js v18+ y npm v9+
- MongoDB v6+ (o Docker Desktop)

--------------------------------------------------------

Instalación y Ejecución Local

Clonar el repositorio:

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd backend3

**Instalar dependencias**

npm install

**Configurar las Variables de Entorno:**
-Crear un archivo `.env` en la raíz del proyecto tomando como plantilla `.env.example`:

PORT=8080
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/shipnow
TEST_MONGO_URI=mongodb://localhost:27017/shipnow_test
LOG_LEVEL=info

**Iniciar el servidor en modo desarrollo:**

npm run dev

**Documentación Swagger UI:** Ingresar desde el navegador a: [http://localhost:8080/api/docs]

**Suite de Pruebas Funcionales**

Para ejecutar la suite automatizada de tests:

npm test

**Despliegue con Docker Compose**

Para construir y levantar el entorno completo (API REST + MongoDB) dentro de contenedores:

docker compose up --build

**Servidor API:** `http://localhost:8080`
**Swagger Docs:** `http://localhost:8080/api/docs`
**Contenedor MongoDB:** `localhost:27017`

**Para detener los servicios de Docker:**

docker compose down