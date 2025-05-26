import mongoose from "mongoose";

const BaseController = (Model) => ({
  getAll: async (req, res) => {
    try {
      const data = await Model.find({});
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },

  create: async (req, res) => {
    const item = req.body;

    if (!item || Object.keys(item).length === 0) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    try {
      const newItem = new Model(item);
      await newItem.save();
      res.status(201).json({ success: true, data: newItem });
    } catch (error) {
      console.error("Error creating item:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    try {
      const updatedItem = await Model.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedItem) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
      res.status(200).json({ success: true, data: updatedItem 
       });
    } catch (error) {
      console.error("Error updating item:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },

  remove: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    try {
      const deletedItem = await Model.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
      res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
      console.error("Error deleting item:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
});

export default BaseController;
