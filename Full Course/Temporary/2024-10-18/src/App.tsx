import "bootstrap/dist/css/bootstrap.min.css";
import GreetA from "./components/GreetingCard/GreetA";
import GreetB from "./components/GreetingCard/GreetB";
import GreetC from "./components/GreetingCard/GreetC";
import MoodA from "./components/MoodSelector/MoodA";
import MoodB from "./components/MoodSelector/MoodB";
import MoodC from "./components/MoodSelector/MoodC";
import MoodD from "./components/MoodSelector/MoodD";
import MoodE from "./components/MoodSelector/MoodE";
import MoodF from "./components/MoodSelector/MoodF";
import MoodG from "./components/MoodSelector/MoodG";
import MoodH from "./components/MoodSelector/MoodH";
import WelcomeA from "./components/WelcomeBanner/WelcomeA";
import WelcomeB from "./components/WelcomeBanner/WelcomeB";
import WelcomeC from "./components/WelcomeBanner/WelcomeC";
import WelcomeD from "./components/WelcomeBanner/WelcomeD";
import WelcomeE from "./components/WelcomeBanner/WelcomeE";
import WelcomeF from "./components/WelcomeBanner/WelcomeF";

function App() {
    return (
        <>
            <div className="m-3 p-3 border border-2 border-dark">
                <h1 className="text-primary">Greeting Cards</h1>
                <hr />
                <GreetA />
                <hr />
                <GreetB />
                <hr />
                <GreetC name="Ferry" message="Hope you have a great day!" />
            </div>

            <div className="m-3 p-3 border border-2 border-dark">
                <h1 className="text-primary">Welcome Banner</h1>
                <hr />
                <WelcomeA />
                <hr />
                <WelcomeB />
                <hr />
                <WelcomeC name="Ferry" role="teacher" />
                <hr />
                <WelcomeC name="Anonymous" role="student" />
                <hr />
                <WelcomeD
                    people={["John", "Jane", "Doe"]}
                    roles={["Student", "Teacher", "Parent"]}
                />
                <hr />
                <WelcomeE
                    people={[
                        { name: "Ferry", role: "Dutch" },
                        { name: "Sebastian", role: "Brazilian" },
                        { name: "Karel", role: "Czech" },
                    ]}
                />
                <hr />
                <WelcomeF
                    people={[
                        { name: "Ferry", role: "Dutch" },
                        { name: "Sebastian", role: "Brazilian" },
                        { name: "Karel", role: "Czech" },
                    ]}
                />
            </div>

            <div className="m-3 p-3 border border-2 border-dark">
                <h1 className="text-primary">Mood Selector</h1>
                <hr />
                <MoodA />
                <hr />
                <MoodB />
                <hr />
                <MoodC />
                <hr />
                <MoodD />
                <hr />
                <MoodE
                    title="Food"
                    moods={["Pizza", "Burger", "Fries", "Salad"]}
                    emojis={["🍕", "🍔", "🍟", "🥗"]}
                />
                <hr />
                <MoodF
                    title="Moods"
                    moods={[
                        {
                            name: "Warm",
                            emoji: "😊",
                        },
                        {
                            name: "Cold",
                            emoji: "🥶",
                        },
                        {
                            name: "Angry",
                            emoji: "😡",
                        },
                        {
                            name: "Sick",
                            emoji: "🤢",
                        },
                        {
                            name: "Happy",
                            emoji: "😊",
                        },
                        {
                            name: "Sad",
                            emoji: "😢",
                        },
                        {
                            name: "Excited",
                            emoji: "🤩",
                        },
                    ]}
                />
                <hr />
                <MoodG
                    moods={[
                        {
                            name: "Warm",
                            emoji: "😊",
                        },
                        {
                            name: "Cold",
                            emoji: "🥶",
                        },
                        {
                            name: "Angry",
                            emoji: "😡",
                        },
                        {
                            name: "Sick",
                            emoji: "🤢",
                        },
                        {
                            name: "Happy",
                            emoji: "😊",
                        },
                        {
                            name: "Sad",
                            emoji: "😢",
                        },
                        {
                            name: "Excited",
                            emoji: "🤩",
                        },
                    ]}
                />
                <hr />
                <MoodH
                    title="Transportation"
                    moods={[
                        {
                            name: "Car",
                            emoji: "🚗",
                        },
                        {
                            name: "Bus",
                            emoji: "🚌",
                        },
                        {
                            name: "Train",
                            emoji: "🚆",
                        },
                        {
                            name: "Plane",
                            emoji: "✈️",
                        },
                        {
                            name: "Ship",
                            emoji: "🚢",
                        },
                    ]}
                />
            </div>
        </>
    );
}

export default App;
