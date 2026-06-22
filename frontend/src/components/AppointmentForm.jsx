import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, Clock, MessageSquare, Loader2, IndianRupee, CheckCircle2 } from "lucide-react";

const AppointmentForm = ({ doctor, user, onSuccess }) => {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    reason: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const patientId = user._id || user.id;
        console.log("FULL USER DATA =", JSON.stringify(user, null, 2));
        console.log("PATIENT ID =", patientId);
      const token = localStorage.getItem("token");
      const res = await axios.post(
       `http://localhost:5000/api/appointment/book`,
        {
          patientId,
          patientName: user.name,
          patientEmail: user.email,
          patientPhone: user.phone || "",
          doctorId: doctor._id,
          ...formData
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setFormData({ appointmentDate: "", appointmentTime: "", reason: "" });
        onSuccess();
      }
    } catch (err) {
       console.log("ERROR OBJECT =", err);
  console.log("ERROR MESSAGE =", err.message);
  console.log("ERROR RESPONSE =", err.response);
  console.log("ERROR REQUEST =", err.request);
       console.log("FULL ERROR =", JSON.stringify(err.response?.data, null, 2));
      setError(err.response?.data?.message || "Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
    >
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Book Appointment</h3>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Date Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 mb-2">Appointment Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              min={today}
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 mb-2">Available Time Slot</label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 text-slate-400" size={18} />
            <select
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none"
            >
              <option value="">Select a time slot</option>
              {doctor.availableSlots?.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reason for Visit */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Reason for Visit</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-slate-400" size={18} />
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Briefly describe your symptoms..."
              rows="3"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Consultation Fee */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-center">
          <span className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <IndianRupee size={16} /> Consultation Fee
          </span>
          <span className="font-bold text-blue-900">₹{doctor.fees}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-blue-200"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle2 size={20} /> Confirm Booking</>}
        </button>
      </div>
    </motion.form>
  );
};

export default AppointmentForm;