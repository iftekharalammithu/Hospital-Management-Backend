import Appointment from "../Model_DB/Appointment_Schema.js";
import User from "../Model_DB/User_Schema.js";

const post_appointment = async (req, res) => {
  // get schemas data from req.body
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    nid,
    gender,
    appointment_date,
    deperment,
    doctor_firstname,
    doctor_lastname,
    address,
    has_visited,
  } = req.body;

  // check all the value are fullfil or Notification. if not return a response
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !nid ||
    !gender ||
    !appointment_date ||
    !deperment ||
    !doctor_firstname ||
    !doctor_lastname ||
    !address ||
    !has_visited
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  //   find the doctor based on first and last name , role doctor , deperment
  const doctor = await User.findOne({
    firstName: doctor_firstname,
    lastName: doctor_lastname,
    role: "Doctor",
    doctor_deperment: deperment,
  });

  // if doctor not found return a response
  if (!doctor) {
    return res.status(400).json({
      success: false,
      message: "Doctor not found",
    });
  }

  // get the doctor id
  const doctor_id = doctor._id;

  // get the patient id from req.user._id
  const patient_id = req.user._id;

  // make a new appointment object
  const newAppointment = new Appointment({
    firstName,
    lastName,
    email,
    phone,
    dob,
    nid,
    gender,
    appointment_date,
    deperment,
    doctor_name: {
      firstName: doctor_firstname,
      lastName: doctor_lastname,
    },
    doctor_id,
    patient_id,
    address,
  });
  // save the appointment object to database
  newAppointment
    .save()
    .then((appointment) => {
      res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        data: appointment,
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({
        success: false,
        reason: error.message,
        message: "Failed to create appointment",
      });
    });
};

// make a function to get all appointment
const get_all_appointment = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    if (!appointments) {
      return res.status(400).json({
        success: false,
        message: "No appointments found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to get appointments",
    });
  }
};

// make a function to update appointment by patient id
const update_appointment_by_patient_id = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    console.log(appointment_id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide status",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointment_id,
      {
        status,
      },
      {
        new: true,
        // check for schema enum value
        runValidators: true,
      }
    );

    if (!appointment) {
      return res.status(400).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to update appointment",
    });
  }
};

// make a function to delete appointment by patient id
const delete_appointment_by_patient_id = async (req, res) => {
  try {
    const { appointment_id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(appointment_id);

    if (!appointment) {
      return res.status(400).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Failed to delete appointment",
    });
  }
};

export {
  post_appointment,
  get_all_appointment,
  update_appointment_by_patient_id,
  delete_appointment_by_patient_id,
};
