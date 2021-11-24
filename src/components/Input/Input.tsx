import "./style.scss";

type InputType = {
  children?: string;
  placeholder: string;
  checkbox?: boolean;
  todo: string;
  setTodo: (title: string) => void;
};

const Input = ({ placeholder, todo, setTodo }: InputType) => {
  return (
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
  );
};

export default Input;
