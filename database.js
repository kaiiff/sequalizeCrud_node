const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("nodejs", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .sync()
  .then((result) => {
    console.log("*** Database Connected ***");
  })
  .catch((err) => {
    console.log("-----: Database not connected :----- ", err);
  });

module.exports = {
  Sequelize,
  sequelize,
};
