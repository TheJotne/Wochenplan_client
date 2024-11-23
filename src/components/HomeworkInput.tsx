import { useTaskStore } from "../states/TaskState";
import { Homework, HomeworkEnum, SchoolClassTypes, Task, TaskCategory, TaskControl, TaskForm, TaskSelectType } from "../type/page";

export interface HomeworkInputProps {
    homework: Homework
}
export default function HomeworkInput({ homework }: HomeworkInputProps) {
    const { saveHomework, deleteHomework } = useTaskStore();
    return (
        <div className="designer-grid px-4 m-auto my-2">
            <div className="flex flex-col">
                <textarea value={homework.description} onChange={(event) => {
                    let currentTask = Object.assign({}, homework)
                    currentTask.description = event.currentTarget.value
                    saveHomework(currentTask)
                }} />

            </div>
            <select name="HomeworkDateSelect" id={"HomeworkDateSelect" + homework.id} className="max-h-[2rem]" onChange={(event) => {
                let currentTask = Object.assign({}, homework)
                currentTask.date = event.currentTarget.value as HomeworkEnum

                saveHomework(currentTask)
            }}>
                {

                    Object.values(HomeworkEnum).map((key, index) => {
                        if (key === homework.date) {
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
            <select name="HomeworkClassSelect" id={"HomeworkClassSelect" + homework.id} className="max-h-[2rem]" onChange={(event) => {
                let currentTask = Object.assign({}, homework)
                currentTask.class = event.currentTarget.value as SchoolClassTypes

                saveHomework(currentTask)
            }}>
                {

                    Object.values(SchoolClassTypes).map((key, index) => {
                        if (key === homework.class) {
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

            <button className="delete-or-add-button ml-4" onClick={() => { deleteHomework(homework) }}>-</button>
        </div>)
}