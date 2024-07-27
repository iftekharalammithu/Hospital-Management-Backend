import express from "express";
import {
  delete_appointment_by_patient_id,
  get_all_appointment,
  post_appointment,
  update_appointment_by_patient_id,
} from "../Controller/Appointment_Controller.js";
import {
  is_Admin_authenticated,
  is_Patient_authenticated,
} from "../Middleware/Auth_middleware.js";

const appointment_router = express.Router();

appointment_router.post(
  "/apply_appointment",
  is_Patient_authenticated,
  post_appointment
);
appointment_router.get(
  "/get_appointment",
  is_Admin_authenticated,
  get_all_appointment
);
appointment_router.put(
  "/update_appointment/:appointment_id",
  is_Admin_authenticated,
  update_appointment_by_patient_id
);
appointment_router.delete(
  "/delete_appointment/:appointment_id",
  is_Admin_authenticated,
  delete_appointment_by_patient_id
);

export default appointment_router;
