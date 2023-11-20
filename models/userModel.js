const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const userModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
  },
});

// userModel
//   .sync({ force: true })
//   .then((result) => {
//     console.log("*** User table created ***");
//   })
//   .catch((err) => {
//     console.log("-----: Error creating User table :----- ", err);
//   });

module.exports = userModel;
