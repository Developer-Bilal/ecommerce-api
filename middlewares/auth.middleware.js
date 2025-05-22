import jwt from "jsonwebtoken";

export const authenticated = async (req, res, next) => {
  // if verify is true then allow access else un]authenticated
  try {
    // get token
    const token = req.headers.authorization.split(" ")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Not Authenticated" });
  }
};
