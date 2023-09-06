const Sequelize = require('sequelize');
require('dotenv').config();

let Sequelize;

if (process.env.JAWSDB_URL) {
  Sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  Sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306,
    }
  );
}

Sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = Sequelize;
