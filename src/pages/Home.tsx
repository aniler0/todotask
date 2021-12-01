import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

import { Input } from "components";

import { useAppSelector, useAppDispatch } from "store";

import "react-datepicker/dist/react-datepicker.css";
import "styles/home.scss";
import { monthNames } from "constants/dates";
import { Todo, loadState, addTodo } from "store/todoSlice";

const Home = () => {
  const todosSelector = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [todos, setTodos] = useState(todosSelector);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [datePickerShow, setDatePickerShow] = useState(false);

  const dateMonthYear = `${calendarDate.getDate()}/${calendarDate.getMonth()}/${calendarDate.getFullYear()}`;

  useEffect(() => {
    if (loadState !== undefined) {
      loadState()?.map((elm: Todo) => dispatch(addTodo(elm)));
    }
  }, []);

  const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function handleOnDragEnd(res: any) {
    if (!res.destination) {
      return;
    }
    const items = reorder(todos, res.source.index, res.destination.index);
    setTodos(items);
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
            <div className="date" onClick={() => setDatePickerShow(true)}>
              <div className="day">{calendarDate.getDate()}</div>
              <div className="month-year">
                <span>{monthNames[calendarDate.getMonth()]}</span>
                <span>{calendarDate.getFullYear()}</span>
              </div>
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
                {loadState()
                  ?.filter(
                    (filteredTodo: Todo) => filteredTodo.date === dateMonthYear
                  )
                  ?.map((todo: Todo, key: number) => (
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
