import express from "express";
import { patient_Regester } from "../Controller/User_Controller.js";

const User_Router = express.Router();

User_Router.post("/patient/regester", patient_Regester);

export default User_Router;
