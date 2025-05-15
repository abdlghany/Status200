interface BoardProps {
    cards: { title: string; items: string[] }[];
}

function Board({ cards }: BoardProps) {
    return (
        <div className="container">
            <h1 className="text-center mb-4">My Board (step 4)</h1>
            <p className="text-center mb-4">
                Introduce props to the board component.
                <br />
                Card data is now passed from the parent component.
                <br />
                Mimicking cenario where the data comes from an API or database.
            </p>
            <div className="row g-4">
                {cards.map((card, index) => (
                    <div key={index} className="col-lg-6 col-xl-4">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h5 className="mb-0">{card.title}</h5>
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
