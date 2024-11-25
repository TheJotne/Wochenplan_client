import { create } from "zustand";
import { Homework, HomeworkEnum, Page, SchoolClass, SchoolClassTypes, Task, TaskCategory, TaskControl, TaskForm } from "../type/page";
import { v4 as uuid } from 'uuid';

interface TaskState {
    pages: Page[]
    taskPerClass: SchoolClass[]
    from: Date
    till: Date
    headline: string | null
    setHeadline: (newHeadline: string) => void
    addPage: () => void
    deltePage: (pageNumber: number) => void
    setCurrentPage: (pageNumber: number) => void
    addTask: (classId: string) => void;
    addClass: () => void;
    updateClass: (element: SchoolClass) => void
    saveTask: (task: Task) => void
    deleteTasks: (taskId: string) => void
    deleteClass: (classId: string) => void
    setPages: (clsses: Page[]) => void
    addHomework: () => void;
    setFrom: (date: Date) => void
    setTill: (date: Date) => void
    saveHomework: (homework: Homework) => void
    deleteHomework: (homework: Homework) => void
    currentPage: number
}

export const WOCHENPLAN = "Wochenplan"
export const HEADLINE = "headline"

export const useTaskStore = create<TaskState>((set, get) => ({
    headline: localStorage.getItem(HEADLINE) != null ? localStorage.getItem(HEADLINE) : "Wochenplan: ",
    from: new Date(),
    till: new Date(),
    currentPage: 0,
    taskPerClass: [],
    pages: [{
        elements: [],
        homeworks: [],
        pageNumber: 0
    }],
    setHeadline: (newHeadline) => {
        set({ headline: newHeadline })
        localStorage.setItem(HEADLINE, newHeadline)
    },
    addPage: () => {
        let pages = Array.from(get().pages)
        pages.push({
            elements: [],
            homeworks: [],
            pageNumber: pages.length
        })
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    deltePage: (pageNumber) => {
        let pages = Array.from(get().pages)

        pages.forEach((_page, index) => {

            if ((index == pageNumber)) {
                pages.splice(index, 1)
            }
        })
        console.log(pages)
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    setCurrentPage: (pageNumber) => {
        set({ currentPage: pageNumber })
    },
    addClass: () => {
        let newClass: SchoolClass = {
            id: uuid(),
            schoolClass: SchoolClassTypes.Ergänzung,
            tasks: []
        }

        let page = Object.assign({}, get().pages[get().currentPage])
        page.elements.push(newClass)
        let pages = Array.from(get().pages)
        pages[get().currentPage] = page
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    updateClass: (element) => {
        let page = Object.assign({}, get().pages[get().currentPage])
        //let schoolclasses = page.elements
        let newClassUpdate = page.elements.map(schoolclass => {
            if (schoolclass.id == element.id) {
                return element
            }
            else {
                return schoolclass
            }
        })

        let pages = Array.from(get().pages)
        page.elements = newClassUpdate
        pages[get().currentPage] = page
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));

    },
    addTask: (classId) => {
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

        let page = Object.assign({}, get().pages[get().currentPage])

        page.elements.forEach(page => {
            if (page.id == classId) {
                page.tasks.push(newTask)
            }
        })
        let pages = Array.from(get().pages)
        pages[get().currentPage] = page
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    deleteClass: (classId: string) => {
        let page = Object.assign({}, get().pages[get().currentPage])

        page.elements.forEach((task, index) => {
            if ((task.id == classId)) {
                page.elements.splice(index, 1)
            }

        })
        let pages = Array.from(get().pages)
        pages[get().currentPage] = page
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    deleteTasks: (taskId: string) => {
        let page = Object.assign({}, get().pages[get().currentPage])

        page.elements.forEach((schoolclass) => {
            schoolclass.tasks.forEach((taskIterator, index2) => {
                if (taskIterator.id == taskId) {
                    schoolclass.tasks.splice(index2, 1)
                }

            })

        })

        let pages = Array.from(get().pages)
        pages[get().currentPage] = page
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    saveTask: (task) => {
        let page = Object.assign({}, get().pages[get().currentPage])
        page.elements.forEach((scoolClassElements) => {
            scoolClassElements.tasks.forEach((taskIterator, index2) => {
                if (taskIterator.id == task.id) {
                    scoolClassElements.tasks[index2] = task
                }
            })
        })
        let pages = Array.from(get().pages)
        pages[get().currentPage] = page
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    setPages: (oldPages) => {
        let pages = Array.from(get().pages)
        pages = oldPages
        set({ pages: pages })

        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    addHomework: () => {
        let newHomework: Homework = {
            id: uuid(),
            class: SchoolClassTypes.Deutsch,
            date: HomeworkEnum.BIS_DIENSTAG,
            description: ""
        }

        let page = Object.assign({}, get().pages[get().currentPage])


        page.homeworks.push(newHomework)
        let pages = Array.from(get().pages)
        pages[get().currentPage] = page
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));
    },
    saveHomework: (homework) => {

        let page = Object.assign({}, get().pages[get().currentPage])

        page.homeworks.forEach((homeworkIterator, index) => {
            if (homeworkIterator.id == homework.id) {
                page.homeworks[index] = homework
            }
        })
        let pages = Array.from(get().pages)
        pages[get().currentPage] = page
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));

    },
    deleteHomework: (homework) => {

        let page = Object.assign({}, get().pages[get().currentPage])

        page.homeworks.forEach((homeworkIterator, index) => {
            if (homeworkIterator.id == homework.id) {
                page.homeworks.splice(index, 1)
            }
        })
        let pages = Array.from(get().pages)
        pages[get().currentPage] = page
        set({ pages: pages })
        localStorage.setItem(WOCHENPLAN, JSON.stringify(pages));

    },
    setFrom(date) {
        set({ from: date })
    },
    setTill(date) {
        set({ till: date })
    },
}))
