import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTrash, FaEdit } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:8080/todo";

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const createOrUpdateTodo = async () => {
    try {
      if (!task) return null;
      if (editId) {
        await axios.put(`${API}/${editId}`, { task });
        setEditId(null);
      } else {
        await axios.post(API, { task });
      }
      setTask("");
      fetchTodos();
    } catch (error) {
      console.error("Error creating/updating: ", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting: ", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await axios.put(`${API}/${id}/toggle`);
      fetchTodos();
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1 className="title">My Todo List</h1>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter task..."
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={createOrUpdateTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className={`todo-item ${todo.completed ? "done" : ""}`}>
            <span>{todo.task}</span>

            <div className="icons">
              <FaCheckCircle
                onClick={() => toggleTodo(todo._id)}
                className={`icon toggle ${todo.completed ? "active" : ""}`}
                title="Toggle Done"
              />

              <FaEdit
                onClick={() => {
                  setTask(todo.task);
                  setEditId(todo._id);
                }}
                style={{ cursor: "pointer", marginRight: "10px", color: "blue" }}
                title="Edit Task"
              />

              <FaTrash
                onClick={() => deleteTodo(todo._id)}
                className="icon delete"
                title="Delete Task"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
