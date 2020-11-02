const Sequelize = require('sequelize');

const env = require('./env')

if (process.env.NODE_ENV === 'production'){
  const sequelize = new Sequelize(env.db, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    },
    logging: false
  });

  module.exports = sequelize;

} else {
  const sequelize = new Sequelize("takos", "postgres", "12345", {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    },
    logging: false
  });
  module.exports = sequelize;
}


