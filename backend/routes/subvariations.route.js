import express from "express";
import {
  getSubvariationsByVariation,
  createSubvariation
} from "../controllers/subvariation.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", getSubvariationsByVariation);
router.post("/", createSubvariation);

export default router;
 