import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import BoardStep1 from "./components/Board/Step1/Board";
import BoardStep2 from "./components/Board/Step2/Board";
import BoardStep3 from "./components/Board/Step3/Board";
import BoardStep4 from "./components/Board/Step4/Board";
import BoardStep5 from "./components/Board/Step5/Board";
import BoardStep6 from "./components/Board/Step6/Board";
import BoardStep7 from "./components/Board/Step7/Board";
import BoardStep8 from "./components/Board/Step8/Board";
import BoardStep9 from "./components/Board/Step9/Board";
import Converter from "./components/Board/Converter/Converter";

function App() {
    const [step, setStep] = useState(1);

    const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
        <>
            <div className="d-flex justify-content-center my-5">
                {steps.map((s) => (
                    <button
                        key={s}
                        className="btn btn-outline-primary btn-sm mx-1"
                        onClick={() => setStep(s)}
                    >
                        {s}
                    </button>
                ))}
            </div>
            <div>
                {step === 1 && <BoardStep1 />}
                {step === 2 && <BoardStep2 />}
                {step === 3 && <BoardStep3 />}
                {step === 4 && <BoardStep4 cards={cards} />}
                {step === 5 && <BoardStep5 cards={cards} />}
                {step === 6 && <BoardStep6 cards={cards} />}
                {step === 7 && <BoardStep7 cards={cards} />}
                {step === 8 && <BoardStep8 cards={cards} />}
                {step === 9 && <BoardStep9 cards={cards} />}
            </div>
        </>
    );
}

export default App;
