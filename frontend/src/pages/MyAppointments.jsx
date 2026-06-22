import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ShieldCheck, Trash2, Loader2, AlertCircle } from 'lucide-react';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get('/appointment/my-appointments');
      console.log("API Response:", data);
      setAppointments(data.data);
    } catch (err) {
      console.error("Error fetching appointments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await API.put(`/appointment/cancel/${id}`);
        setAppointments(appointments.filter(app => app._id !== id));
      } catch (err) {
        alert("Failed to cancel appointment");
      }
    }
  };

  if (loading) return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-purple-500 rounded-3xl shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900">My Appointments</h2>
        <p className="text-slate-500">Manage your upcoming health consultations</p>
      </div>
      
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden">
        {appointments.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No appointments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-6 font-semibold text-slate-700">Doctor</th>
                  <th className="p-6 font-semibold text-slate-700">Department</th>
                  <th className="p-6 font-semibold text-slate-700">Date</th>
                  <th className="p-6 font-semibold text-slate-700">Time</th>
                  <th className="p-6 font-semibold text-slate-700">Status</th>
                  <th className="p-6 font-semibold text-slate-700 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {appointments.map((app) => (
                    <motion.tr 
                      key={app._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-6">
                       {app.doctorName}
                         </td>

                      <td className="p-6">
                          {app.specialization}
                            </td>
                      <td className="p-6 flex items-center gap-3">
                        <Calendar size={16} className="text-blue-500" />{app.appointmentDate}
                      </td>
                      <td className="p-6">
                        <span className="flex items-center gap-2">
                          <Clock size={16} className="text-slate-400" /> {app.appointmentTime}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
                          <ShieldCheck size={14} /> {app.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <button 
                          onClick={() => handleCancel(app._id)}
                          className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ml-auto transition"
                        >
                          <Trash2 size={16} /> Cancel
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;