const mongoose = require("mongoose");

// Define the schema for a "Restaurant" record
// MongoDB automatically adds an id with property "_id" on every record
const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  hasTakeout: Boolean,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
