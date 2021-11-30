import { Input, Task } from "components";
import { useAppSelector } from "store";

import "./style.scss";

const Main = () => {
  const todos = useAppSelector((state) => state.todos);

  return (
    <div className="main">
      <div className="main__Container">
        <div className="main__Date">
          <h1>sad</h1>
          <h1>asdsad</h1>
        </div>
        <div className="main__Todos">
          {todos.map((todo, key) => (
            <Task todo={todo} key={key} />
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
