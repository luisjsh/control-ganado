const Sequelize = require('sequelize');

if (process.env.NODE_ENV === 'production'){
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect:  "postgres",
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


