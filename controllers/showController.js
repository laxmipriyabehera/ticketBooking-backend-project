import Show from "../models/Show.js";
import Movie from "../models/Movie.js";

// Create Show
export const createShow = async (req, res) => {
  try {
    const {
      movie,
      theatreName,
      showDate,
      showTime,
      ticketPrice,
      totalSeats,
    } = req.body;

    // Check movie exists
    const existingMovie = await Movie.findById(movie);

    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const show = await Show.create({
      movie,
      theatreName,
      showDate,
      showTime,
      ticketPrice,
      totalSeats,
      availableSeats: totalSeats,
    });

    res.status(201).json({
      success: true,
      message: "Show created successfully",
      data: show,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find().populate("movie");

    res.status(200).json({
      success: true,
      totalShows: shows.length,
      data: shows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Show By ID
export const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate("movie");

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    res.status(200).json({
      success: true,
      data: show,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Show
export const updateShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("movie");

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Show updated successfully",
      data: show,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Show
export const deleteShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndDelete(req.params.id);

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Show deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};