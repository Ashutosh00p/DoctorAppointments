import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Star, Award, Clock, IndianRupee, Loader2, CheckCircle2 } from "lucide-react";
import AppointmentForm from "../components/AppointmentForm";

const Booking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!userData || !token) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
    fetchDoctor();
  }, [doctorId, navigate]);

  const fetchDoctor = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`)
      setDoctor(res.data.data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/my-appointments");
    }, 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Doctor details not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Success Alert */}
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl flex items-center gap-3"
          >
            <CheckCircle2 /> Appointment booked successfully! Redirecting to your dashboard...
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Doctor Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8"
          >
            <div className="text-center mb-8">
              <img
                src={doctor.profileImage || "https://ui-avatars.com/api/?name=" + doctor.name}
                alt={doctor.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-100 object-cover"
              />
              <h2 className="text-2xl font-bold text-slate-900">{doctor.name}</h2>
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
            </div>

            <div className="space-y-4">
              <InfoItem icon={<Award size={18}/>} label="Experience" value={`${doctor.experience} years`} />
              <InfoItem icon={<Star size={18}/>} label="Rating" value={`${doctor.rating}/5.0`} />
              <InfoItem icon={<IndianRupee size={18}/>} label="Consultation Fee" value={`₹${doctor.fees}`} />
              
              <div className="pt-6 border-t border-slate-100">
                <p className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><Clock size={18}/> Available Slots</p>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableSlots?.map(slot => (
                    <span key={slot} className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form Wrapper */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          >
            {user && <AppointmentForm doctor={doctor} user={user} onSuccess={handleBookingSuccess} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
    <span className="text-slate-600 flex items-center gap-2 font-medium">{icon} {label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default Booking;