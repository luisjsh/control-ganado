const Sequelize = require('sequelize');

if (process.env.NODE_ENV === 'production'){
  const sequelize = new Sequelize('postgres://dzxozqsavhkivq:460708ea68b66efa067c4bd66b86e86ad3bf7248ef87643ccfdd73a08aeb5b5d@ec2-34-232-24-202.compute-1.amazonaws.com:5432/d1vvrpbq7an100');

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


