import React from "react";
import { Todo } from "../models/model";
import TodoCard from "./TodoCard";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoListComp: React.FC<props> = ({ todos, setTodos }) => {
  return (
    <div className="todos">
      {todos?.map((todo) => (
        <TodoCard todos={todos} todo={todo} key={todo.id} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoListComp;
