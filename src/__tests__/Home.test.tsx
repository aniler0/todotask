import { Provider } from "react-redux";
import { store } from "store";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "pages/Home";
import { monthNames } from "constants/dates";
import { Input } from "components";
import { Day, Task } from "store/todoSlice";

const HomePage = () => {
  return render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
const Tasks = (data: Task[]) => {
  return render(
    <Provider store={store}>
      {data.map((task, key) => (
        <Input key={key} edit task={task} />
      ))}
    </Provider>
  );
};

/* const data= [{},{},{}]

*/

describe("to test dates that showing on screen and changing", () => {
  beforeEach(() => {
    HomePage();
  });
  it("should render correctly", () => {
    expect(<Home />).toBeTruthy();
  });

  it("is day month year are showed on screen first render ?", () => {
    const calendarDate = new Date();
    //day check
    const day = screen.getByText(calendarDate.getDate());
    expect(day).toBeInTheDocument();
    //month check
    const month = screen.getByText(monthNames[calendarDate.getMonth()]);
    expect(month).toBeInTheDocument();
    //year check
    const year = screen.getByText(calendarDate.getFullYear());
    expect(year).toBeInTheDocument();
    //name of day check
    const nameOfDay = screen.getByText(
      calendarDate
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLocaleUpperCase()
    );
    expect(nameOfDay).toBeInTheDocument();
  });

  it("testing calendar and date", async () => {
    const dateMonthYear = screen.getByTestId("date-month-year");

    userEvent.click(dateMonthYear);
    //is calendar seeming on screen when click the area
    const calendar = screen.getByRole("button", {
      name: "Next Month",
    });
    expect(calendar).toBeInTheDocument();
  });
});

it("is the task area seeming properly ?", async () => {
  const tasks: Task[] = [
    { id: "asda21e", name: "mock1", completed: false },
    { id: "sdfs32", name: "mock2", completed: false },
    { id: "sbfvf23", name: "mock3", completed: false },
  ];
  Tasks(tasks);
  const task = screen.getByText(/mock1/i);
  expect(task).toBeInTheDocument();
});
