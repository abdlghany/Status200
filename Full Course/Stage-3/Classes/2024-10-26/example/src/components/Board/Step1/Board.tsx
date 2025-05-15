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
        <>
            <h1 className="text-center mb-4">My Board (step 1)</h1>
            <p className="text-center mb-4">
                No styling and using array inside component.
            </p>
            {cards.map((card, index) => (
                <div key={index}>
                    <h2>{card.title}</h2>
                </div>
            ))}
        </>
    );
}

export default Board;
