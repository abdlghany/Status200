import { useState } from "react";

interface BoardProps {
    cards: { title: string; items: string[] }[];
}

function Board({ cards }: BoardProps) {
    const [boardCards, setBoardCards] = useState(cards);

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

    return (
        <div className="container">
            <h1 className="text-center mb-4">My Board (step 6)</h1>
            <p className="text-center mb-4">
                Add remove card item logic.
                <br />
                The logic for removing a card item is a bit more complex than
                removing a card.
                <br />
                We need to find the card by index and then remove the item from
                the items array.
            </p>
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
                                <ul className="list-group">
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-5">
                <code className="border p-2 bg-secondary text-light">
                    <pre>
                        {`
# ...
  is called the spread operator

# ...card 
  copies the properties of the card object

# { ...card, items: [] }
  copies the card object and replaces the 
  items property with an empty array`}
                    </pre>
                </code>
            </div>
        </div>
    );
}

export default Board;
