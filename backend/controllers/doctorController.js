const Doctor = require("../models/Doctor");
exports.getAllDoctors = async (req, res) => {
 try {
 const doctors = await Doctor.find({});
 res.status(200).json({ success: true, count: doctors.length, data: doctors });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.getDoctorById = async (req, res) => {
 try {
 const doctor = await Doctor.findById(req.params.id);
 if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });
 res.status(200).json({ success: true, data: doctor });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.getDoctorsBySpecialization = async (req, res) => {
 try {
 const { specialization } = req.params;
 const doctors = await Doctor.find({ specialization, isActive: true });
 res.status(200).json({ success: true, count: doctors.length, data: doctors });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.addDoctor = async (req, res) => {
 try {
 const doctor = await Doctor.create(req.body);
 res.status(201).json({ success: true, message: "Doctor added successfully", data: doctor });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.updateDoctor = async (req, res) => {
    try {
 const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
 if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });
 res.status(200).json({ success: true, message: "Doctor updated successfully", data: doctor });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};