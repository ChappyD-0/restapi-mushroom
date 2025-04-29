// index.js (en la raíz del proyecto)
require('dotenv').config();
const server = require('./server');   // importa tu Express
const PORT = process.env.PORT || 3000;

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Connecting to DB: ${process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : process.env.DEV_DATABASE_URL}`);

console.log(`Iniciando el servidor en el puerto ${PORT}…`);
server.listen(PORT, () => {
  console.log(`✅ Server is live at http://0.0.0.0:${PORT}`);
});

