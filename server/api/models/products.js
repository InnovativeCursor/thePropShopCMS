const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  sku: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  boothSize: {
    type: Number,
    required: true,
  },
  budgetMinimum: {
    type: Number,
    required: true,
  },
  budgetMaximum: {
    type: Number,
    required: true,
  },
  closed_Meeting_Room: {
    type: Number,
    required: true,
  },
  demo_Stations: {
    type: Number,
    required: true,
  },
  open_Discusison_Areas: {
    type: Number,
    required: true,
  },
  functionalRequirements: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  productImages: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("products", productsSchema);
