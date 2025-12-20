import {useEffect, useState} from "react";
import {Column} from "./Column.tsx";
import {Garbage} from "./Garbage.tsx";

export type CardData = {
    title: string,
    id: string,
    column: string
}

export const Board = () => {

    const [cards, setCards] = useState([]);
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        hasChecked && localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    useEffect(() => {
        const cardData = localStorage.getItem('cards');
        setCards(cardData ? JSON.parse(cardData) : []);
        setHasChecked(true);
    }, []);

    return <div className="flex h-full w-full gap-3 overflow-scroll p-12">
        <Column
            title="Backlog"
            column="backlog"
            headingColor="text-neutral-500"
            cards={cards}
            setCards={setCards}
        />
        <Column
            title="TODO"
            column="todo"
            headingColor="text-yellow-200"
            cards={cards}
            setCards={setCards}
        />
        <Column
            title="In Progress"
            column="doing"
            headingColor="text-blue-200"
            cards={cards}
            setCards={setCards}
        />
        <Column
            title="Complete"
            column="complete"
            headingColor="text-emerald-200"
            cards={cards}
            setCards={setCards}
        />
        <Garbage setCards={setCards}/>
    </div>
}