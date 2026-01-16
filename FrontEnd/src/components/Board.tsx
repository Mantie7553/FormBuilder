import { useEffect } from "react";
import {MyForm} from "./MyForm.tsx";
import {EditSidebar} from "./EditSidebar.tsx";
import {FormBuilderProvider, useFormBuilder} from "../FormBuilderContext.tsx";

const BoardContent = () => {
    const { inputs, setInputs, editingInputId } = useFormBuilder();

    useEffect(() => {
        localStorage.setItem("inputs", JSON.stringify(inputs));
    }, [inputs]);

    useEffect(() => {
        const inputData = localStorage.getItem('inputs');
        if (inputData) {
            setInputs(JSON.parse(inputData));
        }
    }, []);

    return (
        <div className="grid h-full w-full overflow-scroll p-12 grid-cols-3 bg-(--grey) gap-5" >
            <div> Placeholder</div>
            <MyForm title="Place Here" column="form" />
            <EditSidebar />
        </div>
    )

}

/**
 * Container for the pages contents
 * @constructor
 */
export const Board = () => {
    return (
        <FormBuilderProvider>
            <BoardContent />
        </FormBuilderProvider>
    )
}