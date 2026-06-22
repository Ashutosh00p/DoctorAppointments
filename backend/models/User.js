const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
 {
 name: { type: String, required: true, trim: true, maxlength: 100 },
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true, minlength: 6, select: false },
 role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" },
 phone: { type: String, trim: true },
 profileImage: { type: String, default: "https://via.placeholder.com/150" }
 },
 { timestamps: true }
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function(enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);