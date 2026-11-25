import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Movie Booking API is running!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });