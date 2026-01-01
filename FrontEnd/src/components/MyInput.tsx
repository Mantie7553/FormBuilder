import {DropIndicator} from "./DropIndicator.tsx";

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

}

export const MyInput = (props: InputInfo) => {

    let dragInfo = {
        title: props.title,
        id: props.id,
        column: props.column,
    }

    return (
        <>
            <DropIndicator beforeId={props.id} column={props.column}/>
            <label
                className={`flex  rounded border border-neutral-700 px-4 py-1 bg-neutral-800 
                ${!props.draggable ? '' : 'cursor-grab active:cursor-grabbing'} 
                `}
                draggable={props.draggable!}
                onDragStart={(e) => props.handleDragStart!(e, dragInfo )}
            >
                {props.title}
                <input
                    className={`py-1 ${!props.draggable ? '' : 'cursor-grab active:cursor-grabbing'} `}
                    type={props.type!}
                    placeholder={props.placeholder!}
                    readOnly={props.readonly!}
                    pattern={props.pattern!}
                    required={props.required!}
                    value={props.value!}

                />
            </label>

        </>
    )
}