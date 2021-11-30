import { useState } from "react";

import { useAppDispatch } from "store";
import { addTask } from "store/todoSlice";

import "./style.scss";

type InputType = {
  placeholder: string;
};

const Input = ({ placeholder }: InputType) => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addTask(todo));
    setTodo("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input__Container">
        <input
          className="input"
          placeholder={placeholder}
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.currentTarget.value)}
          name="task"
          id="task"
        />
      </div>
    </form>
  );
};

export default Input;
