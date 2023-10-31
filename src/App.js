import { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo/AddTodo";
import ListTodo from "./components/ListTodo/ListTodo";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([newTodo,...todos ]);
  };

  const deleteTodo = (id) => {
    // Make a DELETE request to remove the todo on the server
    fetch(`http://localhost:8081/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // If the delete request is successful, remove the deleted todo from the list
          const updatedTodos = todos.filter((todo) => todo.uuid !== id);
          setTodos(updatedTodos);
        } else {
          console.error("Error deleting todo:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <AddTodo onAddTodo={addTodo} />
      <ListTodo todos={todos} onDeleteTodo={deleteTodo} setTodos={setTodos}/>
    </div>
  );
}

export default App;
