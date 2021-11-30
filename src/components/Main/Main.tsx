import { Input, Task } from "components";
import { useAppSelector } from "store";

import "./style.scss";

const Main = () => {
  const selector = useAppSelector((state) => state.todos);

  return (
    <div className="main">
      <div className="main__Container">
        <div className="main__Date">
          <h1>sad</h1>
          <h1>asdsad</h1>
        </div>
        <div className="main__Todos">
          {selector.map((todo, key) => (
            <Task isCompleted={todo.completed} id={todo.id} key={key}>
              {todo.name}
            </Task>
          ))}
        </div>
        <div className="main__AddTask">
          <Input placeholder="+New Task" />
        </div>
      </div>
    </div>
  );
};

export default Main;
