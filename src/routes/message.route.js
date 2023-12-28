import express from "express";
import trimRequest from "trim-request";
import authMiddleware from "../middlewares/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", trimRequest.all, authMiddleware, sendMessage);
router.get("/:convo_id", trimRequest.all, authMiddleware, getMessages);

export default router;
