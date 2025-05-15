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

    return (
        <div className="container">
            <h1 className="text-center mb-4">My Board (step 5)</h1>
            <p className="text-center mb-4">
                Introduce useState and add remove card logic.
            </p>
            <div className="row g-4">
                {boardCards.map((card, index) => (
                    <div key={index} className="col-lg-6 col-xl-4">
                        <div className="card shadow-sm">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{card.title}</h5>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeCard(index)}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {card.items.map((item, i) => (
                                        <li key={i} className="list-group-item">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;
