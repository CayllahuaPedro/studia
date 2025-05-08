# Guía de Gestión de Base de Datos PostgreSQL con Docker y Drizzle

Esta guía explica cómo configurar, iniciar y gestionar una base de datos PostgreSQL usando Docker y Drizzle ORM para el proyecto Studia.

## Índice
- [Requisitos Previos](#requisitos-previos)
- [Configuración de la Base de Datos con Docker](#configuración-de-la-base-de-datos-con-docker)
- [Gestión de la Base de Datos](#gestión-de-la-base-de-datos)
  - [Iniciar y Detener la Base de Datos](#iniciar-y-detener-la-base-de-datos)
  - [Gestión de Esquemas con Drizzle](#gestión-de-esquemas-con-drizzle)
  - [Ejecutar Consultas SQL](#ejecutar-consultas-sql)
  - [Usar Drizzle Studio](#usar-drizzle-studio)
- [Solución de Problemas Comunes](#solución-de-problemas-comunes)

## Requisitos Previos

Asegúrate de tener instalado:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)

## Configuración de la Base de Datos con Docker

El proyecto utiliza Docker Compose para configurar y ejecutar PostgreSQL. La configuración se encuentra en el archivo `docker-compose.yaml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: studia-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: studia
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

Esta configuración crea:
- Un contenedor PostgreSQL versión 16
- Usuario: `postgres`
- Contraseña: `postgres`
- Base de datos: `studia`
- Puerto: `5432` (accesible desde tu máquina local)
- Un volumen persistente para almacenar los datos

## Gestión de la Base de Datos

### Iniciar y Detener la Base de Datos

#### Iniciar el servicio de Docker (si no está en ejecución)

```bash
# En sistemas basados en systemd (la mayoría de distribuciones Linux)
sudo systemctl start docker

# En macOS y Windows, Docker Desktop debería estar en ejecución
```

#### Iniciar la base de datos

```bash
# Navega al directorio del proyecto
cd /ruta/a/studia

# Inicia los contenedores en segundo plano
docker-compose up -d
```

#### Verificar el estado de la base de datos

```bash
# Ver los contenedores en ejecución
docker ps

# Ver logs del contenedor de PostgreSQL
docker logs studia-postgres
```

#### Detener la base de datos

```bash
# Detener los contenedores pero mantener los datos
docker-compose down

# Detener los contenedores y eliminar los volúmenes (¡CUIDADO! Esto eliminará todos los datos)
docker-compose down -v
```

### Gestión de Esquemas con Drizzle

El proyecto utiliza [Drizzle ORM](https://orm.drizzle.team/) para definir y gestionar el esquema de la base de datos.

#### Configuración de Drizzle

La configuración de Drizzle se encuentra en `drizzle.config.ts`:

```typescript
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'studia',
    ssl: false
  },
} satisfies Config;
```

#### Comandos de Drizzle

El proyecto tiene configurados los siguientes comandos en `package.json`:

```bash
# Generar archivos de migración basados en los cambios en el esquema
npm run db:generate

# Aplicar cambios directamente a la base de datos
npm run db:push

# Abrir Drizzle Studio para gestionar la base de datos visualmente
npm run db:studio
```

#### Flujo de trabajo típico

1. Modifica el esquema en `src/db/schema.ts`
2. Ejecuta `npm run db:push` para aplicar los cambios a la base de datos
3. Usa `npm run db:studio` para verificar los cambios y gestionar los datos

### Ejecutar Consultas SQL

#### Método 1: Usando el cliente psql dentro del contenedor

```bash
# Conectarse a la base de datos
docker exec -it studia-postgres psql -U postgres -d studia

# Una vez dentro, puedes ejecutar comandos SQL
# Por ejemplo:
SELECT * FROM users;

# Para salir de psql
\q
```

#### Método 2: Ejecutar un archivo SQL

1. Crea un archivo SQL con tus consultas (por ejemplo, `queries.sql`):

```sql
-- Ejemplo de contenido de queries.sql
SELECT * FROM users;
INSERT INTO users (name, email) VALUES ('Usuario de Prueba', 'test@example.com');
```

2. Ejecuta el archivo SQL:

```bash
docker exec -i studia-postgres psql -U postgres -d studia < queries.sql
```

#### Método 3: Ejecutar una consulta SQL directamente

```bash
# Ejecutar una consulta SQL directamente
docker exec -i studia-postgres psql -U postgres -d studia -c "SELECT * FROM users;"
```

#### Comandos útiles de psql

Una vez dentro del cliente psql, puedes usar estos comandos:

```
\dt             # Listar todas las tablas
\d+ nombre_tabla # Describir una tabla específica
\l              # Listar todas las bases de datos
\c nombre_bd    # Conectarse a otra base de datos
\h              # Ayuda sobre comandos SQL
\?              # Ayuda sobre comandos psql
\q              # Salir de psql
```

### Usar Drizzle Studio

Drizzle Studio es una interfaz web que te permite gestionar tu base de datos visualmente.

```bash
# Iniciar Drizzle Studio
npm run db:studio
```

Esto abrirá una interfaz web (generalmente en http://localhost:4983) donde podrás:

- Ver todas las tablas y sus relaciones
- Ejecutar consultas SQL
- Insertar, actualizar y eliminar datos
- Explorar la estructura de la base de datos

## Solución de Problemas Comunes

### Error de conexión a la base de datos

Si la aplicación muestra errores de conexión a la base de datos:

1. Verifica que el contenedor de Docker esté en ejecución:
   ```bash
   docker ps | grep studia-postgres
   ```

2. Si no está en ejecución, inicia Docker y el contenedor:
   ```bash
   sudo systemctl start docker
   docker-compose up -d
   ```

3. Verifica que la configuración de conexión coincida con la del contenedor:
   - Revisa `src/db/index.ts` y `drizzle.config.ts`
   - Asegúrate de que host, puerto, usuario, contraseña y nombre de la base de datos sean correctos

### Error 500 al crear usuarios

Si recibes un error 500 al intentar crear usuarios:

1. Verifica que la base de datos esté en ejecución
2. Asegúrate de que el esquema esté correctamente aplicado:
   ```bash
   npm run db:push
   ```
3. Verifica si el correo electrónico ya existe (debe ser único)
4. Revisa los logs del servidor para obtener más detalles sobre el error

### Pérdida de datos

Si necesitas restaurar la base de datos a un estado limpio:

```bash
# Detener y eliminar el contenedor y los volúmenes
docker-compose down -v

# Volver a crear el contenedor y la base de datos
docker-compose up -d

# Aplicar el esquema nuevamente
npm run db:push
```

---

Esta documentación cubre los aspectos básicos de la gestión de la base de datos PostgreSQL con Docker y Drizzle para el proyecto Studia. Para más información, consulta la documentación oficial de [Docker](https://docs.docker.com/), [PostgreSQL](https://www.postgresql.org/docs/) y [Drizzle ORM](https://orm.drizzle.team/docs/overview).
