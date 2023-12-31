import { prisma } from "../index.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to the User Router!",
  });
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.send({
        success: false,
        error: "You must provide a username and password when logging in.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    //Checks username
    if (!user) {
      return res.send({
        success: false,
        error: "User and/or password is invalid.",
      });
    }
    //Checks password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.send({
        success: false,
        error: "User and/or password is invalid.",
      });
    }
    //Creates Token and sends response
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.send({
      success: true,
      token,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.send({
        success: false, 
        error:"User and/or password is invalid."
      })
    }

    //Checks if user already exists
    const checkUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (checkUser) {
      return res.send({
        success: false,
        error: "Username already exists, please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.send({
      success: true,
      token,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

userRouter.get("/token", async (req, res) => {
  try {
    if (!req.user) {
      return res.send({
        success: false,
        error: "Please login",
      });
    }
    res.send({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});
