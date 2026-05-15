const mongoose = require("mongoose");

const visitsSchema = new mongoose.Schema(
  {
    ip: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    page: { 
        type: String, 
        required: true 
    },
    Country: {
        type: String
    },
    City: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);


const Visit = mongoose.model("Visit", visitsSchema, "visits");

module.exports = Visit;