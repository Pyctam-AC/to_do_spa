import {create} from "zustand";

import {generateId} from '../helpers'

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

export const useToDoStore = create<ToDoStore>((set, get) =>({
  tasks: [],
  createTask: (title) => {
    const {tasks} = get();
    const newTask = {
      id: generateId(),
      title,
      createdAt: Date.now(),
    }

    set ({
      tasks: [newTask].concat(tasks),
    })

  },
  updateTask: (id, title) => {},
  removeTask: (id) => {},
}));
