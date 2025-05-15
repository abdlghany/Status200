import { useState } from "react";

interface BmiProps {
    title: string;
}

function Bmi({ title }: BmiProps) {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bmi, setBmi] = useState(0);

    const handleHeightChange = (value: string) => {
        setHeight(Number(value));
    };

    const handleWeightChange = (value: string) => {
        setWeight(Number(value));
    };

    const calculateBmi = () => {
        if (height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const newBmi = weight / (heightInMeters * heightInMeters);
            setBmi(Math.round(newBmi * 100) / 100);
        } else {
            setBmi(0);
        }
    };

    return (
        <div className="w-50">
            <h2>{title}</h2>
            <div className="container">
                <div className="row gap-3">
                    <label className="col">Height (cm):</label>
                    <label className="col">Weight (kg):</label>
                    <span className="col"></span>
                    <span className="col"></span>
                </div>
                <div className="row gap-3">
                    <input
                        type="number"
                        className="col"
                        value={height}
                        onChange={(e) => handleHeightChange(e.target.value)}
                    />
                    <input
                        type="number"
                        className="col"
                        value={weight}
                        onChange={(e) => handleWeightChange(e.target.value)}
                    />
                    <button className="col" onClick={calculateBmi}>
                        Calculate
                    </button>
                    <span className="col">
                        {bmi > 0 ? `Score: ${bmi}` : ""}{" "}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Bmi;
