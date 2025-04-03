# 🚀 Proyecto Car API & Car Web con Docker

Este proyecto incluye dos aplicaciones:
- **Car API**: Una API en Spring Boot conectada a una base de datos SQL Server.
- **Car Web**: Una aplicación en React como frontend.

Ambas aplicaciones están contenidas y orquestadas con Docker Compose.

---

## 📦 Requisitos Previos

Antes de desplegar el proyecto, asegúrate de tener instalado:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Desplegar el Proyecto

Para iniciar todos los servicios (Base de Datos, Backend y Frontend), ejecuta:

```sh
docker-compose up --build -d
```

Esto ejecutará:
- `sqlserver`: Base de datos SQL Server.
- `car-api`: API en Spring Boot.
- `car-web`: Frontend en Next.js.

---

## 📌 Desplegar Servicios Individualmente

Si solo necesitas levantar un servicio específico, usa:

### 🔹 Levantar solo el backend:
```sh
docker-compose up --build -d car-api
```

### 🔹 Levantar solo el frontend:
```sh
docker-compose up --build -d car-web
```

---

## 🔍 Probar el Proyecto

### 📌 Verificar la Base de Datos
Puedes conectar un cliente SQL (DBeaver, Azure Data Studio) a la base de datos con:
- **Host:** `localhost`
- **Puerto:** `1433`
- **Usuario:** `sa`
- **Contraseña:** `YourStrong!Passw0rd`

### 📌 Probar la API
La API estará disponible en:
```sh
http://localhost:8080
```
Puedes probar los endpoints con Postman o un navegador.

### 📌 Probar la Aplicación Web
La aplicación frontend estará disponible en:
```sh
http://localhost:3000
```

## 📌 Credenciales de Acceso  
El sistema tiene dos usuarios precargados para pruebas:  

- **Usuario:** `user1` / **Contraseña:** `password123`  
- **Usuario:** `user2` / **Contraseña:** `password456`
---

## 🛑 Detener los Contenedores

Para detener todos los servicios, ejecuta:
```sh
docker-compose down
```

Para eliminar los volúmenes persistentes (datos de SQL Server), usa:
```sh
docker-compose down -v
```

---

## 🔄 Actualizar la Aplicación
Si hiciste cambios en el código y quieres aplicar los cambios:
```sh
docker-compose up --build -d
```

Esto reconstruirá las imágenes y actualizará los contenedores.

---

¡Listo! Ahora puedes desplegar y probar el proyecto fácilmente con Docker. 🚀

