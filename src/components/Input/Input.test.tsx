import { Provider } from "react-redux";
import { store } from "store";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Input } from "components";

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

test("input component which is used to add task", async () => {
  AddTaskInput();
  //Is the inputfield empty?
  const inputField = screen.getByTestId("adding-task-input");
  expect(inputField).toHaveValue("");
});

describe("input component which is used as added task", () => {
  beforeEach(() => {
    SeeTaskInput();
  });

  test("Is the taskname displayed to users?", async () => {
    const taskname = screen.getByRole("heading");
    expect(taskname).toHaveTextContent(/mock/i);
  });

  test("what happens when double click on the task container ?", async () => {
    const taskContainer = screen.getByTestId("task-div");
    userEvent.dblClick(taskContainer);

    await waitFor(() => {
      expect(screen.getByTestId("seeing-task-input")).toBeInTheDocument();
      //Is the inputfield has a value?
      const inputField = screen.getByTestId("seeing-task-input");
      expect(inputField).toHaveValue("mock");
    });
  });

  test("what happens when click to toggle button ?", async () => {
    const toggleArea = screen.getByTestId("notChecked");
    userEvent.click(toggleArea);
    await waitFor(() => {
      expect(screen.getByTestId("checked")).toBeInTheDocument();
    });
  });
});
