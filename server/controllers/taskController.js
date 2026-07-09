import Task from "../models/task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await Task.create({
      title,
      description,
      priority,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Task added successfully!",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS (with pagination)
export const getTask = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalTask = await Task.countDocuments({ user: req.user._id });
    const tasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      totalTask,
      currentPage: page,
      totalPages: Math.ceil(totalTask / limit),
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH TASK
export const searchTask = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const task = await Task.find({
      user: req.user._id,
      title: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FILTER TASK
export const filterTask = async (req, res) => {
  try {
    const { priority } = req.query;

    const filter = { user: req.user._id };
    if (priority) {
      filter.priority = priority;
    }

    const task = await Task.find(filter);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};