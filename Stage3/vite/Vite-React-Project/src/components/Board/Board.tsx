import { ChangeEvent, useState } from "react";

interface BoardProps {
    cards: { title: string; items: string[] }[];
}

function Board({ cards }: BoardProps) {
    const [boardCards, setBoardCards] = useState(cards);
    const [newCardTitle, setNewCardTitle] = useState("");
    const [newItemTitles, setNewItemTitles] = useState<string[]>([]);

    function removeCard(selectedIndex: number) {
        const newBoardCards = boardCards.filter((_, index) => index !== selectedIndex);
        setBoardCards(newBoardCards);
    }

    function removeItem(cardIndex: number, itemIndex: number) {
        const newCards = boardCards.map((card, index) => {
            if (index === cardIndex) {
                return {
                    ...card,
                    items: card.items.filter((_, i) => i !== itemIndex),
                };
            }
            return card;
        });

        setBoardCards(newCards);
    }

    function addItem(cardIndex: number) {
        if (newItemTitles[cardIndex].trim() !== "") {
            const newCards = [...boardCards];
            newCards[cardIndex].items.push(newItemTitles[cardIndex]);
            setBoardCards(newCards);

            // Clear the specific item input field for this card
            setNewItemTitles((prevTitles) => {
                const updatedTitles = [...prevTitles];
                updatedTitles[cardIndex] = "";
                return updatedTitles;
            });
        }
    }

    function addCard() {
        if (newCardTitle.trim() !== "") {
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

    function handleItemInputChange(e: ChangeEvent<HTMLInputElement>, cardIndex: number) {
        const value = e.target.value;
        setNewItemTitles((prevTitles) => {
            const updatedTitles = [...prevTitles];
            updatedTitles[cardIndex] = value;
            return updatedTitles;
        });
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
                    <button className="btn btn-primary me-2 ms-2 round rounded-2" onClick={addCard}>
                        Add Card
                    </button>
                </div>
                <div className="row g-4">
                    {boardCards.map((card, cardIndex) => (
                        <div key={cardIndex} className="col-12 col-md-6 col-xl-4">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <span>{card.title}</span>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeCard(cardIndex)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {card.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>{item}</span>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeItem(cardIndex, itemIndex)}
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="input-group mt-4">
                                        <input
                                            className="form-control"
                                            placeholder="Enter Item Name"
                                            value={newItemTitles[cardIndex] || ""}
                                            onChange={(e) => handleItemInputChange(e, cardIndex)}
                                        />
                                        <button
                                            className="btn btn-success me-2 ms-2 round rounded-2"
                                            onClick={() => addItem(cardIndex)}
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
        </>
    );
}

export default Board;
