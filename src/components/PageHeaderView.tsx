import { useTaskStore } from "../states/TaskState";
import { Page } from "../type/page"

export interface PageHeaderViewViewProps {
    page: Page
    index: number
}
export default function PageHeaderView({ index }: PageHeaderViewViewProps) {
    const { deltePage, setCurrentPage, currentPage, addPage } = useTaskStore();


    return (
        <div>
            <div className='flex'>
                <button onClick={() => {
                    setCurrentPage(index)
                }}>
                    <h3 className='text-left px-6 header text-2xl'>Seite: {index + 1}</h3></button>
                {index > 0 ?
                    <button className="delete-or-add-button ml-4" onClick={() => { deltePage(index) }}>-</button>
                    : null}

                {index === currentPage ?
                    <button className="delete-or-add-button_with-more-text ml-4" onClick={() => { addPage() }}>+ Seite</button>
                    : null}
            </div>

        </div>

    )
}
