import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "store";
import { v4 as uuid } from "uuid";

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },

    setTodo: (state, action: PayloadAction<Todo[]>) => {
      state = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, setTodo } = todoSlice.actions;

export const addTask = (task: string) => async (dispatch: AppDispatch) => {
  const newTodo: Todo = { id: uuid(), name: task, completed: false };
  dispatch(addTodo(newTodo));
};

export const updateTask =
  (todos: Todo[], task: Todo) => async (dispatch: AppDispatch) => {
    const newTodoState = [...todos];
    const newTodo = newTodoState.map((todo) =>
      todo.id === task.id ? { ...todo, name: task.name } : todo
    );

    dispatch(setTodo(newTodo));
  };
