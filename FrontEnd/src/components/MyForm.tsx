import {useState} from "react";
import {InputArea} from "./inputComponents/InputArea.tsx";
import type {InputData} from "./inputComponents/InputArea.tsx"
import {DropIndicator} from "./DropIndicator.tsx";
import {useFormBuilder} from "../FormBuilderContext.tsx";

/**
 * The form a user will be building
 * @param title
 * @param column
 * @param inputs
 * @constructor
 */
export const MyForm = ({ title, column }: {title: string, column: string}) => {
    const {inputs, setInputs} = useFormBuilder();
    const [active, setActive] = useState(false);

    const filteredInputs = inputs.filter((i) => i.column === column);

    const highlightIndicator = (e) => {
        const indicators = getIndicators();
        clearHighlights(indicators);
        const el = getNearestIndicators(e, indicators);
        el.element.style.opacity = "1";
    }

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    }

    const getNearestIndicators = (e, indicators) => {

        const DISTANCE_OFFSET = 50;

        return indicators.reduce( (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);
                if (offset < 0 && offset > closest.offset) {
                    return {offset: offset, element: child};
                }
                else {
                    return closest;
                }
            } ,
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length -1],
            }
            );
    }

    const clearHighlights = (els) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        })
    }

    const handleDragStart = (e, input: InputData) => {
        e.dataTransfer.setData("inputId", input.id)
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
        highlightIndicator(e);
    }

    const handleDragLeave = () => {
        setActive(false);
        clearHighlights(null);
    }

    const handleDragEnd = (e) => {
        setActive(false);
        clearHighlights(null);

        const inputId = e.dataTransfer.getData("inputId");
        const indicators = getIndicators();
        const {element} = getNearestIndicators(e, indicators);

        const before = element.dataset.before || "-1";
        if (before !== inputId) {
            let copy = [...inputs];
            let inputToMove = copy.find((c) => c.id === inputId);
            if (!inputToMove) return;

            inputToMove = {...inputToMove, column};
            copy = copy.filter((c) => c.id !== inputId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(inputToMove);
            }
            else {
                const insertAt = copy.findIndex((el) => el.id === before);
                copy.splice(insertAt, 0, inputToMove);
            }
            setInputs(copy);
        }
    }

    return (
            <div className="min-w-30 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium `}>{title}</h3>
                <span className="rounded text-m text-(--red)">
                    {filteredInputs.length}
                </span>
            </div>
            <form
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={`h-full w-full rounded bg-(--white)`}
            >
                {filteredInputs.map((input) => {
                    return <InputArea
                        key={input.id}
                        input={input}
                        handleDragStart={handleDragStart}
                        draggable={true}
                        setInputs={setInputs}
                    />
                })}
                <DropIndicator column={column}/>
                {/*<button type="submit">Submit</button>*/}
            </form>
        </div>
    )
}