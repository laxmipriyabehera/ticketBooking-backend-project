import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const { show, seats } = req.body;

    // Check seats
    if (!seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one seat",
      });
    }

    // Check Show
    const existingShow = await Show.findById(show);

    if (!existingShow) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    // Check available seats
    if (existingShow.availableSeats < seats.length) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // Calculate total amount
    const totalAmount = seats.length * existingShow.ticketPrice;

    // Create Booking
    const booking = await Booking.create({
      user: req.user.id,
      show,
      seats,
      totalAmount,
    });

    // Update available seats
    existingShow.availableSeats -= seats.length;
    await existingShow.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};