const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../db/connection')();

const User = connection.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    connection,
    modelName: 'Users'
    // Other model options go here
});

User.sync()
module.exports = User;