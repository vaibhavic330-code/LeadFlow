import express from "express";

import {
  verifyMetaWebhook,
  handleMetaWebhook,
} from "../controllers/metaWebhookController.js";

const router = express.Router();

/*
  Meta webhook verification
*/
router.get(
  "/",
  verifyMetaWebhook
);

/*
  Meta sends lead events here
*/
router.post(
  "/",
  handleMetaWebhook
);

export default router;