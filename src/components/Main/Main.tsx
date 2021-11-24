import { Input, Task } from "components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { addTodo } from "store/todoSlice";

import "./style.scss";

const Main = () => {
  const selector = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addTodo(todo));
    setTodo("");
  };
  return (
    <div className="main">
      <div className="main__Container">
        <div className="main__Date">
          <h1>sad</h1>
          <h1>asdsad</h1>
        </div>
        <div className="main__Todos">
          {selector.map((todo, key) => (
            <Task key={key}>{todo.name}</Task>
          ))}
        </div>
        <div className="main__AddTask">
          <form onSubmit={handleSubmit}>
            <Input placeholder="+New Task" todo={todo} setTodo={setTodo} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
