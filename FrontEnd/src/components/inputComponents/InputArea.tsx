import {DropIndicator} from "../DropIndicator.tsx";
import {InputButtons} from "./InputButtons.tsx";
import {MyInput} from "./MyInput.tsx";

export type InputInfo = {
    title: string,
    id: string,
    column: string,
    draggable?: boolean,
    handleDragStart?: Function,
    placeholder?: string,
    readonly?: boolean,
    pattern?: string,
    required?: boolean,
    value?: string,
    type?: string,
    setInputs?: Function,
    setShowEdit?: Function,
    showEdit?: string,

}

/**
 * Container for an input, its indicator, and the associated buttons
 * @param props
 * @constructor
 */
export const InputArea = (props: InputInfo) => {

    let dragInfo = {
        title: props.title,
        id: props.id,
        column: props.column,
    }

    return (
        <div
            className={`rounded border border-neutral-300 my-1 ${!props.draggable? '' : 'cursor-grab active:cursor-grabbing'} `}
            draggable={props.draggable!}
            onDragStart={(e) => props.handleDragStart!(e, dragInfo )}
        >
            <DropIndicator beforeId={props.id} column={props.column}/>
            <MyInput title={props.title} id={props.id} column={props.column} draggable={props.draggable} placeholder={'1'}/>
            <InputButtons column={props.column} id={props.id} title={props.title} setInputs={props.setInputs} setShowEdit={props.setShowEdit} showEdit={props.showEdit}/>
        </div>
    )
}