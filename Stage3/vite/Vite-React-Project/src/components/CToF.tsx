import { useState } from 'react';

// convert between C and F
// Formula: (0°C × 9/5) + 32 = 32°F

function toFahrenheit (celsius: number){
    return (celsius * 9 / 5) + 32;
}
function toCelsius(fahrenheit: number){
    return (fahrenheit - 32) * 5 / 9;
}

interface TemperatureConverterProperties {
  defaultCelsius: number;
  defaultFahrenheit: number;
}
function TemperatureConverter(props: TemperatureConverterProperties) {
  // States for Celsius and Fahrenheit
  const [celsius, setCelsius] = useState(props.defaultCelsius);
  const [fahrenheit, setFahrenheit] = useState(props.defaultFahrenheit);

  // celsius input change
  const CelsiusChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setCelsius(value);
      setFahrenheit(toFahrenheit(value));
    } else {
      setCelsius(0);
      setFahrenheit(toFahrenheit(0));
    }
  };

  // fahrenheit input change
  const FahrenheitChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setFahrenheit(value);
      setCelsius(toCelsius(value));
    } else {
      setFahrenheit(0);
      setCelsius(toCelsius(0));
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
