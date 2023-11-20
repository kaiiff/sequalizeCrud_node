const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Notes = sequelize.define("notes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Notes;
