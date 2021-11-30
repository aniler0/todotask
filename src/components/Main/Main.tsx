import { Input, Task } from "components";
import { useAppSelector } from "store";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import "./style.scss";

const Main = () => {
  const todos = useAppSelector((state) => state.todos);
  const onDragEnd = (res: any) => {
    if (!res.destination) return;
  };
  return (
    <div className="main">
      <div className="main__Container">
        <div className="main__Date">
          <h1>sad</h1>
          <h1>asdsad</h1>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="main__Todos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="main__Todos"
              >
                {todos.map((todo, key) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={key}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        {...provided.draggableProps.style}
                      >
                        <Task todo={todo} key={key} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="main__AddTask">
          <Input placeholder="+New Task" />
        </div>
      </div>
    </div>
  );
};

export default Main;
