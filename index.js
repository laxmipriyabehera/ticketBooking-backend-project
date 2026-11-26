import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import {authorizeRoles} from "./middleware/roleMiddleware.js";
import  {protect}  from "./middleware/authMiddleware.js";
import showRoutes from "./routes/showRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Movie Booking API is running!");
});

app.get("/api/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile data fetched successfully",
    user: req.user
  });
});

// User Only Route
app.get(
  "/api/user-dashboard",
  protect,
  authorizeRoles("user"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome to User Dashboard",
    });
  }
);

// Customer Only Route
app.get(
  "/api/customer-dashboard",
  protect,
  authorizeRoles("customer"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome to Customer Dashboard",
    });
  }
);

// Admin Only Route
app.get(
  "/api/admin-dashboard",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome to Admin Dashboard",
    });
  }
);

// start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Server Startup Error:", error.message);
    }
};

startServer();