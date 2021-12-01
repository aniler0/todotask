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

    updateTodo: (state, action: PayloadAction<Todo>) => {
      return state.map((todo, key) =>
        todo.id === action.payload.id
          ? { ...todo, name: action.payload.name }
          : todo
      );
    },
    setToggle: (state, action: PayloadAction<string>) => {
      return state.map((todo, key) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, updateTodo, setToggle } = todoSlice.actions;

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

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore
  }
}
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
