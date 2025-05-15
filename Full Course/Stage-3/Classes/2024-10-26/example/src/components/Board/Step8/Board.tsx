import { useState } from "react";

interface BoardProps {
    cards: { title: string; items: string[] }[];
}

function Board({ cards }: BoardProps) {
    const [boardCards, setBoardCards] = useState(cards);
    const [newCardTitle, setNewCardTitle] = useState("");
    const [newItemTitle, setNewItemTitle] = useState("");

    function removeCard(index: number) {
        const newCards = boardCards.filter(function (_, i) {
            return i !== index;
        });
        setBoardCards(newCards);
    }

    function removeItem(indexCard: number, indexItem: number) {
        const newItems = boardCards[indexCard].items.filter(function (_, i) {
            return i !== indexItem;
        });

        const newCards = boardCards.map(function (card, i) {
            if (i === indexCard) {
                return { ...card, items: newItems };
            }
            return card;
        });

        setBoardCards(newCards);
    }

    function addCard() {
        if (newCardTitle.trim()) {
            setBoardCards([
                ...boardCards,
                { title: newCardTitle, items: ["Test item"] },
            ]);
            setNewCardTitle("");
        }
    }

    function addItem(indexCard: number) {
        if (newItemTitle.trim()) {
            const newItems = boardCards[indexCard].items.filter(function (
                _,
                i
            ) {
                return i !== indexCard;
            });

            newItems.push(newItemTitle);

            const newCards = boardCards.map(function (card, i) {
                if (i === indexCard) {
                    return { ...card, items: newItems };
                }
                return card;
            });

            setBoardCards(newCards);
            setNewItemTitle("");
        }
    }

    return (
        <div className="container">
            <h1 className="text-center mb-4">My Board (step 8)</h1>
            <p className="text-center mb-4">Add "Add Item" functionality.</p>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter card title"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addCard}>
                    Add Card
                </button>
            </div>
            <div className="row g-4">
                {boardCards.map((card, indexCard) => (
                    <div key={indexCard} className="col-lg-6 col-xl-4">
                        <div className="card shadow-sm">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{card.title}</h5>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeCard(indexCard)}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="card-body">
                                <ul className="list-group mb-3">
                                    {card.items.map((item, indexItem) => (
                                        <li
                                            key={indexItem}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            {item}
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    removeItem(
                                                        indexCard,
                                                        indexItem
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter item text"
                                        value={newItemTitle}
                                        onChange={(e) =>
                                            setNewItemTitle(e.target.value)
                                        }
                                    />
                                    <button
                                        className="btn btn-success"
                                        onClick={() => addItem(indexCard)}
                                    >
                                        Add Item
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;
