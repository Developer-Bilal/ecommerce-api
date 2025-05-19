import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET All users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// GET Single user
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// POST User
export const createUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({ message: "Please fill all the details" });
    }

    const userFound = await User.findOne({ email });

    if (userFound) {
      return res
        .status(400)
        .send({ message: `User with email: ${email} already exists!` });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    // send response
    return res.status(200).send({
      message: "User Created Successfully",
      user: {
        email,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// PATCH User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    // update user data and push roadmapId, videoId in the array
    const user = await User.findByIdAndUpdate(id, {
      email,
    });
    return res.status(200).send({ message: "User Updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// DELETE User
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id).select("-password");
    return res.status(200).send({ message: "User Deleted", user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Invalid Credentials!" });
    }

    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res.status(404).send({ message: "Invalid Credentials!" });
    }
    //
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).send({ message: "Login Success!", email, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// change password
export const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    if (req.user.email !== email) {
      return res.status(404).send({ message: `Not Authorized!` });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: `User with email: ${email} does not exist!` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).send({ message: `Invalid Password!` });
    }

    const isEqual = await bcrypt.compare(newPassword, user.password);

    if (isEqual) {
      return res.status(404).send({ message: `Same as old password!` });
    }

    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
    }
    return res
      .status(200)
      .send({ message: "Password Updated Successfully!", user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
