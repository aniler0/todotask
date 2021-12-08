import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "components";
import { Provider } from "react-redux";
import { store } from "store";
import userEvent from "@testing-library/user-event";

const AddTaskInput = () => {
  return render(
    <Provider store={store}>
      <Input placeholder="+ New" />
    </Provider>
  );
};

const SeeTaskInput = () => {
  const task = {
    id: "6504a6fc",
    name: "mock",
    completed: false,
  };
  return render(
    <Provider store={store}>
      <Input edit={true} task={task} />
    </Provider>
  );
};

test("empty input field", async () => {
  AddTaskInput();
  //Is the inputfield empty?
  const inputField = screen.getByTestId("adding-task-input");
  expect(inputField).toHaveValue("");
});

test("seeing tasks on task area", async () => {
  SeeTaskInput();
  //Is the name displayed to users?
  const taskname = screen.getByRole("heading");
  expect(taskname).toHaveTextContent(/mock/i);
  //what happens when double click on the task container ?
  const taskContainer = screen.getByTestId("task-div");
  userEvent.dblClick(taskContainer);

  await waitFor(() => {
    expect(screen.getByTestId("seeing-task-input")).toBeInTheDocument();
    //Is the inputfield has a value?
    const inputField = screen.getByTestId("seeing-task-input");
    expect(inputField).toHaveValue("mock");
  });

  //what happens when click to toggle button ?
  const toggleArea = screen.getByTestId("notChecked");
  userEvent.click(toggleArea);
  await waitFor(() => {
    expect(screen.getByTestId("checked")).toBeInTheDocument();
  });
});
