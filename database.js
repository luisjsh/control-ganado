const Sequelize = require('sequelize');

const env = require('./env')

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
