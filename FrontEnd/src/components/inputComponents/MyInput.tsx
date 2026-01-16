import type {InputData} from "./InputArea.tsx";

export const MyInput = ({input, draggable }: { input: InputData, draggable?: boolean }) => {
    return (
        <label className='border rounded border-neutral-500'>
            {input.title}
            <input
                className={`py-1 ${draggable ? '' : 'cursor-grab active:cursor-grabbing'} `}
                type={input.type!}
                placeholder={input.placeholder!}
                readOnly={input.readonly!}
                pattern={input.pattern!}
                required={input.required!}
                value={input.value!}
            />
        </label>
    )
}