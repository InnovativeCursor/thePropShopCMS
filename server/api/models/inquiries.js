const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inquiry = sequelize.define("Inquiry", {
  inquiry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  mobile_number: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  message: {
    type: DataTypes.STRING,
  },
});
module.exports = Inquiry;
