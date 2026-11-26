import express from "express";

import {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getMoviesByRating,
  getMoviesByRatingLessThan,
  getMoviesByRatingGte,
  getMoviesByRatingLte,
  getMoviesByGenreNotEqual,
  getMoviesByGenreIn,
  getMoviesByGenreNin,
  getMoviesByOr,
  getMoviesByAnd,
  getMoviesByFieldExists,
  searchMoviesByName,
  getMoviesSorted,
  getLimitedMovies,
  getSkippedMovies,
  getMoviesPagination,
  getMoviesByReleaseYear,
  getMoviesByPriceRange,
  getMoviesByGenre,
  getMoviesByBookingStatus,
  filterMovies
} from "../controllers/movieController.js";

const router = express.Router();

// Create Movie
router.post("/add", addMovie);

// Get All Movies
 router.get("/", getAllMovies);

 // Search Movies
 router.get("/rating/greater", getMoviesByRating);

 router.get("/rating/less", getMoviesByRatingLessThan);

 router.get("/rating/greater-equal", getMoviesByRatingGte);

 router.get("/rating/less-equal", getMoviesByRatingLte);

 router.get("/genre/in", getMoviesByGenreIn);

 router.get("/genre/not-equal", getMoviesByGenreNotEqual);

 router.get("/genre/not-in", getMoviesByGenreNin);

 router.get("/filter/or", getMoviesByOr);

 router.get("/filter/or", getMoviesByAnd);

 router.get("/filter/exists", getMoviesByFieldExists);

 router.get("search", searchMoviesByName);

 router.get("/sort", getMoviesSorted);

 router.get("/limit", getLimitedMovies);

 router.get("/skip", getSkippedMovies); 

 router.get("/pagination", getMoviesPagination);

 router.get("/release-year", getMoviesByReleaseYear);

 router.get("/price-range", getMoviesByPriceRange);

 router.get("/genre", getMoviesByGenre);

 router.get("/booking-status", getMoviesByBookingStatus);

 router.get("/filter", filterMovies);



 // Get Movie by ID
 router.get("/:id", getMovieById);

 // Update Movie
 router.put("/:id", updateMovie);

 // Delete Movie
 router.delete("/:id", deleteMovie);

export default router;