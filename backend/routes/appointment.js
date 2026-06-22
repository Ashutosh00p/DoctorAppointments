const express = require("express");
const router = express.Router();
const { bookAppointment, getMyAppointments, rescheduleAppointment, cancelAppointment } = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/book", authMiddleware, bookAppointment);
router.get("/my-appointments", authMiddleware, getMyAppointments);
router.put("/reschedule/:id", authMiddleware, rescheduleAppointment);
router.put("/cancel/:id", authMiddleware, cancelAppointment);
module.exports = router;