import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

import { Input } from "components";
import { useAppSelector, useAppDispatch } from "store";
import { monthNames } from "constants/dates";
import todoSlice, {
  Todo,
  loadState,
  addTodo,
  saveState,
  orderedTodo,
} from "store/todoSlice";

import "react-datepicker/dist/react-datepicker.css";
import "styles/home.scss";

const Home = () => {
  const todosSelector = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [datePickerShow, setDatePickerShow] = useState(false);

  const dateMonthYear = `${calendarDate.getDate()}/${calendarDate.getMonth()}/${calendarDate.getFullYear()}`;

  useEffect(() => {
    saveState(todosSelector);
  });

  function handleOnDragEnd(result: any) {
    if (todosSelector) {
      const items = Array.from(todosSelector);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      saveState(items);
      if (items !== undefined) {
        dispatch(orderedTodo(items));
      }
    }
  }

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
              }}
            />
          ) : (
            <div className="dates">
              <div className="date" onClick={() => setDatePickerShow(true)}>
                <div className="day">{calendarDate.getDate()}</div>
                <div className="month-year">
                  <span>{monthNames[calendarDate.getMonth()]}</span>
                  <span>{calendarDate.getFullYear()}</span>
                </div>
              </div>

              <h1 className="day__Text">
                {calendarDate
                  .toLocaleDateString("en-US", { weekday: "long" })
                  .toLocaleUpperCase()}
              </h1>
            </div>
          )}
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="main__Todos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="main__Todos"
              >
                {todosSelector
                  .filter(
                    (filteredTodo: Todo) => filteredTodo.date === dateMonthYear //if dates are equal lists tasks which date is equal with calendar
                  )
                  .map((todo: Todo, key: number) => (
                    <Draggable key={todo.id} draggableId={todo.id} index={key}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          {...provided.draggableProps.style}
                        >
                          <Input edit todo={todo} key={key} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="main__AddTask">
          <Input placeholder="+ New" calendarDate={calendarDate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
