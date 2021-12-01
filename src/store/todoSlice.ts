import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "store";
import { v4 as uuid } from "uuid";

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
  date: string;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
      saveState(state);
    },

    setTodo: (state, action: PayloadAction<Todo[]>) => {
      state = action.payload;
      saveState(state);
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, setTodo } = todoSlice.actions;

export const addTask =
  (task: string, startDate: string) => async (dispatch: AppDispatch) => {
    const newTodo: Todo = {
      id: uuid(),
      name: task,
      completed: false,
      date: startDate,
    };
    dispatch(addTodo(newTodo));
  };

export const updateTask =
  (todos: Todo[], task: Todo) => async (dispatch: AppDispatch) => {
    const newTodoState = [...todos];

    const newT = newTodoState.map((todoState) =>
      todoState.id === task.id ? task : todoState
    );

    dispatch(setTodo(newT));
  };

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore
  }
}
export function loadState() {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}
