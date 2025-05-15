import "bootstrap/dist/css/bootstrap.min.css";
import DogCard from "./components/DogCard";

function App() {
    const dog = {
        name: "Woofy",
        age: 12,
        breed: "German Sheppard",
        image: "https://picsum.photos/id/1025/600/400",
    };

    return (
        <>
            <div className="m-4 w-50">
                <DogCard dog={dog} />
            </div>
        </>
    );
}

export default App;
