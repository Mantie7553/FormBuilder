import type {InputData} from "./components/inputComponents/InputArea.tsx";
import {createContext, ReactNode, useContext, useState} from "react";

type FormBuilderContextType = {
    inputs: InputData[],
    setInputs: (inputs: InputData[]) => void,
    updateInput: (id: string, updates: Partial<InputData>) => void,
    deleteInput: (id: string) => void,
    editingInputId: string | null,
    setEditingInputId: (id: string | null) => void,
}

const FormBuilderContext = createContext<FormBuilderContextType | null>(null);

export const useFormBuilder = () => {
    const context = useContext(FormBuilderContext);
    if (!context) throw new Error('Form builder must be used within the FormBuilderProvider');
    return context;
}

export const FormBuilderProvider = ({ children } : { children : ReactNode}) => {
    const [inputs, setInputs] = useState<InputData[]>([
        {
            id: '1',
            title: 'Email',
            column: 'form',
            type: 'email',
            placeholder: 'Enter your email',
        },
        {
            id: '2',
            title: 'Password',
            column: 'form',
            type: 'password',
        }
    ]);
    const [editingInputId, setEditingInputId] = useState<string | null>(null);

    const updateInput = (id: string, updates: Partial<InputData> ) => {
        setInputs(old => old.map(input => input.id === id ? {...input, ...updates } : input ));
    }

    const deleteInput = (id: string) => {
        setInputs(old => old.filter(input => input.id !== id));
    }

    return (
        <FormBuilderContext.Provider value={{
            inputs,
            setInputs,
            updateInput,
            deleteInput,
            editingInputId,
            setEditingInputId
        }}>
            {children}
        </FormBuilderContext.Provider>
    )
}