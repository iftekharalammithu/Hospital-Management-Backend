import jwt from "jsonwebtoken";
import User from "../Model_DB/User_Schema.js";

const is_Admin_authenticated = async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ message: "Admin Not Authorized!" });
  }

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifyToken) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
  req.user = await User.findById(verifyToken.id);

  if (req.user.role !== "Admin") {
    return res
      .status(401)
      .json({ message: `${req.user.role} is not Authorize to Login` });
  }
  next();
};

export { is_Admin_authenticated };
