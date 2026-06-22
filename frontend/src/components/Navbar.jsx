import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Calendar, User, Stethoscope, Home, Info, Mail } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
         <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 p-3 rounded-2xl shadow-lg">
              <Stethoscope className="text-white" size={24} />
            </div>
           <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-sky-600 bg-clip-text text-transparent tracking-tight"> Medi+Book</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" icon={<Home size={18} />} label="Home" />
            <NavLink to="/doctors" icon={<Stethoscope size={18} />} label="Find Doctors" />
            <NavLink to="/about" icon={<Info size={18} />} label="About Us" />
            <NavLink to="/contact" icon={<Mail size={18} />} label="Contact Us" />
            
            {user ? (
              <>
                <div className="relative group flex items-center gap-3 pl-4 border-l border-slate-200">
                  <img 
                    src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                    alt="Profile" 
                   className="w-12 h-12 rounded-full border-2 border-white/50 shadow-lg"
                  />
                  <span className="font-semibold text-slate-700">{user.name}</span>
                  
                  {/* Dropdown */}
                  <div className="hidden group-hover:block absolute top-full right-0 pt-3">
                    <div className="w-56 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 p-3">
                      <Link
                    to="/my-appointments"
                 className="flex items-center gap-2 w-full px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition"
                         >
                   <Calendar size={18} /> My Appointments
                    </Link>
                      <Link
                   to="/profile"
                  className="flex items-center gap-2 w-full px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition"
                         >
                     <User size={18} /> Profile
                       </Link>
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition">
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 ml-2">
                <Link to="/login" className="text-slate-600 font-semibold hover:text-blue-600 transition">Login</Link>
                <Link to="/register" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:scale-105 transition duration-300">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-2">
          <MobileLink to="/" label="Home" onClick={() => setIsOpen(false)} />
          <MobileLink to="/doctors" label="Doctors" onClick={() => setIsOpen(false)} />
          <MobileLink to="/about" label="About Us" onClick={() => setIsOpen(false)} />
          <MobileLink to="/contact" label="Contact Us" onClick={() => setIsOpen(false)} />
          {user ? (
            <>
              <MobileLink to="/my-appointments" label="My Appointments" onClick={() => setIsOpen(false)} />
              <MobileLink to="/profile" label="Profile" onClick={() => setIsOpen(false)} />
              <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-3 text-red-600 font-medium">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <MobileLink to="/login" label="Login" onClick={() => setIsOpen(false)} />
              <MobileLink to="/register" label="Register" onClick={() => setIsOpen(false)} />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-2 px-4 py-2 rounded-xl text-black-600 font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-lg transition-all duration-300">
    {icon} {label}
  </Link>
);


const MobileLink = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick} className="block px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 rounded-xl">
    {label}
  </Link>
);

export default Navbar;