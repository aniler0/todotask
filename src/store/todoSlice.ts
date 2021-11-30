import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface Todos {
  id: string;
  name: string;
  completed: boolean;
}

const initialState: Todos[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = { id: uuid(), name: action.payload, completed: false };
      state.push(newTodo);
    },
    updateTodo: (state, action: PayloadAction<string>) => {
      return state.map((todo) =>
        todo.id === action.payload.id ? (todo.completed = true) : todo
      );
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, updateTodo } = todoSlice.actions;
