import Message from "../Model_DB/Message_Schema.js";

const send_message = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //   create a new message object
    const newMessage = new Message({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    //   save the message to the database
    newMessage
      .save()
      .then((message) => {
        res.status(201).json({
          success: true,
          message: "Message sent successfully",
          data: message,
        });
      })
      .catch((error) => {
        console.log(error.message);
        res.status(500).json({
          success: false,
          reason: error.message,
          message: "Failed to send message",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      reason: error.message,
      message: "Server Failed Try Again After Sometime",
    });
  }
};

export default send_message;
