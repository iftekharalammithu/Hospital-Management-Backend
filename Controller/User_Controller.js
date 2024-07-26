import User from "../Model_DB/User_Schema.js";
import { generate_token } from "../Utils/JWT_Generator.js";

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

export { patient_Regester, patient_login, add_new_admin };
