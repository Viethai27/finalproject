import express from "express";
import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection
} from "../controllers/collection.controller.js";

const router = express.Router();

router.get("/", getCollections);
router.post("/", createCollection);
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);

export default router;
