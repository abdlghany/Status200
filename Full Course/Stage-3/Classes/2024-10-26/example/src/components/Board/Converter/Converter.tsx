import { useState } from "react";

function Converter() {
    const [direction, setDirections] = useState("toFahrenheit");
    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(32);

    const handleCelsiusChange = (value: number) => {
        setCelsius(value);
        setFahrenheit((value * 9) / 5 + 32);
        setDirections("toFahrenheit");
    };

    const handleFahrenheitChange = (value: number) => {
        setFahrenheit(value);
        setCelsius(((value - 32) * 5) / 9);
        setDirections("toCelsius");
    };

    return (
        <>
            <h2>Temperature Converter</h2>
            <div className="d-flex gap-3">
                <label>
                    Celsius:
                    <input
                        type="number"
                        value={celsius}
                        onChange={(e) =>
                            handleCelsiusChange(Number(e.target.value))
                        }
                    />
                </label>
                <span>
                    <br />
                    {direction === "toFahrenheit" ? ">" : "<"}
                </span>
                <label>
                    Fahrenheit:
                    <input
                        type="number"
                        value={fahrenheit}
                        onChange={(e) =>
                            handleFahrenheitChange(Number(e.target.value))
                        }
                    />
                </label>
            </div>
        </>
    );
}

export default TemperatureConverter;
