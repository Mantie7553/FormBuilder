import {useFormBuilder} from "../FormBuilderContext.tsx";

/**
 * Sidebar for editing an input element. Allows for changing any part of an input
 * @constructor
 */
export const EditSidebar = () => {

    const { inputs, editingInputId, updateInput} = useFormBuilder();

    const currentInput = inputs.find(input => input.id === editingInputId);

    if (!currentInput) return null;

    return (
        <div>
            <p>{currentInput.id}</p>
            <div>
                <p>Title</p>
                <input
                    className='border rounded border-neutral-500'
                    type='text'
                    value={currentInput.title}
                    onChange={(e) => updateInput(currentInput.id, { title: e.target.value})}
                />
            </div>
            <div>
                <p>Placeholder</p>
                <input
                    type='checkbox'
                    checked={!!currentInput.placeholder}
                    onChange={(e) => updateInput(currentInput.id, { placeholder: e.target.checked ? '' : undefined})}
                />
                {currentInput.placeholder !== undefined && (
                    <input
                        type='text'
                        value={currentInput.placeholder}
                        onChange={(e) => updateInput(currentInput.id, { placeholder: e.target.value})}
                    />
                )}
            </div>
        </div>
    )
}