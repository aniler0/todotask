import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "store";
import { v4 as uuid } from "uuid";

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface Day {
  date: string;
  todos: Task[];
}

const initialState: Day[] =
  JSON.parse(localStorage.getItem("state") || "[]") || [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<Day[]>) => {
      console.log(action.payload);
      state = action.payload;
    },

    /*updateTodo: (state, action: PayloadAction<Task>) => {
      return state.map((todo, key) =>
        todo.tasks.map((task:Task,key)=>task.id === action.payload.id ? {...task, name:task.name } : task )
      );
    },
    setToggle: (state, action: PayloadAction<string>) => {
      return state.map((todo, key) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },*/
  },
});

export default todoSlice.reducer;
export const { setTodo } = todoSlice.actions;

export const addTask =
  (todos: Day[], taskName: string, date: string) =>
  async (dispatch: AppDispatch) => {
    const copiedTodos = [
      ...todos,
      {
        date,
        todos: [],
      },
    ];

    copiedTodos.map((copiedTodo, key) => {
      if (copiedTodo.date === date) {
        const newTask: Task = { id: uuid(), name: taskName, completed: false };
        copiedTodo.todos.push(newTask);
        copiedTodos.push(copiedTodo);
        dispatch(setTodo(copiedTodos));
      } else {
        const newDay: Day = {
          date: date,
          todos: [{ id: uuid(), name: taskName, completed: false }],
        };
        copiedTodos.push(newDay);
        console.log(copiedTodos);
        dispatch(setTodo(copiedTodos));
      }
    });
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
