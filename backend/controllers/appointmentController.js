const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
exports.bookAppointment = async (req, res) => {
 try {
 const { patientId, patientName, patientEmail, patientPhone, doctorId, appointmentDate, appointmentTime, reason } = req.body;
 const doctor = await Doctor.findById(doctorId);
 if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });
 const appointment = await Appointment.create({
 patientId,
 patientName,
 patientEmail,
 patientPhone,
 doctorId,
 doctorName: doctor.name,
 specialization: doctor.specialization,
 appointmentDate,
 appointmentTime,
 reason,
 consultationFee: doctor.fees,
 status: "confirmed"
 });
 res.status(201).json({ success: true, message: "Appointment booked successfully", data: appointment });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.getMyAppointments = async (req, res) => {
 try {
 const appointments = await Appointment.find({
  patientId: req.userId,
  status: { $ne: "cancelled" }
}).populate("doctorId");
 res.status(200).json({ success: true, count: appointments.length, data: appointments });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.rescheduleAppointment = async (req, res) => {
 try {
 const { appointmentDate, appointmentTime } = req.body;
 const appointment = await Appointment.findByIdAndUpdate(req.params.id, { appointmentDate, appointmentTime }, { new: true });
 if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });
 res.status(200).json({ success: true, message: "Appointment rescheduled successfully", data: appointment });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.cancelAppointment = async (req, res) => {
 try {
 const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true });
 if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });
 res.status(200).json({ success: true, message: "Appointment cancelled successfully", data: appointment });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};