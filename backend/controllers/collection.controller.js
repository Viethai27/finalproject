import BaseController from "./BaseController.controller.js";
import Collection from "../models/Collection.model.js";

export const {
  getAll: getCollections,
  create: createCollection,
  update: updateCollection,
  remove: deleteCollection
} = BaseController(Collection);