require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("../config/db");



// Connect to MongoDB

 connectDB(); 



const app = express();



// --- Middleware ---

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// CORS configuration: Aapke frontend origin ko allow karein

app.use(cors({

    origin: true,//process.env.FRONTEND_URL || "http://localhost:5173",

    credentials: true

}));



// --- Routes ---

app.use("/api/auth", require("../routes/auth"));

app.use("/api/doctor", require("../routes/doctor"));

app.use("/api/appointment", require("../routes/appointment"));

// Naya Contact route yahan add kiya hai

app.use("/api/contact", require("../routes/contactRoutes"));



// Health check

app.get("/api/health", (req, res) => {

    res.status(200).json({ success: true, message: "Server is running perfectly" });

});



// --- Error handling middleware ---

// Yeh hamesha saare routes ke baad hona chahiye

app.use((err, req, res, next) => {

    console.error(`[Error]: ${err.stack}`);

    res.status(err.status || 500).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

});

module.exports = app;