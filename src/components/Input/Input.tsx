import Complete from "assets/Complete";
import { useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "store";
import { addTask, Todo, updateTask } from "store/todoSlice";
import useDoubleClick from "use-double-click";

import "./style.scss";

type InputType = {
  placeholder?: string;
  calendarDate?: Date;
  setTodos?: any;
  edit?: boolean;
  todo?: Todo | undefined;
};

const Input = ({
  placeholder,
  calendarDate,
  setTodos,
  edit,
  todo,
}: InputType) => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState(todo ? todo.name : "");
  const [isToggle, setisToggle] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>(false);
  const inputRef = useRef(null);

  const dateMonthYear = `${calendarDate?.getDate()}/${calendarDate?.getMonth()}/${calendarDate?.getFullYear()}`;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addTask(taskName, dateMonthYear));
    if (edit) {
      setIsDoubleClicked(!isDoubleClicked);
    } else {
      setTaskName("");
    }
  };

  const toggle = () => {
    if (todo !== undefined) {
      const newTodo = { ...todo, completed: !todo.completed };
      dispatch(updateTask(todos, newTodo));
    }
    setisToggle(!isToggle);
  };

  useDoubleClick({
    onDoubleClick: (e) => {
      setIsDoubleClicked(!isDoubleClicked);
      console.log("double");
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
        todo !== undefined && todo.completed ? (
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
