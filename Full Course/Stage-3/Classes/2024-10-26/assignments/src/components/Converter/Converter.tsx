import { useState } from "react";

interface ConverterProps {
    title: string;
}

function Converter({ title }: ConverterProps) {
    const [direction, setDirections] = useState("toFahrenheit");
    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(32);

    const handleCelsiusChange = (value: number) => {
        setCelsius(value);
        const fahrenheit = (value * 9) / 5 + 32;
        setFahrenheit(Math.round(fahrenheit * 100) / 100);
        setDirections("toFahrenheit");
    };

    const handleFahrenheitChange = (value: number) => {
        setFahrenheit(value);
        const celsius = ((value - 32) * 5) / 9;
        setCelsius(Math.round(celsius * 100) / 100);
        setDirections("toCelsius");
    };

    return (
        <>
            <div className="w-50">
                <h2>{title}</h2>
                <div className="container">
                    <div className="row gap-3">
                        <label className="col">Celsius:</label>
                        <span className="col"></span>
                        <label className="col ">Fahrenheit:</label>
                    </div>
                    <div className="row gap-3">
                        <input
                            type="number"
                            value={celsius}
                            className="col"
                            onChange={(e) =>
                                handleCelsiusChange(Number(e.target.value))
                            }
                        />
                        <span className="col text-center">
                            {direction === "toFahrenheit" ? ">" : "<"}
                        </span>
                        <input
                            type="number"
                            value={fahrenheit}
                            className="col"
                            onChange={(e) =>
                                handleFahrenheitChange(Number(e.target.value))
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Converter;
