import { create } from "zustand";
import { SchoolClass, SchoolClassTypes, Task, TaskCategory, TaskControl, TaskForm } from "../type/page";
import { v4 as uuid } from 'uuid';

interface TaskState {
    taskPerClass: SchoolClass[]
    addTask: (classId: string) => void;
    addClass: () => void;
    updateTasks: (element: SchoolClass) => void
    deleteTasks: (classId: string, taskId: string) => void
    deleteClass: (classId: string) => void
}



export const useTaskStore = create<TaskState>((set, get) => ({
    taskPerClass: [],
    addClass: () => {
        let newClass: SchoolClass = {
            id: uuid(),
            schoolClass: SchoolClassTypes.DEUTSCH,
            tasks: []
        }
        let pages = get().taskPerClass
        pages.push(newClass)
        set({ taskPerClass: pages })
    },
    addTask: (pageId) => {
        let newTask: Task = {
            id: uuid(),
            symbol: "",
            headline: "",
            subHeadline: "",
            category: TaskCategory.PFLICHT,
            form: TaskForm.EINZEL,
            control: TaskControl.ABGEBEN,
            ready: false,
            evaluation: ""
        }
        let pages = Object.assign({}, get().taskPerClass)
        pages.map(page => {
            if (page.id == pageId) {
                page.tasks.push(newTask)
            }
        })
        set({ taskPerClass: pages })
    },
    updateTasks: (element) => {
        let pages = Object.assign({}, get().taskPerClass)
        pages.map(page => {
            if (page.id == element.id) {
                page = element
            }
        })
        set({ taskPerClass: pages })

    },
    deleteClass: (classId: string) => {
        let pages = Object.assign({}, get().taskPerClass)
        /*   pages.map(page => {
              if (page.id == classId) {
                  
              }
          })
          set({ taskPerClass: pages }) */
    },
    deleteTasks: (classId: string, taskId: string) => {
        let pages = Object.assign({}, get().taskPerClass)
        /*  pages.map(page => {
             if (page.id == pageId) {
                 page.tasks.push(newTask)
             }
         })
         set({ taskPerClass: pages }) */
    }
}))