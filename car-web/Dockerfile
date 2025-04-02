# Usa una imagen de Node.js para construir la aplicación
FROM node:18 as build

WORKDIR /app

# Copia los archivos de dependencias primero para aprovechar la caché
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Instala sólo las dependencias necesarias para producción
RUN npm ci --omit=dev

# Usa una imagen de Node.js ligera para ejecutar la aplicación
FROM node:18-alpine

WORKDIR /app

# Copia los archivos de la fase de construcción
COPY --from=build /app ./

# Expone el puerto 3000 para la aplicación Next.js
EXPOSE 3000

# Ejecuta la aplicación
CMD ["npm", "run", "start"]
