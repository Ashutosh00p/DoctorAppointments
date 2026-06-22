import React, { useState } from 'react';
import API from "../api/axiosConfig";

const Contact = () => {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});



const [success, setSuccess] = useState("");
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/contact", formData);

      setSuccess(data.message);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to send message"
      );
    }
  };

  
  return (
   <div className="min-h-screen bg-purple-100 py-16 px-6 flex items-center justify-center">
  <div className="relative p-[3px] rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 via-blue-500 to-purple-500 animate-gradient">

    <div className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-2xl shadow-2xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
        Contact Us
      </h2>

      <p className="text-center text-gray-500 mb-8">
        We'd love to hear from you. Send us a message.
      </p>
      {success && (
      <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-xl text-center font-semibold">
    {success}
      </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Name
          </label>
         <input
  type="text"
  placeholder="Enter your name"
  value={formData.name}
  onChange={(e) =>
    setFormData({
      ...formData,
      name: e.target.value
    })
  }
      className="w-full p-4 border rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
              />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Email
          </label>
         <input
  type="email"
  placeholder="Enter your email"
  value={formData.email}
  onChange={(e) =>
    setFormData({
      ...formData,
      email: e.target.value
        })
        }
    className="w-full p-4 border rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
              />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Message
          </label>
          <textarea
  rows="5"
  placeholder="How can we help?"
  value={formData.message}
  onChange={(e) =>
    setFormData({
      ...formData,
      message: e.target.value
    })
  }
  className="w-full p-4 border rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
         ></textarea>
        </div>

        <button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
        >
          Send Message 🚀
        </button>

      </form>
    </div>

  </div>
</div>
  );
};
export default Contact;