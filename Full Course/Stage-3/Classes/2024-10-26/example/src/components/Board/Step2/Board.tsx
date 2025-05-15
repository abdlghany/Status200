function Board() {
    const cards = [
        {
            title: "Groceries",
        },
        {
            title: "Chores",
        },
        {
            title: "Work",
        },
    ];

    return (
        <div className="container">
            <h1 className="text-center mb-4">My Board (step 2)</h1>
            <p className="text-center mb-4">
                Add Bootstrap styling to the board and cards.
            </p>
            <div className="row g-4">
                {cards.map((card, index) => (
                    <div key={index} className="col-lg-6 col-xl-4">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h5 className="mb-0">{card.title}</h5>
                            </div>
                            <div className="card-body">Items</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;
