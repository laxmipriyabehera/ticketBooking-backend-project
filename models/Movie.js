import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
      trim: true
    },

    genre: {
      type: String,
      required: true
    },

    language: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },

    ticketPrice: {
      type: Number,
      required: true,
      min: 0
    },

    releaseYear: {
      type: Number,
      required: true
    },

    bookingStatus: {
      type: String,
      enum: ["Available", "Sold Out"],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;