require('dotenv').config();
console.log('DB URL:', process.env.DEV_DATABASE_URL);


module.exports = {
  development: {
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
  rejectUnauthorized: false },
    connectTimeout: 60000
    },
    logging: console.log,
    define: {
      timestamps: true,
      underscored: false
    }
   
  }
};

