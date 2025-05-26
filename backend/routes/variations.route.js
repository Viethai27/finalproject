import express from "express";
import {
  getVariations,
  createVariation
} from "../controllers/variation.controller.js";

const router = express.Router();

router.get("/", getVariations);
router.post("/", createVariation);

export default router;
