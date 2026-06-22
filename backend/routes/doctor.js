const express = require("express");
const router = express.Router();
const { getAllDoctors, getDoctorById, getDoctorsBySpecialization, addDoctor, updateDoctor } = require("../controllers/doctorController");
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.get("/specialization/:specialization", getDoctorsBySpecialization);
router.post("/add", addDoctor);
router.put("/:id", updateDoctor);
module.exports = router;