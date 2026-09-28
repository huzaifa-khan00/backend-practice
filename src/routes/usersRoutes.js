import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const usersRoutes = express.Router();

usersRoutes.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      message: "Fields can't be empty",
    });
  }

  const findUser = await User.findOne({
    email: email,
  });

  console.log(findUser);

  if (findUser) {
    return res.status(409).json({
      message: "User already exist",
    });
  }

  let encryptedPassword = await bcrypt.hash(password, 10);

  let user = new User({
    username: username,
    email: email,
    password: encryptedPassword,
  });

  let saveduser = await user.save();
  delete saveduser.password;
  console.log(saveduser);

  res.status(201).json({
    message: "user created with this email " + email,
    data: saveduser,
  });
});

usersRoutes.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({
      message: "Got all users!",
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(404).json({
      message: "Users not found!",
      data: null,
      code: 404,
    });
  }
});

usersRoutes.delete("/:id", async (req, res) => {
  let { id: userId } = req.params;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    res.status(404).json({
      message: "User doesn't exist!",
      code: 404,
      user: null,
      error: error,
    });
  }
});

usersRoutes.patch("/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { id } = req.params;

    let comparedPass = await bcrypt.compare(password, encryptedPassword);

    const updatedUser = {};
    if (username) updatedUser.username = username;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;

    if (Object.keys(updatedUser).length === 0) {
      return res.status(400).json({
        message: "Request Body is empty",
      });
    }

    await User.findByIdAndUpdate(
      id,
      { $set: updatedUser }, // update
      {
        // options
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "user updated successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: "user does not exists in database",
    });
  }
});

export default usersRoutes;
