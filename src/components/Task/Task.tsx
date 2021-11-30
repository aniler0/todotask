import { useRef, useState } from "react";
import useDoubleClick from "use-double-click";

import { useAppDispatch, useAppSelector } from "store";
import { Todo, updateTask } from "store/todoSlice";

import Complete from "assets/Complete";

import "./style.scss";

type TaskType = {
  todo: Todo;
};

const Task = ({ todo }: TaskType) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const inputRef = useRef(null);
  const [task, setTask] = useState<string>(todo.name);
  const [isToggle, setisToggle] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>(false);

  useDoubleClick({
    onDoubleClick: (e) => {
      setIsDoubleClicked(true);
    },
    ref: inputRef,
    latency: 250,
  });

  const handleSubmit = (e: any) => {
    const newTodo = { ...todo, name: task, completed: isToggle };
    e.preventDefault();
    if (task) {
      dispatch(updateTask(todos, newTodo));
      setIsDoubleClicked(false);
    }
  };

  const toggle = () => {
    const newTodo = { ...todo, completed: !isToggle };
    dispatch(updateTask(todos, newTodo));
    setisToggle(!isToggle);
  };

  return (
    <div ref={inputRef} className="task__Container">
      {isDoubleClicked ? (
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            placeholder="Edit task"
            value={task}
            onChange={(e) => setTask(e.currentTarget.value)}
          />
        </form>
      ) : (
        <h1 className="task">{task}</h1>
      )}

      {isToggle ? (
        <div className="checked" onClick={toggle}>
          <Complete />
        </div>
      ) : (
        <div className="notChecked" onClick={toggle}></div>
      )}
    </div>
  );
};

export default Task;
