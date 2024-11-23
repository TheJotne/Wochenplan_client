import { useTaskStore } from "../states/TaskState";
import { SchoolClass, SchoolClassTypes } from "../type/page"
import TaskInput from "./TaskInput";

export interface SchoolClassViewProps {
    schoolClass: SchoolClass
}
export default function SchoolClassView({ schoolClass }: SchoolClassViewProps) {
    const { addTask, deleteClass } = useTaskStore();


    return (
        <div id={"schoolclass" + schoolClass.id} className=" m-6 rounded-md best-shadow  p-4">
            <h2 className="header text-left text-lg">Fach:</h2>
            <div className="flex py-2">
                <SchoolClassViewHeader schoolClass={schoolClass} />
                <button className="delete-or-add-button ml-4" onClick={() => { deleteClass(schoolClass.id) }}>-</button>
            </div>
            <h2 className="header text-left text-lg">Aufgaben:</h2>
            {schoolClass.tasks.map(task => {
                return <TaskInput task={task} />
            })}
            <button className="delete-or-add-button" onClick={() => { addTask(schoolClass.id) }}>+</button>
        </div>
    )
}

function SchoolClassViewHeader({ schoolClass }: SchoolClassViewProps) {
    const { updateClass, } = useTaskStore();
    const keys = Object.keys(SchoolClassTypes)
    return (


        <select name="classSelect" id={"classSelect" + schoolClass.id} onChange={(event) => {
            let classes = Object.assign({}, schoolClass)
            classes.schoolClass = event.currentTarget.value as SchoolClassTypes
            updateClass(classes)
        }}>
            {
                keys.map((key) => {
                    if (key === schoolClass.schoolClass) {
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