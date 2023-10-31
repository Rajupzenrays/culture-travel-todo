import React, { useState, useEffect } from 'react';
import './ListTodo.css'
const ListTodo = ({todos,setTodos }) => {

  useEffect(() => {
    fetch("http://localhost:8081/todos/getTodos")
      .then((response) => response.json())
      .then((data) => {
        data = data.map((todo, index) => ({ ...todo, order: index }));
        data.sort((a, b) => b.order - a.order);
        setTodos(data); 
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8081/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
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
    <div className='todo_list'>
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <ol className='orderlist'>
          {todos.map((todo) => (
            <li key={todo.uuid}  className="list-item">
              {todo.text}
              <button onClick={() => handleDeleteClick(todo.uuid)}>Delete</button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default ListTodo;
