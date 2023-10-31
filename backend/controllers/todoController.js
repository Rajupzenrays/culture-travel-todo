const Todo = require("../models/Todo");

// Create a new Todo
exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text });
    const savedTodo = await todo.save();
    res.status(201).json({ uuid: savedTodo.uuid, text: savedTodo.text });
  } catch (error) {
    res.status(500).json({ error: "Could not create Todo" });
  }
};


exports.getTodos = async (req, res) => {
    try {
      const todos = await Todo.find({});
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: "Could not fetch Todos" });
    }
  };

  exports.deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Todo.findOneAndDelete({ uuid: id });
  
      if (!result) {
        return res.status(404).json({ error: "Todo not found" });
      }
  
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not delete Todo" });
    }
  };
  