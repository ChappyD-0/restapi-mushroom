# Usa la imagen oficial de Node 20
FROM node:20

# Directorio de trabajo
WORKDIR /app

# Copia sólo los ficheros de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Define variable de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto que usa tu index.js (normalmente 3000)
EXPOSE 3000

# Corre migraciones y luego arranca tu servidor
CMD ["sh", "-c", "npx sequelize-cli db:migrate --env production && node index.js"]

