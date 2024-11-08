import { useTaskStore } from "../states/TaskState";
import { Task, TaskCategory, TaskControl, TaskForm, TaskSelectType } from "../type/page";

export interface TaskInputProps {
    task: Task
}
export default function TaskInput({ task }: TaskInputProps) {
    const { addTask, updateTasks } = useTaskStore();
    return (<div className="flex">
        <div className="flex flex-row">
            <input type="text" value={task.headline} />

            <input type="text" value={task.subHeadline} />
        </div>
        <TaskSelect selectType={TaskSelectType.FORM} taskId={task.id} selected={task.form} />
        <TaskSelect selectType={TaskSelectType.KATEGORIE} taskId={task.id} selected={task.category} />
        <TaskSelect selectType={TaskSelectType.KONTROLLE} taskId={task.id} selected={task.control} />
    </div>)
}

export interface TaskSelectProps {
    selectType: TaskSelectType
    taskId: string
    selected: TaskForm | TaskCategory | TaskControl
}
export function TaskSelect({ selectType, taskId, selected }: TaskSelectProps) {

    switch (selectType) {
        case TaskSelectType.FORM: {
            const keys = Object.keys(TaskForm)
            return (
                <select name="FormSelect" id={"FormSelect" + taskId}>
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
            )
        }
        case TaskSelectType.KATEGORIE: {
            const keys = Object.keys(TaskCategory)
            return (
                <select name="CategorySelect" id={"CategorySelect" + taskId}>
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
            )
        }
        case TaskSelectType.KONTROLLE: {
            const keys = Object.keys(TaskControl)
            return (
                <select name="ControlSelect" id={"ControlSelect" + taskId}>
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
            )
        }
    }

}

/*
category: TaskCategory.PFLICHT,
          control: TaskControl.KEINE,
          evaluation: "",
          form: TaskForm.EINZEL,
          headline: "Das ist ein Test",
          subHeadline: "darunter",
          ready: false,
          symbol: "ein Bild"
*/