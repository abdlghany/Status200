import Example1 from "./components/Example1/Example1";
import Example2 from "./components/Example2/Example2";
import Example3 from "./components/Example3/Example3";
import Example4 from "./components/Example4/Example4";
import RealApi from "./components/RealApi/RealApi";

const App = () => {
    return (
        // start of class with useRef and useEffect
        // <Example1 />

        // Hardcoded data, using useEffect here doen't make sense, but it's just for demonstration
        // <Example2 />

        // useEffect with fake API data from JSON files
        // <Example3 />

        // useEffect with fake API data from JSON files and timeouts to simulate loading time
        // <Example4 />

        // useEffect with real API data
        <RealApi />
    );
};

export default App;
