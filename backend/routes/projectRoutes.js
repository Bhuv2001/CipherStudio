import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Save project
router.post("/save", async (req, res) => {
  try {
    const { name, files } = req.body;
    const project = new Project({ name, files });
    await project.save();
    res.status(201).json({ message: "Project saved!", project });
  } catch (err) {
    res.status(500).json({ error: "Failed to save project" });
  }
});

// Load all projects
router.get("/load", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to load projects" });
  }
});

export default router;
