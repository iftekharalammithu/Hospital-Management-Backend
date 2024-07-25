import express from "express";
import send_message from "../Controller/Message_controller.js";

const router = express.Router();

router.post("/send_message", send_message);

export default router;
