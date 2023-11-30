import { StateCreator, StoreApi, create } from "zustand";

import { generateId } from "../helpers";

interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

const localStorageUpdate =
  <T extends ToDoStore>(config: StateCreator<T>) =>
  (
    set: (
      arg0: T | Partial<T> | ((state: T) => T | Partial<T>),
      arg1: boolean | undefined
    ) => void,
    get: () => T,
    api: StoreApi<T>
  ) =>
    config(
      (nextState, ...arg) => {
        if ("tasks" in nextState) {
          window.localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
        }
        set(nextState, ...arg);
      },
      get,
      api
    );

const getCurrentState = () => {
  try {
    const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
    return currentState
  } catch (err) {
    window.localStorage.setItem("tasks", '[]');
  }
  return [];
}

export const useToDoStore = create<ToDoStore>(
  localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
      const { tasks } = get();
      // console.log(get(), tasks)
      const newTask = {
        id: generateId(),
        title,
        createdAt: Date.now(),
      };

      set({
        tasks: [newTask].concat(tasks),
      });
    },
    updateTask: (id, title) => {
      const { tasks } = get();
      set({
        tasks: tasks.map((task) => ({
          ...task,
          title: task.id === id ? title : task.title,
        })),
      });
    },
    removeTask: (id: string) => {
      const { tasks } = get();
      set({
        tasks: tasks.filter((task) => task.id !== id),
      });
    },
  }))
);
