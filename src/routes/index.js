import express from "express";
import authRoutes from "./auth.route.js";
import createOpenConversation from "./conversation.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversation", createOpenConversation);

export default router;
