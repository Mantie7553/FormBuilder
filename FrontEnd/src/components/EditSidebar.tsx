import type {InputInfo} from "./inputComponents/InputArea.tsx";

/**
 * Sidebar for editing an input element. Allows for changing any part of an input
 * @param props
 * @constructor
 */
export const EditSidebar = (props: InputInfo) => {
    return (
        <div className={`ml-auto ${props.showEdit!}`}>
            <div>
                <p>Title</p>
                <input className='border rounded border-neutral-500' type='text'/>
            </div>
            <div>
                <p>Placeholder</p>
                <input type='checkbox' checked={!!props.placeholder}/>
                {props.placeholder && (
                    <input type='text'/>
                )}
            </div>
        </div>
    )
}