const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../database/database');

const users = db.define('users', {
  username: DataTypes.TEXT,
  password: DataTypes.TEXT
});

//  (async () => {
//    await db.sync({ force: true });
//  })();

module.exports = users;