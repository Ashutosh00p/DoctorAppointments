import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { User, Mail, Phone, Calendar, Loader2 } from "lucide-react";

const Profile = ({ appUser, setAppUser }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState("");

const [formData, setFormData] = useState({
  name: "",
  phone: "",
  profileImage: ""
});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/auth/profile");
      setUser(data.user);
      setFormData({
  name: data.user.name || "",
  phone: data.user.phone || "",
  profileImage: data.user.profileImage || ""
});
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async () => {
  try {
    const { data } = await API.put("/auth/profile", formData);

    setUser(data.user);
setAppUser(data.user);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setSuccess("Profile Updated Successfully");

setTimeout(() => {
  setSuccess("");
}, 3000);

    setEditing(false);
  } catch (error) {
    console.error(error);
  console.log(error.response?.data);

  alert(
    error.response?.data?.message || "Failed to update profile"
  );
}
};

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {success && (
  <div className="bg-green-500 text-white text-center py-3 font-semibold">
    ✅ {success}
  </div>
)}
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center">
          <img
            src={user?.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white mx-auto object-cover"
          />
          
          <h2 className="text-3xl font-bold text-white mt-4">
            {user?.name}
          </h2>
          <p className="text-purple-100">{user?.email}</p>
        </div>

        {/* Profile Details */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-purple-50 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <User className="text-purple-600" />
                <div>
                  <p className="text-gray-500 text-sm">Name</p>
                  <p className="font-semibold">{user?.name}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <Mail className="text-purple-600" />
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <Phone className="text-purple-600" />
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="font-semibold">
                    {user?.phone || "Not Added"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <Calendar className="text-purple-600" />
                <div>
                  <p className="text-gray-500 text-sm">Joined</p>
                  <p className="font-semibold">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

          </div>
{editing && (
  <div className="mt-8 bg-purple-50 p-6 rounded-2xl space-y-4">

    <input
      type="text"
      placeholder="Name"
      value={formData.name}
      onChange={(e) =>
        setFormData({ ...formData, name: e.target.value })
      }
      className="w-full p-3 border rounded-xl"
    />

    <input
      type="text"
      placeholder="Phone"
      value={formData.phone}
      onChange={(e) =>
        setFormData({ ...formData, phone: e.target.value })
      }
      className="w-full p-3 border rounded-xl"
    />

    <input
      type="text"
      placeholder="Profile Image URL"
      value={formData.profileImage}
      onChange={(e) =>
        setFormData({
          ...formData,
          profileImage: e.target.value
        })
      }
      className="w-full p-3 border rounded-xl"
    />

    <button
      onClick={handleUpdate}
      className="bg-green-600 text-white px-6 py-3 rounded-xl"
    >
      Save Changes
    </button>

  </div>
)}
          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
           <button
             onClick={() => setEditing(!editing)}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
             >
            {editing ? "Cancel" : "Edit Profile"}
                 </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;