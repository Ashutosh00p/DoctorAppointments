import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, UserCheck, ShieldCheck, ArrowRight } from "lucide-react";
import DoctorList from "../components/DoctorList";


const Home = () => {
  const images = [
    
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=2070",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?w=2070",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=2070",
   
];

const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
   
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div
  className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
  style={{
    backgroundImage: `url(${images[currentImage]})`,
  }}
></div>

<div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-extrabold mb-6 leading-tight ">
              Your Health, <br /> <span className="text-sky-500">Our Priority</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Experience seamless healthcare. Book appointments with top-rated specialists in just a few clicks. Your wellness journey starts here.
            </p>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 bg-sky-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all transform hover:scale-105"
            >
              Book Appointment <ArrowRight size={20} />
            </Link>
          </motion.div>
          
       

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
      <h2 className="text-5xl font-extrabold tracking-tight mb-4">
  <span className="text-blue-600">Why</span>{" "}
  <span className="text-slate-900">Choose</span>{" "}
  <span className="text-teal-500">Us?</span>
</h2>
           <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
            bg ="bg-gradient-to-br from-green-700 via-white to-white-600"
              icon={<Calendar className="text-blue-600 w-10 h-10" />} 
              title="Quick Booking" 
              desc="Forget the wait. Schedule your consultations instantly at your preferred time." 
            />
            <FeatureCard 
           bg ="bg-gradient-to-br from-sky-600 via-white to-white-600"
              icon={<UserCheck className="text-blue-600 w-10 h-10" />} 
              title="Expert Doctors" 
              desc="Verified specialists and professionals dedicated to your recovery." 
            />
            <FeatureCard
             bg ="bg-gradient-to-br from-pink-600 via-white to-white-800"
              icon={<ShieldCheck className="text-blue-600 w-10 h-10" />} 
              title="Secure & Private" 
              desc="Your medical data is encrypted and kept 100% confidential." 
            />
          </div>
        </div>
      </section>

      <DoctorList />
    </div>
  );
};

// Helper Component (Same file mein rakha hai for simplicity, 
// agar bada project hai toh isse separate file mein move kar sakte hain)
const FeatureCard = ({ icon, title, desc,bg }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
       className={`${bg} p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all`}
    >
      <div className="mb-6 bg-blue-50 inline-block p-4 rounded-xl">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export default Home;