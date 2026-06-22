import React from "react";
import { Link } from "react-router-dom";
import {
FaFacebookF,
FaTwitter,
FaInstagram,
FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
return ( <footer className="bg-slate-950 text-white relative overflow-hidden">

```
  {/* Animated Top Border */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>

  <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

    {/* Brand Section */}
    <div>
      <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        MediBook
      </h3>

      <p className="text-slate-400 mt-4 leading-relaxed">
        Making healthcare accessible for everyone.
        Book appointments with trusted doctors anytime,
        anywhere with a seamless experience.
      </p>

      <div className="flex gap-4 mt-6">

        <div className="p-3 rounded-full bg-slate-800 hover:bg-purple-600 hover:scale-110 transition duration-300 cursor-pointer">
          <FaFacebookF />
        </div>

        <div className="p-3 rounded-full bg-slate-800 hover:bg-blue-500 hover:scale-110 transition duration-300 cursor-pointer">
          <FaTwitter />
        </div>

        <div className="p-3 rounded-full bg-slate-800 hover:bg-pink-500 hover:scale-110 transition duration-300 cursor-pointer">
          <FaInstagram />
        </div>

        <div className="p-3 rounded-full bg-slate-800 hover:bg-cyan-500 hover:scale-110 transition duration-300 cursor-pointer">
          <FaLinkedinIn />
        </div>

      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-xl font-semibold mb-5">
        Quick Links
      </h4>

      <ul className="space-y-3">

        <li>
          <Link
            to="/"
            className="text-slate-400 hover:text-purple-400 transition duration-300"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/doctors"
            className="text-slate-400 hover:text-purple-400 transition duration-300"
          >
            Find Doctors
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className="text-slate-400 hover:text-purple-400 transition duration-300"
          >
            About Us
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className="text-slate-400 hover:text-purple-400 transition duration-300"
          >
            Contact
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="text-slate-400 hover:text-purple-400 transition duration-300"
          >
            My Profile
          </Link>
        </li>

      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h4 className="text-xl font-semibold mb-5">
        Contact Information
      </h4>

      <p className="text-slate-400 mb-3">
        📧 Ashutosh@gmail.com
      </p>

      <p className="text-slate-400 mb-3">
        📞 +91 6389456860
      </p>

      <p className="text-slate-400 mb-3">
        📍 Kanpur, Uttar Pradesh, India
      </p>

      <p className="text-slate-500 text-sm mt-4">
        Available 24/7 for your healthcare needs.
      </p>
    </div>

  </div>

  {/* Bottom Copyright */}
  <div className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
    © 2026 MediBook. All Rights Reserved.
  </div>

</footer>


);
};

export default Footer;
