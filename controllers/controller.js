const pool = require("../config/db_config");

// Create a todo
const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = req.file.path;
    }

    const newTodo = await pool.query(
      "INSERT INTO todo (description, image_url) VALUES($1, $2) RETURNING *",
      [description, imageUrl]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = req.file.path;
    }

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, image_url = $2 WHERE todo_id = $3",
      [description, imageUrl, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all todos with pagination
const getTodos = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 3;
    const offset = (pageNumber - 1) * size;

    const allTodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id OFFSET $1 LIMIT $2",
      [offset, size]
    );

    const totalCount = await pool.query("SELECT COUNT(*) FROM todo");
    const total = parseInt(totalCount.rows[0].count);

    res.json({
      totalPages: Math.ceil(total / size),
      currentPage: pageNumber,
      todos: allTodos.rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a todo by an id
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createTodo, updateTodo, getTodos, getTodoById, deleteTodo };
