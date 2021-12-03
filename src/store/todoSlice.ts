import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "store";
import { v4 as uuid } from "uuid";

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface Day {
  date: string | undefined;
  todos: Task[];
}
export interface Root {
  days: Day[];
}

const initialState: Root = {
  days: [
    {
      date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      todos: [],
    },
  ],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<Day[]>) => {
      state.days = action.payload;
    },
    updateTodo: (state, action: PayloadAction<Day[]>) => {
      state.days = action.payload;
    },
    setTodoOrder: (state, action: PayloadAction<Day[]>) => {
      state.days = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { setTodo, updateTodo, setTodoOrder } = todoSlice.actions;

export const addTask =
  (todos: Day[], taskName: string, date: string) =>
  async (dispatch: AppDispatch) => {
    const copiedTodos = [...todos];
    const isDateExist = copiedTodos.find(
      (copiedTodo) => copiedTodo.date === date
    );
    if (isDateExist) {
      copiedTodos.forEach((copiedTodo, index) => {
        if (copiedTodo.date === date) {
          const newDay = { ...copiedTodo };

          newDay.todos = [
            ...newDay.todos,
            { id: uuid(), name: taskName, completed: false },
          ];
          copiedTodos[index] = newDay;
        }
      });

      dispatch(setTodo(copiedTodos));
    } else {
      const newDay: Day = {
        date: date,
        todos: [{ id: uuid(), name: taskName, completed: false }],
      };
      copiedTodos.push(newDay);
      dispatch(setTodo(copiedTodos));
    }
  };

export const updateTask =
  (todos: Day[], updatedTask: Task, date: string) =>
  async (dispatch: AppDispatch) => {
    const copiedTodos = [...todos];
    //[{date,todos:[{id}]},{date,todos:[{id},{id}]}]
    copiedTodos.forEach((copiedTodo, index) => {
      const newDay = { ...copiedTodo };
      if (copiedTodo.date === date) {
        copiedTodo.todos.forEach((todo, index) => {
          if (todo.id === updatedTask.id) {
            const newCopiedTasks = [...copiedTodo.todos];
            newCopiedTasks[index] = updatedTask;
            newDay.todos = newCopiedTasks;
          }
        });
        copiedTodos[index] = newDay;
      }
    });

    dispatch(updateTodo(copiedTodos));
  };
export const orderTodo =
  (todos: Day[], orderedTasks: Task[], date: string) =>
  async (dispatch: AppDispatch) => {
    const copiedTodos = [...todos];

    copiedTodos.forEach((copiedTodo, index) => {
      const newDay = { ...copiedTodo };
      if (copiedTodo.date === date) {
        newDay.todos = orderedTasks;

        copiedTodos[index] = newDay;
      }
    });

    dispatch(setTodoOrder(copiedTodos));
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
