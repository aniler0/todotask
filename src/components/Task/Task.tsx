import "./style.scss";

type TaskType = {
  children?: string;
};

const Task = ({ children }: TaskType) => {
  return (
    <div className="task__Container">
      <h1 className="task">{children}</h1>

      <input
        className="checkbox"
        type="checkbox"
        name="checkbox"
        id="checkbox"
      />
    </div>
  );
};

export default Task;
