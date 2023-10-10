import { prisma } from "../index.js";
import express from "express";

export const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        category: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return res.send({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

taskRouter.get("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!task) {
      res.send({ success: false, message: "Task not found" });
    }

    res.send({ success: true, task });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

//Work in Progress
taskRouter.post("/", async (req, res) => {
  try {
    const { title, description, categoryId, priority, dueDate, completed } =
      req.body;

    if (!title || !categoryId) {
      return res.send({
        success: false,
        error: "Please include title, and categoryId when creating a task",
      });
    }

    // if (priority !== "LOW" || "MEDIUM" || "HIGH") {
    //   return res.send({
    //     success: false,
    //     error: "Please include a valid Priorty Value!(LOW, MEDIUM, HIGH)",
    //   });
    // }

    if (!req.user) {
      return res.send({
        success: false,
        error: "You must be logged in to create a submission.",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id,
        categoryId,
        priority,
        dueDate,
        completed,
      },
    });

    res.send({ success: true, task });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

taskRouter.put("/:taskId", async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;
    const { title, description, priority, dueDate, completed, categoryId } =
      req.body;

    if (
      !description &&
      !title &&
      priority &&
      completed &&
      dueDate &&
      categoryId
    ) {
      return res.send({
        success: false,
        error: "Please provide an update!",
      });
    }

    if (!req.user) {
      return res.send({
        success: false,
        error: "Please login to delete.",
      });
    }
    //Checks if task Exists
    let task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res.send({ success: false, error: "Task doesn't exist" });
    }

    if (userId !== task.userId) {
      return res.send({
        success: false,
        error: "You must be the owner of this post to delete!",
      });
    }

    task = await prisma.task.update({
      where: { id: taskId },
      data: { title, description, priority, dueDate, categoryId, completed },
    });
    res.send({ success: true, task });
  } catch (error) {
    res.send({ sucess: false, error: error.message });
  }
});

taskRouter.delete("/:taskId", async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;

    if (!req.user) {
      return res.send({
        success: false,
        error: "Please login to delete.",
      });
    }
    //Checks if post Exists
    let task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res.send({ success: false, error: "Task doesn't exist" });
    }

    if (userId !== task.userId) {
      return res.send({
        success: false,
        error: "You must be the owner of this post to delete!",
      });
    }
    task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    res.send({ success: true, task });
  } catch (error) {
    res.send({ error: error.message });
  }
});
