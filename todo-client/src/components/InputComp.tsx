import React, { useRef } from "react";
import "./styles.css";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputComp: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <form
        className="input"
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          type="text"
          placeholder="Enter a Todo"
          className="input__box"
          value={todo}
          ref={inputRef}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="input_submit" title="Add">
          +
        </button>
      </form>
    </div>
  );
};

export default InputComp;
