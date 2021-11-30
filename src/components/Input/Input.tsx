import { useState } from "react";

import { useAppDispatch } from "store";
import { addTodo, UpdatedTask, updateTodo } from "store/todoSlice";

import "./style.scss";

type InputType = {
  children?: string;
  placeholder: string;
  edit?: boolean;
  id?: string;
};

const Input = ({ placeholder, edit, id }: InputType) => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState("");
  const updatedTask: UpdatedTask = {
    id: id,
    name: todo,
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (edit) {
      dispatch(updateTodo(updatedTask));
    } else {
      dispatch(addTodo(todo));
    }
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
