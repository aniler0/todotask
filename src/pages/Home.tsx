import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import { Input } from "components";
import { useAppSelector, useAppDispatch } from "store";
import { monthNames } from "constants/dates";
import { saveState } from "store/todoSlice";

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

  /* function handleOnDragEnd(result: any) {
    if (todosSelector) {
      const items = Array.from(todosSelector);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      saveState(items);
      if (items !== undefined) {
        dispatch(orderedTodo(items));
      }
    }
  }*/

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

        {todosSelector?.days.map(
          (selectedTasks, key) =>
            selectedTasks?.date === dateMonthYear &&
            selectedTasks.todos.map((task, key) => (
              <Input key={key} task={task} edit calendarDate={calendarDate} />
            ))
        )}
        <div className="main__AddTask">
          <Input placeholder="+ New" calendarDate={calendarDate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
