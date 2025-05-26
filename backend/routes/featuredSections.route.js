import express from "express";
import {
  createFeaturedSection,
  getAllFeaturedSections,
  deleteFeaturedSection
} from "../controllers/featuredSection.controller.js";

const router = express.Router();

router.post("/", createFeaturedSection);
router.get("/", getAllFeaturedSections);
router.delete("/:id", deleteFeaturedSection);

export default router;