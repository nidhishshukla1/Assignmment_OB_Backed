const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createTodo, updateTodo, getTodos, getTodoById, deleteTodo } = require("../controllers/controller");
const { validateTodo } = require('../middlewares/middleware');

const upload = multer({ dest: "./uploads/" });

// Create a todo with optional image upload
router.post("/", upload.single("image"), validateTodo, createTodo);

// Update a todo with optional image upload
router.put("/:id", upload.single("image"), updateTodo);

// Get all todos with pagination
router.get("/", getTodos);

// Get a todo
router.get("/:id", getTodoById);

// Delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
