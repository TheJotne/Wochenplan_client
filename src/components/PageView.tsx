import { useTaskStore } from "../states/TaskState";
import { Page, SchoolClass } from "../type/page"
import SchoolClassView from "./SchoolClassView";

export interface PageViewViewProps {
    page?: Page
}
export default function PageView({ }: PageViewViewProps) {
    const { pages, currentPage } = useTaskStore();


    return (
        <div>
            {pages[currentPage].elements.map((page: SchoolClass) => {

                return (<SchoolClassView schoolClass={page}></SchoolClassView>)

            })}
        </div>

    )
}
