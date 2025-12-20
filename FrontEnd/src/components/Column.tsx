import {useState} from "react";
import type {CardData} from "./Board.tsx";
import {Card} from "./Card.tsx";
import {DropIndicator} from "./DropIndicator.tsx";
import {AddCard} from "./AddCard.tsx";

export const Column = ({title, headingColor, column, cards, setCards}) => {
    const [active, setActive] = useState(false);

    const filteredCards: CardData[] = cards.filter((c) => c.column === column);

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

    const handleDragStart = (e, card: CardData) => {
        e.dataTransfer.setData("cardId", card.id)
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

        const cardId = e.dataTransfer.getData("cardId");
        const indicators = getIndicators();
        const {element} = getNearestIndicators(e, indicators);

        const before = element.dataset.before || "-1";
        if (before !== cardId) {
            let copy = [...cards];
            let cardToMove = copy.find((c) => c.id === cardId);
            if (!cardToMove) return;

            cardToMove = {...cardToMove, column};
            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToMove);
            }
            else {
                const insertAt = copy.findIndex((el) => el.id === before);
                copy.splice(insertAt, 0, cardToMove);
            }
            setCards(copy);
        }
    }

    return (
            <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className="rounded text-sm text-neutral-400">
                    {filteredCards.length}
                </span>
            </div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}
            >
                {filteredCards.map((c) => {
                    return <Card key={c.id} {...c} handleDragStart={handleDragStart}/>
                })}
                <DropIndicator column={column}/>
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    )
}