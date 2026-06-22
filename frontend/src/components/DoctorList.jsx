
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Award, Star } from "lucide-react";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialization, setSpecialization] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "";  //"http://localhost:5000";

      const res = await axios.get(API_URL + "/api/doctor");

      const doctorsData =
        res.data?.data ||
        res.data?.doctors ||
        res.data ||
        [];

      const validData = Array.isArray(doctorsData)
        ? doctorsData
        : [];

      setDoctors(validData);
      setFilteredDoctors(validData);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (spec) => {
    setSpecialization(spec);

    if (spec === "All") {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(
        doctors.filter(
          (doctor) => doctor.specialization === spec
        )
      );
    }
  };

  const specializations = [
    "All",
    "Cardiology",
    "ENT",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "General",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-green-500 mb-4">
            Find Your Specialist
          </h2>

          <p className="text-slate-900 max-w-lg mx-auto">
            Browse our team of expert doctors and book your consultation in minutes.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => handleFilter(spec)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                specialization === spec
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredDoctors.map((doctor) => (
              <motion.div
                key={doctor._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-purple-50 rounded-3xl p-6 shadow-lg border border-blue-500 hover:bg-purple-100 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={
                      doctor.profileImage ||
                      `https://ui-avatars.com/api/?name=${doctor.name}`
                    }
                    alt={doctor.name}
                    className="w-20 h-20 rounded-2xl object-cover bg-slate-100"
                  />

                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {doctor.name}
                    </h3>

                    <p className="text-blue-600 text-sm font-semibold">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Award size={16} />
                    <span>{doctor.experience || 0} Years Experience</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span>{doctor.rating || 4.5} Rating</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-slate-900">
                    ₹{doctor.fees || 500}
                  </span>

                  <Link
                    to={`/booking/${doctor._id}`}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-600 transition"
                  >
                    Book Appointment
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorList;

