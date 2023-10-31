import React, { useState } from "react";
import './AddTodo.css';

const AddTodo = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState("");

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      fetch("http://localhost:8081/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: todoText }),
      })
        .then(response => response.json())
        .then(data => {
          onAddTodo(data); // Update the list of todos in App component
        })
        .catch(error => {
          console.error("Error adding todo:", error);
        });
  
      setTodoText("");
    };
  };
  

  return (
    <div className="add_todo">
      <input
        type="text"
        value={todoText}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddTodo;
