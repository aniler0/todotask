import { useRef, useState } from "react";
import useDoubleClick from "use-double-click";

import { useAppDispatch, useAppSelector } from "store";
import { updateTodo } from "store/todoSlice";

import Complete from "assets/Complete";

import "./style.scss";
import { Input } from "components";

type TaskType = {
  children?: string;
  id: string;
  isCompleted: boolean;
};

const Task = ({ children, id, isCompleted }: TaskType) => {
  const inputRef = useRef(null);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>(false);

  useDoubleClick({
    onDoubleClick: (e) => {
      setIsDoubleClicked(true);
    },
    ref: inputRef,
    latency: 250,
  });

  const dispatch = useAppDispatch();
  const toggle = () => {
    dispatch(updateTodo({ id }));
  };
  return (
    <div ref={inputRef} className="task__Container">
      {isDoubleClicked ? (
        <Input id={id} edit placeholder="Edit task" />
      ) : (
        <h1 className="task">{children}</h1>
      )}

      {isCompleted ? (
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
