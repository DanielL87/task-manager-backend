import { prisma } from "../index.js";
import express from "express";

export const categoryRouter = express.Router();

//getallcategories
categoryRouter.get("/", async (req, res) => {
  try {
    if (!req.user) {
      return res.send({
        success: false,
        error: "You must be logged in to fetch categories!",
      });
    }
    const categories = await prisma.category.findMany({
      where: { userId: req.user.id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        tasks: true,
      },
    });
    res.send({
      success: true,
      categories,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

categoryRouter.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.send({
        success: false,
        error: "Please include a name when creating a category",
      });
    }

    if (!req.user) {
      return res.send({
        success: false,
        error: "You must be logged in to create a category.",
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
        userId: req.user.id,
      },
    });
    res.send({
      success: true,
      category,
    });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

categoryRouter.delete("/:categoryId", async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.params;

    if (!req.user) {
      return res.send({
        success: false,
        error: "Please login to delete.",
      });
    }
    //Checks if Subreddit Exists
    let category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.send({ success: false, error: "Category doesn't exist" });
    }

    if (userId !== category.userId) {
      return res.send({
        success: false,
        error: "You must be the owner of this category to delete!",
      });
    }

    category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    res.send({ success: true, category });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
});
