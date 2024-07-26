import User from "../Model_DB/User_Schema.js";
import { generate_token } from "../Utils/JWT_Generator.js";
import cloudinary from "cloudinary";

const patient_Regester = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      nid,
      gender,
      role,
      password,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !nid ||
      !gender ||
      !role ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // create a new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      dob,
      nid,
      gender,
      role,
      password,
    });

    // save the user to the database
    await newUser.save();

    generate_token(newUser, "Patient Regester Successfully", 200, res);

    // send the response
    // res.status(200).json({
    //   success: true,
    //   message: "Patient Regester Successfully",
    //   data: newUser,
    // });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to Regester Patient",
    });
  }
};

// add a login function where user privide email and password . if it validate generate the jwt token save it to user browser
const patient_login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "User Not Found With This Role",
      });
    }

    // generate the jwt token
    // const token = user.getJwtToken();

    // send the response
    generate_token(user, "Login Successfully", 200, res);

    // res.status(200).json({
    //   success: true,
    //   message: "Login Successfully",
    //   data: {
    //     // token,
    //     user,
    //   },
    // });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to Login",
    });
  }
};

// add a function as add_new_admin which is create a admin account in userschema
const add_new_admin = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, dob, nid, gender, password } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !nid ||
      !gender ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `Email are already exists as ${existingUser.role}`,
      });
    }

    // create a new user object
    const admin = new User({
      firstName,
      lastName,
      email,
      phone,
      dob,
      nid,
      gender,
      role: "Admin",
      password,
    });

    // save the user to the database
    await admin.save();

    // generate_token(admin, "Admin Regester Successfully", 200, res);

    // send the response
    res.status(200).json({
      success: true,
      message: "Admin Regester Successfully",
      data: admin,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to Regester Admin",
    });
  }
};

const get_all_doctor = async (req, res) => {
  try {
    const doctors = await User.find({ role: "Doctor" });

    if (!doctors) {
      return res.status(400).json({
        success: false,
        message: "No doctors found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to get doctors",
    });
  }
};

// make a function to get the user data and send it as Response
const get_user_data = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to get user data",
    });
  }
};

// make a admin logout function
const admin_logout = async (req, res) => {
  try {
    res.clearCookie("adminToken");
    res.status(200).json({
      success: true,
      message: "Admin Logout Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to Logout Admin",
    });
  }
};

// make a patient logout function
const patient_logout = async (req, res) => {
  try {
    res.clearCookie("patientToken");
    res.status(200).json({
      success: true,
      message: "Patient Logout Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to Logout Patient",
    });
  }
};

const add_new_Doctor = async (req, res) => {
  // make a if condition that varify the req.file exist or not
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload Doctor Picture",
    });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    nid,
    gender,
    role,
    password,
    doctor_avtar,
    doctor_deperment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !nid ||
    !gender ||
    !doctor_avtar ||
    !doctor_deperment ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: `Email already exists as ${existingUser.role}`,
    });
  }

  //   allow image only jpeg,png,webp,jpg
  if (
    req.file.mimetype !== "image/jpeg" &&
    req.file.mimetype !== "image/png" &&
    req.file.mimetype !== "image/webp" &&
    req.file.mimetype !== "image/jpg"
  ) {
    return res.status(400).json({
      success: false,
      message: "Please upload image only",
    });
  }

  // upload the file to cloudinary
  const image_upload = await cloudinary.uploader.upload(
    req.file.path,
    (error, result) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
        });
      }
    }
  );

  const new_Doctor = new User({
    firstName,
    lastName,
    email,
    phone,
    dob,
    nid,
    gender,
    role,
    password,
    doctor_avtar,
    doctor_deperment,
  });

  // save the user to the database
  await new_Doctor.save().catch((error) => {
    res.status(500).json({
      success: false,
      message: "Failed to create doctor",
    });
  });
};

export {
  patient_Regester,
  patient_login,
  add_new_admin,
  get_all_doctor,
  get_user_data,
  admin_logout,
  patient_logout,
};
