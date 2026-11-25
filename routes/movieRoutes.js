import express from "express";

import {
  createMovie,
  getAllMovies,
  getMoviesByReleaseYear,
  getMoviesByRating,
  getMoviesByPrice,
  getMoviesByGenre,
  getAvailableMovies,
  getMovieById
} from "../controllers/movieController.js";

const router = express.Router();

// Create Movie
router.post("/", createMovie);

// Get All Movies
router.get("/", getAllMovies);

// Search Movies
router.get("/released-after", getMoviesByReleaseYear);

router.get("/rating-above", getMoviesByRating);

router.get("/price-range", getMoviesByPrice);

router.get("/genre", getMoviesByGenre);

router.get("/available", getAvailableMovies);

// Get Movie by ID
router.get("/:id", getMovieById);

export default router;