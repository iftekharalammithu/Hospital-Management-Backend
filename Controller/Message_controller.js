import Message from "../Model_DB/Message_Schema.js";

const send_message = async (req, res) => {
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
        message: "Message sent successfully",
        data: message,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Failed to send message",
      });
    });
};

export default send_message;
