const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Create a new Todo
router.post("/add", todoController.createTodo);
router.get("/getTodos", todoController.getTodos);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;