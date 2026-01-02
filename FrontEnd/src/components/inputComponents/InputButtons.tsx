import {FiSettings, FiTrash} from "react-icons/fi";
import type {InputInfo} from "./InputArea.tsx";

/**
 * Additional buttons shown for removing or editing an input
 * @param props
 * @constructor
 */
export const InputButtons = (props: InputInfo) => {
    return (
        <div className='space-x-2'>
            <button
                type='button'
                onClick={() => props.setInputs!((pv) => pv.filter((i) => i.id !== props.id))}
            >
                {props.setInputs ? <FiTrash/> : null}
            </button>
            <button
                type='button'
                onClick={() => props.setShowEdit!(props.showEdit === 'visible' ? 'invisible' : 'visible')}
            >
                <FiSettings/>
            </button>
        </div>
    )
}