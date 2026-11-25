import Movie from "../models/Movie.js";

// Create a new movie
export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
        success: true,
        message: "Movie created successfully",
        data: movie
    });
  } catch (error) {
    res.status(400).json({
        success: false,
        message: "Failed to create movie",
        error: error.message
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
//get movies released in a perticular year
export const getMoviesByReleaseYear = async (req,res) =>{
    try{
        const year = Number(req.query.year);

        if(!year || isNaN(year)){
            return res.status(400).json({
                success: false,
                message: "Invalid year provided"
            });
        }
        const movies = await Movie.find({
            releaseYear: { $gt: year}

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

//get movies with rating above a perticular score
export const getMoviesByRating = async (req,res) =>{
    try{
        const rating = Number(req.query.rating);
        if(isNaN(rating) || rating < 0 || rating > 10){
            return res.status(400).json({
                success: false,
                message: "rating must be between 0 and 10"
            });
        }
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

// get movies within a price range
export const getMoviesByPrice = async (req,res) =>{
    try{
        const minPrice = Number(req.query.min);
        const maxPrice = Number(req.query.max);

        if(isNaN(minPrice) || 
        isNaN(maxPrice) || 
        minPrice < 0 || 
        maxPrice < minPrice){
            return res.status(400).json({
                success: false,
                message: "Invalid price range provided"
            });
        }
        const movies = await Movie.find({
            ticketPrice: { $gte: minPrice, $lte: maxPrice }
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

// Get Movies by Genre
export const getMoviesByGenre = async (req, res) => {
  try {
    const genre = req.query.genre;

    if (!genre) {
      return res.status(400).json({
        success: false,
        message: "Genre is required"
      });
    }

    const movies = await Movie.find({
      genre: { $regex: genre, $options: "i" }
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


// Get Movies Available for Booking
export const getAvailableMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      bookingStatus: "Available"
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
