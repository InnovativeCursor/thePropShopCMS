const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Testimonial = sequelize.define("Testimonial", {
  testimonial_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewer_name: {
    type: DataTypes.STRING,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pictures: { type: DataTypes.JSON, allowNull: false },
});
module.exports = Testimonial;
