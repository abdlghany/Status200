import { ChangeEvent, useState } from "react";

interface BoardProps {
    cards: { title: string; items: string[] }[];
}

function Board({ cards }: BoardProps) {
    const [boardCards, setBoardCards] = useState(cards);

    function removeCard(selectedIndex: number) {
        // const newBoardCards = [];

        // for (let i = 0; i < boardCards.length; i++) {
        //     if (i !== selectedIndex) {
        //         newBoardCards.push(boardCards[i]);
        //     }
        // }

        const newBoardCards = boardCards.filter(function (_, index) {
            return index !== selectedIndex;
        });

        setBoardCards(newBoardCards);
    }

    function removeItem(cardIndex: number, itemIndex: number) {
        const newItems = [];

        for (let i = 0; i < boardCards[cardIndex].items.length; i++) {
            if (i !== itemIndex) {
                newItems.push(boardCards[cardIndex].items[i]);
            }
        }

        const newCards = [];

        for (let i = 0; i < boardCards.length; i++) {
            if (i === cardIndex) {
                newCards.push({
                    title: boardCards[cardIndex].title,
                    items: newItems,
                });
            } else {
                newCards.push(boardCards[i]);
            }
        }

        setBoardCards(newCards);
    }

    const [newCardTitle, setNewCardTitle] = useState("");

    function addCard() {
        if (newCardTitle.trim() != "") {
            const newCards = [
                ...boardCards,
                {
                    title: newCardTitle,
                    items: [],
                },
            ];
            setBoardCards(newCards);
            setNewCardTitle("");
        }
    }

    return (
        <>
            <div className="container text-center py-4">
                <div className="input-group mb-4">
                    <input
                        className="form-control"
                        placeholder="Enter Card Name"
                        value={newCardTitle}
                        onChange={(e) => setNewCardTitle(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={addCard}>
                        Add Card
                    </button>
                </div>
                <div className="row g-4">
                    {boardCards.map((card, cardIndex) => (
                        <>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <span>{card.title}</span>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() =>
                                                removeCard(cardIndex)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group">
                                            {card.items.map(
                                                (item, itemIndex) => (
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <span>{item}</span>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                removeItem(
                                                                    cardIndex,
                                                                    itemIndex
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </button>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <div className="input-group mt-4">
                                            <input
                                                className="form-control"
                                                placeholder="Enter Item Name"
                                            />
                                            <button className="btn btn-success">
                                                Add Item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Board;
