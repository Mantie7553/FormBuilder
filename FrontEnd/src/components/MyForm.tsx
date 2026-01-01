import {useState} from "react";
import type {InputInfo} from "./MyInput.tsx"
import {MyInput} from "./MyInput.tsx";
import {DropIndicator} from "./DropIndicator.tsx";

export const MyForm = ({title, headingColor, column, inputs, setInputs}) => {
    const [active, setActive] = useState(false);

    const filteredInputs: InputInfo[] = inputs.filter((c) => c.column === column);

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

    const handleDragStart = (e, input: InputInfo) => {
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
            <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className="rounded text-sm text-neutral-400">
                    {filteredInputs.length}
                </span>
            </div>
            <form
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}
            >
                <MyInput
                    id='Custom'
                    column='complete'
                    title='Testing'
                    placeholder={'###-###-####'}
                    readonly={false}
                    pattern={'/^\d{3}-\d{3}-\d{4}$/'}
                    required={true}
                    draggable={false}
                />
                {filteredInputs.map((c) => {
                    return <MyInput key={c.id} {...c} handleDragStart={handleDragStart} draggable={true}/>
                })}
                <DropIndicator column={column}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}