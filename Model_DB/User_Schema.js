import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
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
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 6 characters long"],
      select: false, //it help to not send the password as response
    },
    role: {
      type: String,
      required: true,
      enum: ["Patient", "Doctor", "Admin"],
      default: "Patient",
    },
    doctor_deperment: {
      type: String,
    },
    doctor_avtar: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

// add a function that decrypt the password with bcrypt  before save in database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// add a function that compare the password with bcrypt  before login
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate the json web token
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// create the model

const User = model("User", UserSchema);

export default User;
