import DatePicker from "react-datepicker";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { Input, Task } from "components";
import { useAppSelector } from "store";

import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { useState } from "react";
import { monthNames } from "constants/months";

const Main = () => {
  const todos = useAppSelector((state) => state.todos);
  const [startDate, setStartDate] = useState(new Date());
  const [datePickerShow, setDatePickerShow] = useState(false);

  const onDragEnd = (res: any) => {
    if (!res.destination) return;
  };
  return (
    <div className="main">
      <div className="main__Container">
        <div className="main__Date">
          {datePickerShow ? (
            <DatePicker
              selected={startDate}
              dateFormat="d MMMM yyyy"
              inline
              onChange={(date: any) => {
                setStartDate(date);
                console.log(startDate);
                setDatePickerShow(false);
              }}
            />
          ) : (
            <div className="date" onClick={() => setDatePickerShow(true)}>
              <div className="day">{startDate.getUTCDate()}</div>
              <div className="month-year">
                <span>{monthNames[startDate.getMonth()]}</span>
                <span>{startDate.getUTCFullYear()}</span>
              </div>
            </div>
          )}
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
          <Input placeholder="+New" />
        </div>
      </div>
    </div>
  );
};

export default Main;
