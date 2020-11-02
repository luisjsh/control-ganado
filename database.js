const Sequelize = require('sequelize');

if (process.env.NODE_ENV === 'production'){
  const sequelize = new Sequelize('postgres://zncfdsmuohggvr:ef6b136cd4b66021ab2666f98821fcc84b0a3b89c48c9cc122587465da9d90a1@ec2-34-232-24-202.compute-1.amazonaws.com:5432/d4283chjodv053');

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


