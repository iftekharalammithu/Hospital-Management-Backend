import express from "express";
import {
  add_new_admin,
  admin_logout,
  get_all_doctor,
  get_user_data,
  patient_login,
  patient_logout,
  patient_Regester,
} from "../Controller/User_Controller.js";
import {
  is_Admin_authenticated,
  is_Patient_authenticated,
} from "../Middleware/Auth_middleware.js";

const User_Router = express.Router();

User_Router.get("/doctors", get_all_doctor);
User_Router.post("/patient/regester", patient_Regester);
User_Router.post("/login", patient_login);
User_Router.post("/admin/regester", is_Admin_authenticated, add_new_admin);
User_Router.get("/admin/me", is_Admin_authenticated, get_user_data);
User_Router.get("/patient/me", is_Patient_authenticated, get_user_data);
User_Router.get("/admin/logout", is_Admin_authenticated, admin_logout);
User_Router.get("/patient/logout", is_Patient_authenticated, patient_logout);

export default User_Router;
