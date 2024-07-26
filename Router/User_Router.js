import express from "express";
import {
  add_new_admin,
  patient_login,
  patient_Regester,
} from "../Controller/User_Controller.js";
import { is_Admin_authenticated } from "../Middleware/Auth_middleware.js";

const User_Router = express.Router();

User_Router.post("/patient/regester", patient_Regester);
User_Router.post("/login", patient_login);
User_Router.post("/admin/regester", is_Admin_authenticated, add_new_admin);

export default User_Router;
