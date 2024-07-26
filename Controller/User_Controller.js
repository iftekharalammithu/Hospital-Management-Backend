import User from "../Model_DB/User_Schema.js";

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

    // send the response
    res.status(201).json({
      success: true,
      message: "Patient Regester Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to Regester Patient",
    });
  }
};

export { patient_Regester };
