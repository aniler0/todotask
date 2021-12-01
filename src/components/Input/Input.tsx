import { useEffect, useRef, useState } from "react";
import useDoubleClick from "use-double-click";

import Complete from "assets/Complete";
import { useAppDispatch, useAppSelector } from "store";
import {
  addTask,
  saveState,
  setToggle,
  Todo,
  updateTodo,
} from "store/todoSlice";

import "./style.scss";

type InputType = {
  placeholder?: string;
  calendarDate?: Date;
  setTodos?: any;
  edit?: boolean;
  todo?: Todo | undefined;
};

const Input = ({ placeholder, calendarDate, edit, todo }: InputType) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.todos);
  const [taskName, setTaskName] = useState(todo ? todo.name : "");
  const [isToggle, setIsToggle] = useState<boolean>(
    todo ? todo.completed : false
  );
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>(false);
  const inputRef = useRef(null);

  const dateMonthYear = `${calendarDate?.getDate()}/${calendarDate?.getMonth()}/${calendarDate?.getFullYear()}`;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (edit && todo) {
      const newTodo = { ...todo, name: taskName };
      dispatch(updateTodo(newTodo));
      setIsDoubleClicked(!isDoubleClicked);
    } else {
      dispatch(addTask(taskName, dateMonthYear));
      setTaskName("");
    }
  };

  const toggle = () => {
    if (todo !== undefined) {
      dispatch(setToggle(todo.id));
    }
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    saveState(selector);
  });

  useDoubleClick({
    onDoubleClick: (e) => {
      setIsDoubleClicked(!isDoubleClicked);
    },
    ref: inputRef,
    latency: 250,
  });

  return (
    <div
      ref={inputRef}
      className={!edit ? "input__Container" : `task__Container`}
    >
      <form onSubmit={handleSubmit}>
        {edit ? (
          isDoubleClicked ? (
            <input
              autoFocus={isDoubleClicked}
              value={taskName}
              onChange={(e) => setTaskName(e.currentTarget.value)}
            />
          ) : (
            <h1 className="task">{taskName}</h1>
          )
        ) : (
          <input
            className="input"
            placeholder={placeholder}
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.currentTarget.value)}
            name="task"
            id="task"
          />
        )}
      </form>

      {edit ? (
        todo !== undefined && isToggle ? (
          <div className="checked" onClick={toggle}>
            <Complete />
          </div>
        ) : (
          <div className="notChecked" onClick={toggle}></div>
        )
      ) : null}
    </div>
  );
};

export default Input;
