import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

import { loadState, Todo } from "store/todoSlice";
import { Input, Task } from "components";

import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { monthNames } from "constants/dates";

const Main = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [datePickerShow, setDatePickerShow] = useState(false);

  const onDragEnd = (res: any) => {
    if (!res.destination) return;
  };
  const dateMonthYear = `${calendarDate.getDate()}/${calendarDate.getMonth()}/${calendarDate.getFullYear()}`;

  useEffect(() => {
    setTodos(loadState());
  }, []);

  return (
    <div className="main">
      <div className="main__Container">
        <div className="main__Date">
          {datePickerShow ? (
            <DatePicker
              selected={calendarDate}
              dateFormat="d MMMM yyyy"
              inline
              onChange={(date: Date) => {
                setCalendarDate(date);
                setDatePickerShow(false);
                setTodos(loadState());
              }}
            />
          ) : (
            <div className="date" onClick={() => setDatePickerShow(true)}>
              <div className="day">{calendarDate.getDate()}</div>
              <div className="month-year">
                <span>{monthNames[calendarDate.getMonth()]}</span>
                <span>{calendarDate.getFullYear()}</span>
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
                {todos
                  ?.filter(
                    (filteredTodo) => filteredTodo.date === dateMonthYear
                  )
                  .map((todo, key) => (
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
          <Input
            placeholder="+ New"
            calendarDate={calendarDate}
            setTodos={setTodos}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
