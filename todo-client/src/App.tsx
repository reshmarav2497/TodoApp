import React, { useEffect, useState } from "react";
import "./App.css";
import InputComp from "./components/InputComp";
import TodoListComp from "./components/TodoListComp";
import { Todo } from "./models/model";
import api from "./services/api";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    // Fetch todos from API
    api
      .get<Array<Todo>>("/todos")
      .then((response) => {
        console.log("Fetched todos:", response);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log("Error fetching todos:", error);
      });
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!todo.trim()) return;

    try {
      const config = { title: todo.trim(), isCompleted: false };
      const response = await api.post<Todo>("/todos", config);
      const newTodo = response.data;

      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      setTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">Todo App</header>
      <InputComp todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoListComp todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
