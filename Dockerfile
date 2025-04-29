# Usa la imagen oficial de Node 20
FROM node:20

WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código (incluyendo public/ y server/)
COPY . .

# Modo producción
ENV NODE_ENV=production

# Escucha en el puerto que va a exponerse
EXPOSE 3000

# Corre migraciones y luego levanta tu servidor
CMD ["sh", "-c", "npx sequelize-cli db:migrate --env production && node index.js"]

