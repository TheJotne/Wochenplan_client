import { create } from "zustand";
import { SchoolClass, SchoolClassTypes, Task, TaskCategory, TaskControl, TaskForm } from "../type/page";
import { v4 as uuid } from 'uuid';

interface TaskState {
    taskPerClass: SchoolClass[]
    addTask: (classId: string) => void;
    addClass: () => void;
    saveTask: (task: Task) => void
    updateTasks: (element: SchoolClass) => void
    deleteTasks: (classId: string, taskId: string) => void
    deleteClass: (classId: string) => void
}



export const useTaskStore = create<TaskState>((set, get) => ({
    taskPerClass: [
        {
            schoolClass: SchoolClassTypes.DEUTSCH,

            id: uuid(),
            tasks: [
                {
                    id: uuid(),
                    category: TaskCategory.PFLICHT,
                    control: TaskControl.KEINE,
                    evaluation: "",
                    form: TaskForm.EINZEL,
                    headline: "Das ist ein Test",
                    subHeadline: "darunter",
                    ready: false,
                    symbol: "ein Bild"
                },
                {
                    id: uuid(),
                    category: TaskCategory.HA,
                    control: TaskControl.ABGEBEN,
                    evaluation: "",
                    form: TaskForm.GRUPPE,
                    headline: "Das ist ein Test",
                    subHeadline: "darunter",
                    ready: false,
                    symbol: "ein Bild"
                }
            ]
        },
        {
            schoolClass: SchoolClassTypes.KUNST,

            id: uuid(),
            tasks: [
                {
                    id: uuid(),
                    category: TaskCategory.PFLICHT,
                    control: TaskControl.KEINE,
                    evaluation: "",
                    form: TaskForm.EINZEL,
                    headline: "Das ist ein Test",
                    subHeadline: "darunter",
                    ready: false,
                    symbol: "ein Bild"
                }
            ]
        }
    ],
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
        let pages = Array.from(get().taskPerClass)
        pages.forEach(page => {
            if (page.id == pageId) {
                page.tasks.push(newTask)
            }
        })
        set({ taskPerClass: pages })
    },
    updateTasks: (element) => {
        let pages = Array.from(get().taskPerClass)
        pages.forEach(page => {
            if (page.id == element.id) {
                page = element
            }
        })
        set({ taskPerClass: pages })

    },
    deleteClass: (classId: string) => {
        let pages = Array.from(get().taskPerClass)
        /*   pages.forEach(page => {
              if (page.id == classId) {
                  
              }
          })
          set({ taskPerClass: pages }) */
    },
    deleteTasks: (classId: string, taskId: string) => {
        let pages = Array.from(get().taskPerClass)
        /*  pages.forEach(page => {
             if (page.id == pageId) {
                 page.tasks.push(newTask)
             }
         })
         set({ taskPerClass: pages }) */
    },
    saveTask: (task) => {
        let pages = Array.from(get().taskPerClass)

        pages.forEach((page, index) => {
            page.tasks.forEach((taskIterator, index) => {
                if (taskIterator.id == task.id) {
                    page.tasks[index] = task
                }

            })

        })
        console.log(pages)
        set({ taskPerClass: pages })
    }
}))