import mongoose, { model, Schema } from "mongoose";
import validator from "validator";

const Appointment_Schema = new Schema(
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

    nid: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      minlength: [11, "Phone number must be exactly 11 characters long"],
      maxlength: [11, "Phone number must be exactly 11 characters long"],
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    appointment_date: {
      type: String,
      required: true,
    },
    deperment: {
      type: String,
      required: true,
    },
    doctor_name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    has_visited: {
      type: Boolean,
      default: false,
      require: true,
    },
    doctor_id: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    patient_id: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Appointment = model("Appointment", Appointment_Schema);

export default Appointment;
