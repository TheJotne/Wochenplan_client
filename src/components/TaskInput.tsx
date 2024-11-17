import { useTaskStore } from "../states/TaskState";
import { Task, TaskCategory, TaskControl, TaskForm, TaskSelectType } from "../type/page";

export interface TaskInputProps {
    task: Task
}
export default function TaskInput({ task }: TaskInputProps) {
    const { saveTask, deleteTasks } = useTaskStore();


    return (<div className="designer-grid px-4 m-auto">
        <div className="flex flex-col">
            <textarea value={task.headline} onChange={(event) => {
                let currentTask = Object.assign({}, task)
                currentTask.headline = event.currentTarget.value
                saveTask(currentTask)
            }} />

            <textarea value={task.subHeadline} onChange={(event) => {
                let currentTask = Object.assign({}, task)
                currentTask.subHeadline = event.currentTarget.value
                saveTask(currentTask)
            }} />
        </div>
        <TaskSelect selectType={TaskSelectType.Form} task={task} selected={task.form} />
        <TaskSelect selectType={TaskSelectType.Kategorie} task={task} selected={task.category} />
        <TaskSelect selectType={TaskSelectType.Kontrolle} task={task} selected={task.control} />
        <button onClick={() => { deleteTasks(task.id) }}>Eine Aufgabe löschen</button>
    </div>)
}

export interface TaskSelectProps {
    selectType: TaskSelectType
    task: Task
    selected: TaskForm | TaskCategory | TaskControl
}
export function TaskSelect({ selectType, task, selected }: TaskSelectProps) {
    const { saveTask } = useTaskStore();
    switch (selectType) {
        case TaskSelectType.Form: {
            const keys = Object.keys(TaskForm)

            return getRealSelect(keys, task, selected, saveTask, selectType)
        }
        case TaskSelectType.Kategorie: {
            const keys = Object.keys(TaskCategory)

            return getRealSelect(keys, task, selected, saveTask, selectType)
        }
        case TaskSelectType.Kontrolle: {
            const keys = Object.keys(TaskControl)
            return getRealSelect(keys, task, selected, saveTask, selectType)
        }
    }

}

function getRealSelect(keys: string[], task: Task,
    selected: TaskForm | TaskCategory | TaskControl,
    saveTask: (task: Task) => void, selectType: TaskSelectType) {
    return (
        <select name="ControlSelect" id={"ControlSelect" + task.id} className="max-h-[2rem]" onChange={(event) => {
            let currentTask = Object.assign({}, task)
            switch (selectType) {
                case TaskSelectType.Form: {

                    currentTask.form = event.currentTarget.value as TaskForm
                }
                case TaskSelectType.Kategorie: {
                    currentTask.category = event.currentTarget.value as TaskCategory
                }
                case TaskSelectType.Kontrolle: {
                    currentTask.control = event.currentTarget.value as TaskControl
                }
            }

            saveTask(currentTask)
        }}>
            {
                keys.map((key, index) => {
                    if (key === selected) {
                        return (

                            <option selected value={key}>{key}</option>
                        )
                    }
                    else {
                        return (
                            <option value={key}>{key}</option>
                        )
                    }

                })}
        </select>
    )
}



/*
 const keys = Object.keys(SchoolClassTypes)

  <select name="classSelect" id={"classSelect" + task.id} onChange={(event) => {
            let currentTask = Object.assign({}, task)
            
                    currentTask.control = event.currentTarget.value as TaskControl
                
            }

            saveTask(currentTask)
        }}>
            {
                keys.map((key, index) => {
                    if (key === selected) {
                        return (

                            <option selected value={key}>{key}</option>
                        )
                    }
                    else {
                        return (
                            <option selected value={key}>{key}</option>
                        )
                    }

                })}
                     </select>
*/