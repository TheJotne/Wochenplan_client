import { useTaskStore } from "../states/TaskState";
import { Page, SchoolClass, SchoolClassTypes } from "../type/page"
import SchoolClassView from "./SchoolClassView";
import TaskInput from "./TaskInput";

export interface PageViewViewProps {
    page?: Page
}
export default function PageView({ page }: PageViewViewProps) {
    const { pages, deltePage, setCurrentPage, currentPage, addPage } = useTaskStore();


    return (
        <div>
            {pages[currentPage].elements.map((page: SchoolClass) => {

                return (<SchoolClassView schoolClass={page}></SchoolClassView>)

            })}
        </div>

    )
}
