import express from "express";
import {
  send_message,
  get_all_message,
} from "../Controller/Message_controller.js";
import { is_Admin_authenticated } from "../Middleware/Auth_middleware.js";

const Message_router = express.Router();

Message_router.post("/send_message", send_message);
Message_router.get("/get_messages", is_Admin_authenticated, get_all_message);

export default Message_router;
