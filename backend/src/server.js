import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import metaWebhookRoutes from "./routes/metaWebhookRoutes.js";

// =========================
// LOAD ENVIRONMENT VARIABLES
// =========================

dotenv.config();

// =========================
// META VERIFY TOKEN
// =========================

console.log(
  "META_VERIFY_TOKEN:",
  process.env.META_VERIFY_TOKEN
);

// =========================
// CONNECT TO MONGODB
// =========================

connectDB();

// =========================
// CREATE EXPRESS APP
// =========================

const app = express();

// =========================
// CORS
// =========================
//
// Local development:
// http://localhost:5173
//
// Production:
// FRONTEND_URL from .env
//

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

// =========================
// JSON BODY PARSER
// =========================

app.use(express.json());

// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LeadFlow API is running 🚀",
  });
});

// =========================
// AUTHENTICATION ROUTES
// =========================

app.use(
  "/api/auth",
  authRoutes
);

// =========================
// LEAD ROUTES
// =========================

app.use(
  "/api/leads",
  leadRoutes
);

// =========================
// META WEBHOOK ROUTES
// =========================

app.use(
  "/api/webhooks/meta",
  metaWebhookRoutes
);

// =========================
// 404 ROUTE
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// =========================
// GLOBAL ERROR HANDLER
// =========================

app.use((error, req, res, next) => {
  console.error(
    "Server error:",
    error
  );

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
});

// =========================
// SERVER PORT
// =========================

const PORT =
  process.env.PORT || 5000;

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});