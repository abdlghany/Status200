import "bootstrap/dist/css/bootstrap.min.css";
import Bmi from "./components/Bmi/Bmi";
import Todo from "./components/Todo/Todo";
import Converter from "./components/Converter/Converter";

function App() {
    const todoItems = ["Groceries", "Laundry", "Cooking", "Cleaning"];

    return (
        <div className="px-4">
            <div className="py-4">
                <Todo title="Todo" todoItems={todoItems} />
            </div>
            <div className="py-4">
                <Converter title="Converter" />
            </div>
            <div className="py-4">
                <Bmi title="BMI Calculator" />
            </div>
        </div>
    );
}

export default App;
