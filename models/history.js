const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../database/database');

const history = db.define('history', {
  username: DataTypes.TEXT,
  prediction: DataTypes.INTEGER,
  time: DataTypes.DATE
});

//  (async () => {
//    await db.sync({ force: true });
//  })();

module.exports = history;