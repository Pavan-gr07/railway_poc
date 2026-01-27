import { Router, RequestHandler } from "express";
import { getTrains, getTrain, updateTrain } from "../db/trains";

const router = Router();

// Get all trains
export const handleGetTrains: RequestHandler = (req, res) => {
  const trains = getTrains();
  res.status(200).json({ trains });
};

// Get single train
export const handleGetTrain: RequestHandler = (req, res) => {
  const { id } = req.params;
  const train = getTrain(id);

  if (!train) {
    return res.status(404).json({ error: "Train not found" });
  }

  res.status(200).json(train);
};

// Update train (triggers automatic announcements)
export const handleUpdateTrain: RequestHandler = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const train = updateTrain(id, updates);

  if (!train) {
    return res.status(404).json({ error: "Train not found" });
  }

  res.status(200).json(train);
};

// Set up routes
router.get("/", handleGetTrains);
router.get("/:id", handleGetTrain);
router.put("/:id", handleUpdateTrain);

export default router;
