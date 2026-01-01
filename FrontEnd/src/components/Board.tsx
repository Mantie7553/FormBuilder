import {useEffect, useState} from "react";
import {MyForm} from "./MyForm.tsx";
import {AddInput} from "./AddInput.tsx";
import {Garbage} from "./Garbage.tsx";

export const Board = () => {

    const [inputs, setInputs] = useState([]);
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        hasChecked && localStorage.setItem("inputs", JSON.stringify(inputs));
    }, [inputs]);

    useEffect(() => {
        const inputData = localStorage.getItem('inputs');
        setInputs(inputData ? JSON.parse(inputData) : []);
        setHasChecked(true);
    }, []);

    return <div className="flex h-full w-full gap-3 overflow-scroll p-12 justify-center">
        <div>
            <MyForm
                title="Place Here"
                column="form"
                headingColor="text-emerald-200"
                inputs={inputs}
                setInputs={setInputs}
            />
            <Garbage setInputs={setInputs}/>
            <AddInput column={'form'} setInputs={setInputs} />
        </div>
    </div>
}