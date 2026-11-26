import express from "express";

import { createShow,
         getAllShows, 
         getShowById, 
         updateShow,
         deleteShow 
        } from "../controllers/showController.js";

const router = express.Router();

// Create Show API
router.post("/add", createShow);

//get all show
router.get("/", getAllShows);

//get show by id
router.get("/:id", getShowById);

//update show api
router.put("/:id", updateShow);

//Delete show api
router.delete("/:id", deleteShow);

export default router;