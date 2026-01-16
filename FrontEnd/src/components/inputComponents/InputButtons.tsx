import {FiSettings, FiTrash} from "react-icons/fi";
import {useFormBuilder} from "../../FormBuilderContext.tsx";

/**
 * Additional buttons shown for removing or editing an input
 * @param props
 * @constructor
 */
export const InputButtons = ( { inputId }: { inputId: string } ) => {

    const {deleteInput, editingInputId, setEditingInputId } = useFormBuilder();

    return (
        <div className='space-x-2'>
            <button
                className="p-2"
                type='button'
                onClick={ () => deleteInput(inputId) }
            >
                <FiTrash/>
            </button>
            <button
                className="p-2"
                type='button'
                onClick={ () => setEditingInputId(editingInputId === inputId ? null : inputId) }
            >
                <FiSettings/>
            </button>
        </div>
    )
}