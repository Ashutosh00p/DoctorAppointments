const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
 {
 patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
 patientName: { type: String, required: true },
 patientEmail: { type: String, required: true },
 patientPhone: { type: String, required: true },
 doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
 doctorName: { type: String, required: true },
 specialization: { type: String, required: true },
 appointmentDate: { type: String, required: true },
 appointmentTime: { type: String, required: true },
 reason: { type: String, maxlength: 500 },
 status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
 consultationFee: { type: Number, required: true }
 },
 { timestamps: true }
);
module.exports = mongoose.model("Appointment", appointmentSchema);