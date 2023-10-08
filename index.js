import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


// import routers 
import { userRouter } from "./routes/userRouter.js";
import { categoryRouter } from "./routes/categoryRouter.js";
import { taskRouter } from "./routes/taskRouter.js";

const app = express();
export const prisma = new PrismaClient();

//middleware
app.use(cors());
app.use(express.json());

dotenv.config();

// auth middleware fires before every request & checks if there is a token, if token is valid grabs the user info and stores it in req.user

app.use(async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next();
    }

    const token = req.headers.authorization.split(" ")[1];

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return next();
    }

    delete user.password;

    req.user = user;
    next();
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});


app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to the Task Manager backend server!",
  });
});

// router for users
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/tasks", taskRouter);

app.use((req, res) => {
  res.send({ success: false, error: "No route found." });
});

app.use((error, req, res, next) => {
  res.send({ success: false, error: error.message });
});

const port = 3000;

app.listen(port, () => {console.log(`app listening on port ${port}`)});
