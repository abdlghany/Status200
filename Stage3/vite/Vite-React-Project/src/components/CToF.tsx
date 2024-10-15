import { useState } from 'react';

// convert between C and F
const toCelsius = (fahrenheit: number) => (fahrenheit - 32) * 5 / 9;
const toFahrenheit = (celsius: number) => (celsius * 9 / 5) + 32;

interface TemperatureConverterProps {
  initialCelsius: number;
  initialFahrenheit: number;
}
function TemperatureConverter(props: TemperatureConverterProps) {
  // States for Celsius and Fahrenheit
  const [celsius, setCelsius] = useState(props.initialCelsius);
  const [fahrenheit, setFahrenheit] = useState(props.initialFahrenheit);

  // celsius input change
  const CelsiusChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setCelsius(value);
      setFahrenheit(toFahrenheit(value));
    } else {
      setCelsius(props.initialCelsius);
      setFahrenheit(toFahrenheit(props.initialCelsius));
    }
  };

  // fahrenheit input change
  const FahrenheitChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setFahrenheit(value);
      setCelsius(toCelsius(value));
    } else {
      setFahrenheit(props.initialFahrenheit);
      setCelsius(toCelsius(props.initialFahrenheit));
    }
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="celsiusInput">Celsius</label>
        <input
          type="number"
          id="celsiusInput"
          className="form-control mt-2 mb-4"
          value={celsius}
          onChange={CelsiusChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fahrenheitInput">Fahrenheit</label>
        <input
          type="number"
          id="fahrenheitInput"
          className="form-control mt-2 mb-4"
          value={fahrenheit}
          onChange={FahrenheitChanged}
        />
      </div>
    </>
  );
};

export default TemperatureConverter;
