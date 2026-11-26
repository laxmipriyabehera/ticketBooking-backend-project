import Movie from "../models/Movie.js";

// Add New Movie
export const addMovie = async (req, res) => {
  try {
    const {
      name,
      genre,
      language,
      rating,
      ticketPrice,
      releaseYear,
      bookingStatus,
    } = req.body;

    const movie = await Movie.create({
      name,
      genre,
      language,
      rating,
      ticketPrice,
      releaseYear,
      bookingStatus,
    });

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
        success: true,
        count: movies.length,
        data: movies
    });
}catch (error){
    res.status(500).json({
        success: false,
        message: error.message,
    })
}
}
//get movies with rating less than
export const getMoviesByRatingLessThan = async (req,res) =>{
    try{
        const rating = Number(req.query.rating);
        const movies = await Movie.find({
            rating: { $lt: rating }
        });
        res.status(200).json({
          success: true,
          count: movies.length,
          data: movies
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
        }

//get movies with rating greater than
export const getMoviesByRating = async (req,res) =>{
    try{
        const rating = Number(req.query.rating);
        const movies = await Movie.find({
            rating: { $gt: rating }
        });
        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Movies With Rating Greater Than or Equal
export const getMoviesByRatingGte = async (req, res) => {
  try {
    const rating = Number(req.query.rating);

    const movies = await Movie.find({
      rating: { $gte: rating }
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get movies with rating less than or equal
export const getMoviesByRatingLte = async (req, res) => {
  try {
    const rating = Number(req.query.rating);
    const movies = await Movie.find({
      rating: { $lte: rating }
    });
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies By Excluding Genre
export const getMoviesByGenreNotEqual = async (req, res) => {
  try {
    const genre = req.query.genre;

    const movies = await Movie.find({
      genre: { $ne: genre }
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies By Multiple Genres
export const getMoviesByGenreIn = async (req, res) => {
  try {
    const genres = req.query.genre.split(",");

    const movies = await Movie.find({
      genre: { $in: genres }
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies By Excluding Multiple Genres
export const getMoviesByGenreNin = async (req, res) => {
  try {
    const genres = req.query.genre.split(",");

    const movies = await Movie.find({
      genre: { $nin: genres }
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies Using OR Operator
export const getMoviesByOr = async (req, res) => {
  try {
    const movies = await Movie.find({
      $or: [
        { rating: { $gt: Number(req.query.rating) } },
        { genre: req.query.genre }
      ]
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies Using AND Operator
export const getMoviesByAnd = async (req, res) => {
  try {
    const movies = await Movie.find({
      $and: [
        { rating: { $gt: Number(req.query.rating) } },
        { ticketPrice: { $lt: Number(req.query.price) } }
      ]
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies By Field Existence
export const getMoviesByFieldExists = async (req, res) => {
  try {
    const movies = await Movie.find({
      language: { $exists: true }
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search Movies By Name
export const searchMoviesByName = async (req, res) => {
  try {
    const search = req.query.name;

    const movies = await Movie.find({
      name: {
        $regex: search,
        $options: "i"
      }
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies Sorted By Rating
export const getMoviesSorted = async (req, res) => {
  try {
    const movies = await Movie.find().sort({
      rating: -1
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Limited Movies
export const getLimitedMovies = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;

    const movies = await Movie.find().limit(limit);

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies Using Skip
export const getSkippedMovies = async (req, res) => {
  try {
    const skip = Number(req.query.skip) || 0;

    const movies = await Movie.find().skip(skip);

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Movie Pagination
export const getMoviesPagination = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalMovies = await Movie.countDocuments();

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalMovies / limit),
      totalMovies,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies Released After a Particular Year
export const getMoviesByReleaseYear = async (req, res) => {
  try {
    const year = Number(req.query.year);

    const movies = await Movie.find({
      releaseYear: { $gt: year }
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies By Ticket Price Range
export const getMoviesByPriceRange = async (req, res) => {
  try {
    const minPrice = Number(req.query.min);
    const maxPrice = Number(req.query.max);

    const movies = await Movie.find({
      ticketPrice: {
        $gte: minPrice,
        $lte: maxPrice
      }
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies By Genre
export const getMoviesByGenre = async (req, res) => {
  try {
    const genre = req.query.genre;

    const movies = await Movie.find({
      genre: genre
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Movies By Booking Status
export const getMoviesByBookingStatus = async (req, res) => {
  try {
    const status = req.query.status;

    const movies = await Movie.find({
      bookingStatus: status
    });

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Combined Movie Filter
export const filterMovies = async (req, res) => {
  try {
    const { genre, status } = req.query;

    const rating = Number(req.query.rating);
    const price = Number(req.query.price);

    const filter = {};

    if (genre) {
      filter.genre = genre;
    }

    if (status) {
      filter.bookingStatus = status;
    }

    if (req.query.rating) {
      filter.rating = { $gt: rating };
    }

    if (req.query.price) {
      filter.ticketPrice = { $lt: price };
    }

    const movies = await Movie.find(filter);

    res.status(200).json({
      success: true,
      totalMovies: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get Movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    res.status(200).json({
      success: true,
      data: movie
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Movie
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Movie
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      data: deletedMovie,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
