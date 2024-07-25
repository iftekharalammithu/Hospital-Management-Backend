import { Schema, model } from "mongoose";
import validator from "validator";

const messageSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,

      required: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    message: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      minlength: [11, "Phone number must be exactly 11 characters long"],
      maxlength: [11, "Phone number must be exactly 11 characters long"],
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;
