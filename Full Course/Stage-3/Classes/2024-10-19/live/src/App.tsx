import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "./components/List/ListGroup";

function App() {
    const items = [
        {
            label: "Name",
            value: "Karel",
            active: false,
        },
        {
            label: "Name",
            value: "Ferry",
            active: true,
        },
        {
            label: "Name",
            value: "Sebastian",
            active: true,
        },
        {
            label: "Name",
            value: "Basil",
            active: false,
        },
        {
            label: "Name",
            value: "Vee",
            active: true,
        },
    ];

    return (
        <>
            <div className="m-4">
                <div className="w-25">
                    <ListGroup name="My List" items={items} />
                </div>
            </div>
        </>
    );
}

export default App;
