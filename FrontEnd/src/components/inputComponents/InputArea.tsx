import {DropIndicator} from "../DropIndicator.tsx";
import {InputButtons} from "./InputButtons.tsx";
import {MyInput} from "./MyInput.tsx";

export type InputData = {
    id: string,
    title: string,
    column: string,
    placeholder?: string,
    readonly?: boolean,
    pattern?: string,
    required?: boolean,
    value?: string,
    type?: string,
}

export type InputAreaProps = {
    input: InputData,
    draggable?: boolean,
    handleDragStart?: (e: any, input: InputData) => void,
    onDelete?: (id: string) => void,
    onEdit?: (id: string) => void,
}

/**
 * Container for an input, its indicator, and the associated buttons
 * @param props
 * @constructor
 */
export const InputArea = ( { input, draggable, handleDragStart }: InputAreaProps) => {

    return (
        <div
            className={`rounded border border-(--red) my-1 ${!draggable? '' : 'cursor-grab active:cursor-grabbing'} `}
            draggable={draggable!}
            onDragStart={(e) => handleDragStart?.(e, input )}
        >
            <DropIndicator beforeId={input.id} column={input.column}/>
            <MyInput input={input} draggable={draggable}/>
            <InputButtons inputId={input.id}/>
        </div>
    )
}