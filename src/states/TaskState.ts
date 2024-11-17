import { create } from "zustand";
import { SchoolClass, SchoolClassTypes, Task, TaskCategory, TaskControl, TaskForm } from "../type/page";
import { v4 as uuid } from 'uuid';

interface TaskState {
    taskPerClass: SchoolClass[]
    addTask: (classId: string) => void;
    addClass: () => void;
    updateClass: (element: SchoolClass) => void
    saveTask: (task: Task) => void
    updateTasks: (element: SchoolClass) => void
    deleteTasks: (taskId: string) => void
    deleteClass: (classId: string) => void
    setClasses: (clsses: SchoolClass[]) => void
}

export const WOCHENPLAN = "Wochenplan"

export const useTaskStore = create<TaskState>((set, get) => ({
    taskPerClass: [

    ],
    addClass: () => {
        let newClass: SchoolClass = {
            id: uuid(),
            schoolClass: SchoolClassTypes.Ergänzung,
            tasks: []
        }
        let pages = get().taskPerClass
        pages.push(newClass)
        set({ taskPerClass: pages })
        console.log(pages)
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    updateClass: (element) => {
        let pages = Array.from(get().taskPerClass)
        let newPages = pages.map(page => {
            if (page.id == element.id) {
                return element
            }
            else {
                return page
            }
        })

        set({ taskPerClass: newPages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(newPages));

    },
    addTask: (pageId) => {
        let newTask: Task = {
            id: uuid(),
            symbol: "",
            headline: "",
            subHeadline: "",
            category: TaskCategory.Pflicht,
            form: TaskForm.Einzeln,
            control: TaskControl.Abgeben,
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
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    updateTasks: (element) => {
        let pages = Array.from(get().taskPerClass)
        pages.forEach(page => {
            if (page.id == element.id) {
                page = element
            }
        })
        set({ taskPerClass: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));

    },
    deleteClass: (classId: string) => {
        let pages = Array.from(get().taskPerClass)
        pages.forEach((page, index) => {
            if ((page.id == classId)) {
                pages.splice(index, 1)
            }

        })


        set({ taskPerClass: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    deleteTasks: (taskId: string) => {
        let pages = Array.from(get().taskPerClass)
        pages.forEach((page, index1) => {
            page.tasks.forEach((taskIterator, index2) => {
                if (taskIterator.id == taskId) {
                    page.tasks.splice(index2, 1)
                }

            })

        })

        set({ taskPerClass: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
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

        set({ taskPerClass: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    setClasses: (classes) => {
        console.log(classes)
        set({ taskPerClass: classes })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(classes));
    }
}))
