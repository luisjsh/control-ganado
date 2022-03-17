const Sequelize = require('sequelize');

if (process.env.NODE_ENV === 'production'){
  const sequelize = new Sequelize('postgres://cthggvurgaxqyd:cb605057e94670ed6720b0b1243df8503fd138ebce48e1f74622d0ba4ecc6d71@ec2-54-156-149-189.compute-1.amazonaws.com:5432/d46tu2c1t62rg3');

  module.exports = sequelize;

} else {
  const sequelize = new Sequelize("takos", "postgres", "root", {
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


