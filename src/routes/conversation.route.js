import express from "express";
import trimRequest from "trim-request";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createOpenConversation,
  getConversations,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", trimRequest.all, authMiddleware, createOpenConversation);

router.get("/", trimRequest.all, authMiddleware, getConversations);

export default router;
