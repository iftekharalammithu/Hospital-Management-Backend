import express from "express";
import {
  add_new_admin,
  patient_login,
  patient_Regester,
} from "../Controller/User_Controller.js";

const User_Router = express.Router();

User_Router.post("/patient/regester", patient_Regester);
User_Router.post("/login", patient_login);
User_Router.post("/admin/regester", add_new_admin);

export default User_Router;
