import { useTaskStore } from "../states/TaskState";
import { Homework } from "../type/page";
import HomeworkInput from "./HomeworkInput";

export interface HomeworkViewProps {
}
export default function HomeworkView() {
    const { pages, currentPage, addHomework } = useTaskStore();


    return (
        <div className="m-6 flex flex-col rounded-md best-shadow  p-4">
            <h2 className="header text-left text-lg">Hausaufgaben:</h2>
            {pages[currentPage].homeworks.map((homework: Homework) => {

                return (
                    <div>
                        <HomeworkInput homework={homework}></HomeworkInput>
                    </div>
                )

            })}
            <button className='delete-or-add-button_with-more-text w-fit ' onClick={() => { addHomework() }}>+ Hausaufgabe</button>
        </div>

    )
}