import express from "express";
import send_message from "../Controller/Message_controller.js";

const Message_router = express.Router();

Message_router.post("/send_message", send_message);

export default Message_router;
