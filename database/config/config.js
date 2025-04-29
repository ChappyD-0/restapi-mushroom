require('dotenv').config();
console.log('DB URL:', process.env.DEV_DATABASE_URL);


module.exports = {
  development: {
       // si existe DEV_DATABASE_URL, Sequelize la usará en vez de los campos separados
    url: process.env.DEV_DATABASE_URL,
    dialect: 'mysql'
   },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '34.138.140.86',
    dialect: 'mysql'
  },
  production: {
     url: process.env.DATABASE_URL,
     dialect: 'mysql',
    dialectOptions: {
      ssl: {
 require: true, 
  rejectUnauthorized: false }
    }
   
  }
};

