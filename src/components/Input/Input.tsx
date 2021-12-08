import { useRef, useState } from "react";
import useDoubleClick from "use-double-click";

import Complete from "assets/Complete";
import { useAppDispatch, useAppSelector } from "store";
import { addTask, Task, updateTask } from "store/todoSlice";

import "./style.scss";

type InputType = {
  placeholder?: string;
  calendarDate?: Date;
  setTodos?: any;
  edit?: boolean;
  task?: Task | undefined;
};

const Input = ({ placeholder, calendarDate, edit, task }: InputType) => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [taskName, setTaskName] = useState(task ? task.name : "");
  const [isToggle, setIsToggle] = useState<boolean>(
    task ? task.completed : false
  );
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>(false);
  const inputRef = useRef(null);

  const dateMonthYear = `${calendarDate?.getDate()}/${calendarDate?.getMonth()}/${calendarDate?.getFullYear()}`;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task !== undefined) {
      const updatedTask: Task = { ...task, name: taskName };
      dispatch(updateTask(todos.days, updatedTask, dateMonthYear));
      setIsDoubleClicked(false);
    } else {
      dispatch(addTask(todos.days, taskName, dateMonthYear));
      setTaskName("");
    }
  };

  const toggle = () => {
    if (task !== undefined) {
      const updatedTask: Task = { ...task, completed: !task.completed };
      dispatch(updateTask(todos.days, updatedTask, dateMonthYear));
    }
    setIsToggle(!isToggle);
  };

  useDoubleClick({
    onDoubleClick: (e) => {
      setIsDoubleClicked(!isDoubleClicked);
    },
    ref: inputRef,
    latency: 250,
  });

  return (
    <div
      data-testid="task-div"
      ref={inputRef}
      className={!edit ? "input__Container" : `task__Container`}
    >
      <form onSubmit={handleSubmit}>
        {edit ? (
          isDoubleClicked ? (
            <input
              data-testid="seeing-task-input"
              required
              autoFocus={isDoubleClicked}
              value={taskName}
              onChange={(e) => setTaskName(e.currentTarget.value)}
            />
          ) : (
            <h1 data-testid="taskname" className="task">
              {taskName}
            </h1>
          )
        ) : (
          <input
            data-testid="adding-task-input"
            required
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
        task !== undefined && isToggle ? (
          <div data-testid="checked" className="checked" onClick={toggle}>
            <Complete />
          </div>
        ) : (
          <div
            data-testid="notChecked"
            className="notChecked"
            onClick={toggle}
          ></div>
        )
      ) : null}
    </div>
  );
};

export default Input;
