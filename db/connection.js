const { Sequelize } = require('sequelize');

module.exports = () => {
  try {
    const sequelize = new Sequelize(
      process.env.DATABASE,
      process.env.DATABASE_USERNAME, 
      process.env.DATABASE_PASSWORD,
      {
        host: process.env.DATABASE_HOST,
        port:process.env.DATABASE_PORT,
        dialect: 'mysql',
      }
    );

    return sequelize
  } catch (error) {
    console.log(error);
  }
}