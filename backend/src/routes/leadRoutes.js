import express from "express";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

const router = express.Router();

// Create a new lead
router.post("/", createLead);

// Get all leads
router.get("/", getLeads);

// Get a single lead
router.get("/:id", getLeadById);

// Update a lead
router.put("/:id", updateLead);

// Delete a lead
router.delete("/:id", deleteLead);

export default router;