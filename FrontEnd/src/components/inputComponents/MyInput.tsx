import type {InputInfo} from "./InputArea.tsx";

export const MyInput = (props: InputInfo) => {
    return (
        <label className='border rounded border-neutral-500'>
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
    )
}