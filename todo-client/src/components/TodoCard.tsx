import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../models/model";
import api from "../services/api";

// react-icons typings can sometimes be incompatible with TSX's expected
// JSX element types in some TypeScript/react versions. Cast to
// React.ElementType to satisfy the JSX typing without changing runtime.
const EditIcon = AiFillEdit as unknown as React.ElementType;
const DeleteIcon = AiFillDelete as unknown as React.ElementType;
const DoneIcon = MdDone as unknown as React.ElementType;

interface TodoCardProps {
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();

    if (!editTodo.trim()) return;
    try {
      const updatedTodo = todos.find((t) => t.id === id);
      if (!updatedTodo) return;

      await api.put(`/todos/${id}`, { ...updatedTodo, title: editTodo.trim() });
    } catch (err) {
      console.error("Error editing todo", err);
    }
    setTodos(todos.map((t) => (t.id === id ? { ...t, title: editTodo.trim() } : t)));
    setEdit(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/todos/${id}`);
    } catch (err) {
      console.log("Error deleting todo", err);
    }

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = async (id: number) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    try {
      if (updatedTodo) {
        await api.put(`/todos/${id}`, {
          ...updatedTodo,
          isCompleted: !updatedTodo.isCompleted,
        });
      }
    } catch (err) {
      console.log("Error marking todo as done", err);
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text edit-text"
          ref={inputRef}
        />
      ) : todo.isCompleted ? (
        <s className="todos__single--text" title={todo.title}>
          {todo.title}
        </s>
      ) : (
        <span className="todos__single--text" title={todo.title}>
          {todo.title}
        </span>
      )}
      <div>
        <span
          className="icon"
          title="Edit"
          aria-label="Edit"
          onClick={() => {
            if (!edit && !todo.isCompleted) {
              setEdit(!edit);
            }
          }}
        >
          <EditIcon />
        </span>
        <span
          className="icon"
          title="Delete"
          aria-label="Delete"
          onClick={() => handleDelete(todo.id)}
        >
          <DeleteIcon />
        </span>
        <span
          className="icon"
          title="Done"
          aria-label="Done"
          onClick={() => handleDone(todo.id)}
        >
          <DoneIcon />
        </span>
      </div>
    </form>
  );
};

export default TodoCard;
