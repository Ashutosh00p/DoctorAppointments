import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Calendar, Clock, Stethoscope, AlertCircle, Trash2, Edit, IndianRupee } from "lucide-react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointment/my-appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(
  (res.data.data || []).filter(
    (appointment) => appointment.status !== "cancelled"
  )
);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_API_URL}/appointment/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      //fetchAppointments();
      setAppointments((prev) =>
  prev.filter((appointment) => appointment._id !== id)
);
    } catch (error) {
      alert("Error cancelling appointment");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
      completed: "bg-blue-50 text-blue-700 border-blue-200"
    };
    return styles[status] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">My Appointments</h2>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No appointments found</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {appointments.map((apt) => (
                <motion.div
                  key={apt._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-900">{apt.doctorName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(apt.status)} uppercase`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-blue-600 font-semibold flex items-center gap-1.5 mb-4">
                        <Stethoscope size={16} /> {apt.specialization}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-slate-400" /> 
                          {new Date(apt.appointmentDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-slate-400" /> 
                          {apt.appointmentTime}
                        </div>
                      </div>
                      <p className="mt-4 text-slate-700 bg-slate-50 p-3 rounded-xl text-sm">
                        <span className="font-semibold">Reason:</span> {apt.reason || "Not specified"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900 flex items-center justify-end gap-1">
                        <IndianRupee size={18} /> {apt.consultationFee}
                      </p>
                    </div>
                  </div>

                  {apt.status === "pending" && (
                    <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold transition">
                        <Edit size={16} /> Reschedule
                      </button>
                      <button
                        onClick={() => handleCancel(apt._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition"
                      >
                        <Trash2 size={16} /> Cancel
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;