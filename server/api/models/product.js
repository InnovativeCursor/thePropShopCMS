const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  prd_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
  },
  product_name: DataTypes.STRING,
  location: DataTypes.STRING,
  booth_size: DataTypes.STRING,
  budget: DataTypes.STRING,
  closed_meeting_room: DataTypes.INTEGER,
  demo_stations: DataTypes.INTEGER,
  open_discussion_area: DataTypes.INTEGER,
  bar_area: DataTypes.BOOLEAN,
  hanging_sign: DataTypes.BOOLEAN,
  led_video_wall: DataTypes.BOOLEAN,
  longue_area: DataTypes.BOOLEAN,
  product_display: DataTypes.BOOLEAN,
  Reception_counter: DataTypes.BOOLEAN,
  semi_closed_meeting_area: DataTypes.BOOLEAN,
  storage_room: DataTypes.BOOLEAN,
  theatre_style_demo: DataTypes.BOOLEAN,
  touch_screen_kiosk: DataTypes.BOOLEAN,
  description: DataTypes.TEXT,
  pictures: { type: DataTypes.JSON, allowNull: false },
});

module.exports = Product;
