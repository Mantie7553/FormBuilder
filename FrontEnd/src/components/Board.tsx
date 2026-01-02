import {useEffect, useState} from "react";
import {MyForm} from "./MyForm.tsx";
import {AddInput} from "./old/AddInput.tsx";
import {Garbage} from "./old/Garbage.tsx";
import type {InputInfo} from "./inputComponents/InputArea.tsx";
import {EditSidebar} from "./EditSidebar.tsx";

/**
 * Container for the pages contents
 * @constructor
 */
export const Board = () => {

    const [inputs, setInputs] = useState([] as InputInfo[]);
    const [hasChecked, setHasChecked] = useState(false);
    const [showEdit, setShowEdit] = useState('invisible');

    useEffect(() => {
        hasChecked && localStorage.setItem("inputs", JSON.stringify(inputs));
    }, [inputs]);

    useEffect(() => {
        const inputData = localStorage.getItem('inputs');
        setInputs(inputData ? JSON.parse(inputData) : []);
        setHasChecked(true);
    }, []);

    return <div className="flex h-full w-full overflow-scroll p-12 justify-center">
        <div className='ml-auto'>
            <MyForm
                title="Place Here"
                column="form"
                inputs={inputs}
                setInputs={setInputs}
                setShowEdit={setShowEdit}
                showEdit={showEdit}
            />
            <Garbage setInputs={setInputs}/>
            <AddInput column={'form'} setInputs={setInputs} />
        </div>
        <EditSidebar id={'1'} column={'form'} title={'A'} showEdit={showEdit}/>
    </div>
}