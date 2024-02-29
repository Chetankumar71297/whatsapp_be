import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  createConversation,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";

export const createOpenConversation = async (req, res, next) => {
  try {
    const sender_id = req.user.userId; //here user is added by authMiddleware, user is payload({userId: newUser._id} returned by jwt.verify. for more details look token generation step in authController)
    const { receiver_id } = req.body;

    //check for receiver_id
    if (!receiver_id) {
      logger.error(
        "Please provide the users id you wanna start a conversation with!."
      );
      throw createHttpError.BadRequest("Oops...Something went wrong.");
    }

    //check if chat exists
    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );

    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      //let receiver_user = await findUser(receiver_id);
      let convoData = {
        name: "conversation name",
        picture: "conversation picture",
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      const newConvo = await createConversation(convoData);
      const populatedConvo = await populateConversation(
        newConvo._id,
        "users",
        "-password"
      );
      res.status(200).json(populatedConvo);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const user_id = req.user.userId; //here user is added by authMiddleware, user is payload({userId: newUser._id} returned by jwt.verify. for more details look token generation step in authController)
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
