const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },

  specialization: {
    type: String,
    required: true,
    enum: [
      "Cardiology",
      "Dentistry",
      "Dermatology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "General"
    ]
  },

  qualification: { type: String, required: true },
  experience: { type: Number, required: true, min: 0 },
  fees: { type: Number, required: true, min: 0 },

  profileImage: {
    type: String,
    default: "https://via.placeholder.com/200"
  },

  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },

  availableSlots: {
    type: [String],
    default: [
      "10:00 AM",
      "11:00 AM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM"
    ]
  },

  isActive: {
    type: Boolean,
    default: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);