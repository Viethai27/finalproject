import Subvariation from "../models/Subvariation.model.js";

export const getSubvariationsByVariation = async (req, res) => {
  try {
 
    const subvariations = await Subvariation.find({ variation: req.params.variationId });
    res.status(200).json({ success: true, data: subvariations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSubvariation = async (req, res) => {
  try {
    const { name } = req.body;
    const subvariation = new Subvariation({ variation: req.params.variationId, name });
    await subvariation.save();
    res.status(201).json({ success: true, data: subvariation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
