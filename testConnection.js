const { sequelize } = require("./database/models");

sequelize.authenticate()
  .then(() => console.log("✅ Conexión a la base de datos exitosa"))
  .catch((error) => console.error("❌ Error al conectar la base de datos:", error));

