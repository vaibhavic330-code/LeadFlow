import Lead from "../models/Lead.js";

// ======================================================
// CREATE A NEW LEAD
// ======================================================

export const createLead = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      source,
      message,
      status,
      priority,
      followUpDate,
      notes,
      assignedTo,
    } = req.body;

    const lead = await Lead.create({
      name,
      phone,
      email,
      source,
      message,
      status,
      priority,

      // Follow-up date
      followUpDate: followUpDate || undefined,

      notes,
      assignedTo,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    console.error("Create lead error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create lead",
      error: error.message,
    });
  }
};


// ======================================================
// GET ALL LEADS
// ======================================================

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error("Get leads error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
      error: error.message,
    });
  }
};


// ======================================================
// GET SINGLE LEAD
// ======================================================

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Get lead error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
      error: error.message,
    });
  }
};


// ======================================================
// UPDATE LEAD
// ======================================================

export const updateLead = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      source,
      message,
      status,
      priority,
      followUpDate,
      notes,
      assignedTo,
    } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,

      {
        name,
        phone,
        email,
        source,
        message,
        status,
        priority,

        // Follow-up date
        followUpDate: followUpDate || undefined,

        notes,
        assignedTo,
      },

      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.error("Update lead error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update lead",
      error: error.message,
    });
  }
};


// ======================================================
// DELETE LEAD
// ======================================================

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(
      req.params.id
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Delete lead error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete lead",
      error: error.message,
    });
  }
};