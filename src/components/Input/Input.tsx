import { useState } from "react";

import { useAppDispatch } from "store";
import { addTask, loadState } from "store/todoSlice";

import "./style.scss";

type InputType = {
  placeholder: string;
  calendarDate: Date;
  setTodos: any;
};

const Input = ({ placeholder, calendarDate, setTodos }: InputType) => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState("");
  const dateMonthYear = `${calendarDate.getDate()}/${calendarDate.getMonth()}/${calendarDate.getFullYear()}`;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addTask(todo, dateMonthYear));
    setTodos(loadState());
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
