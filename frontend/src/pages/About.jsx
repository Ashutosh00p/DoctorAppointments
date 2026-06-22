import React from "react";
import {
  HeartPulse,
  ShieldCheck,
  CalendarCheck,
  Users,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 via-white-500 to-purple-500">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          About MediBook
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-purple-100 leading-relaxed">
          MediBook is a modern healthcare platform designed to connect
          patients with trusted doctors and simplify appointment booking.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div className="bg-gradient-to-br from-red-700 via-green-700 to-fuchsia-600 rounded-3xl p-8 text-white shadow-[0_20px_50px_rgba(139,92,246,0.35)] hover:scale-105 transition-all duration-500">
            <h2 className="text-3xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="text-purple-100 leading-relaxed">
              To make healthcare accessible, convenient, and efficient
              for everyone by providing seamless doctor appointment
              booking and patient management solutions.
            </p>
          </div>

          <div  className="bg-gradient-to-br from-sky-600 via-blue-700 to-cyan-500 rounded-3xl p-8 text-white shadow-[0_20px_50px_rgba(59,130,246,0.35)] hover:scale-105 transition-all duration-500" >
            <h2 className="text-3xl font-bold mb-4">
              Our Vision
            </h2>

            <p className="text-purple-100 leading-relaxed">
              To become the most trusted digital healthcare platform,
              helping millions of patients connect with the right
              doctors anytime and anywhere.
            </p>
          </div>

        </div>

        {/* Why Choose Us */}
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-bold">
            Why Choose MediBook?
          </h2>

          <p className="mt-4 text-purple-100">
            Trusted healthcare solutions built for modern patients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition duration-300">
            <HeartPulse className="text-purple-600 mb-4" size={50} />
            <h3 className="text-xl font-bold mb-3">
              Verified Doctors
            </h3>
            <p className="text-gray-600">
              Connect with experienced and trusted healthcare professionals.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition duration-300">
            <CalendarCheck className="text-blue-600 mb-4" size={50} />
            <h3 className="text-xl font-bold mb-3">
              Easy Booking
            </h3>
            <p className="text-gray-600">
              Book appointments within minutes without any hassle.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition duration-300">
            <ShieldCheck className="text-green-600 mb-4" size={50} />
            <h3 className="text-xl font-bold mb-3">
              Secure Data
            </h3>
            <p className="text-gray-600">
              Your personal and medical information stays protected.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition duration-300">
            <Users className="text-pink-600 mb-4" size={50} />
            <h3 className="text-xl font-bold mb-3">
              Patient Focused
            </h3>
            <p className="text-gray-600">
              Built to provide a smooth and comfortable healthcare experience.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;