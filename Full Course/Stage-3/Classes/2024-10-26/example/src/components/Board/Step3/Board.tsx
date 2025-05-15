function Board() {
    const cards = [
        {
            title: "Groceries",
            items: ["Milk", "Eggs", "Bread"],
        },
        {
            title: "Chores",
            items: ["Laundry", "Dishes", "Vacuum"],
        },
        {
            title: "Work",
            items: ["Meeting", "Emails"],
        },
    ];

    return (
        <div className="container">
            <h1 className="text-center mb-4">My Board (step 3)</h1>
            <p className="text-center mb-4">
                Convert cards string array to object array with title and items.
                <br />
                Show card items using the Bootstrap list group component.
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
