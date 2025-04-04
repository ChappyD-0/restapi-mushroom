require('dotenv').config();
console.log('DB URL:', process.env.DEV_DATABASE_URL);


module.exports = {
  development: {
    username: 'root',
    password: '56834764',
    database: 'user_api',  // Nombre correcto de la base de datos
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};

