import { useTaskStore } from "../states/TaskState";
import { Task, TaskCategory, TaskControl, TaskForm, TaskSelectType } from "../type/page";

export interface TaskInputProps {
    task: Task
}
export default function TaskInput({ task }: TaskInputProps) {
    const { saveTask, deleteTasks } = useTaskStore();


    return (<div className="designer-grid">
        <div className="flex flex-row">
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
        <TaskSelect selectType={TaskSelectType.FORM} task={task} selected={task.form} />
        <TaskSelect selectType={TaskSelectType.KATEGORIE} task={task} selected={task.category} />
        <TaskSelect selectType={TaskSelectType.KONTROLLE} task={task} selected={task.control} />
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
        case TaskSelectType.FORM: {
            const keys = Object.keys(TaskForm)

            return getRealSelect(keys, task, selected, saveTask, selectType)
        }
        case TaskSelectType.KATEGORIE: {
            const keys = Object.keys(TaskCategory)

            return getRealSelect(keys, task, selected, saveTask, selectType)
        }
        case TaskSelectType.KONTROLLE: {
            const keys = Object.keys(TaskControl)
            return getRealSelect(keys, task, selected, saveTask, selectType)
        }
    }

}

function getRealSelect(keys: string[], task: Task,
    selected: TaskForm | TaskCategory | TaskControl,
    saveTask: (task: Task) => void, selectType: TaskSelectType) {
    return (
        <select name="ControlSelect" id={"ControlSelect" + task.id} onChange={(event) => {
            let currentTask = Object.assign({}, task)
            switch (selectType) {
                case TaskSelectType.FORM: {

                    currentTask.form = event.currentTarget.value as TaskForm
                }
                case TaskSelectType.KATEGORIE: {
                    currentTask.category = event.currentTarget.value as TaskCategory
                }
                case TaskSelectType.KONTROLLE: {
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