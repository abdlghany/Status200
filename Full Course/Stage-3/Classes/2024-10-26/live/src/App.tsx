import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/Board/Board";

function App() {
    const cards = [
        {
            title: "Card 1",
            items: ["Item 1.1", "Item 1.2"],
        },
        {
            title: "Card 2",
            items: ["Item 2.1", "Item 2.2"],
        },
        {
            title: "Card 3",
            items: ["Item 3.1", "Item 3.2"],
        },
    ];

    return (
        <>
            <Board cards={cards} />
        </>
    );
}

export default App;
