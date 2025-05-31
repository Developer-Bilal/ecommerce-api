import jwt from "jsonwebtoken";

export const authenticated = async (req, res, next) => {
  // if verify is true then allow access else unauthenticated
  try {
    // get token
    const token = req.headers.authorization.split(" ")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Not Authenticated" });
  }
};

// admin authentication
export const isAdminAuthenticated = async (req, res, next) => {
  // if verify is true then allow access else unauthenticated
  try {
    // get token
    const token = req.headers.authorization.split(" ")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded.isAdmin) {
      res.status(400).json({ message: "You do not have admin rights!" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Not Authenticated" });
  }
};
// seller authentication
export const isSellerAuthenticated = async (req, res, next) => {
  // if verify is true then allow access else unauthenticated
  try {
    // get token
    const token = req.headers.authorization.split(" ")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded.isSeller || !decoded.isAdmin) {
      res.status(400).json({ message: "You do not have seller rights!" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Not Authenticated" });
  }
};
