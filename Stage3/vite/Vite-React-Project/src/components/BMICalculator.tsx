import React, { useState } from 'react';
// rewrote my stage 2 bmi calculator in React, tried to (and succeeded I suppose) use the exact same functions.
// check if the value is between 2 numbers x, y, return the result True, False
function isValueBetween(value: number, x: number, y: number){
  return value > Math.min(x, y) && value < Math.max(x, y);
};
// return a sentence with the appropriate BMI classification for the specified name.
function bmiClassification(name: string, bmi: number){
  let classification = '';
  if (bmi < 18.5) {
    classification = 'underweight';
  } else if (bmi < 25) {
    classification = 'normal';
  } else if (bmi < 30) {
    classification = 'overweight';
  } else {
    classification = 'obese';
  }
  return `Dear ${name}, your BMI is: ${bmi.toFixed(2)} kg/m². You are classified as ${classification}.`;
};
// changeUnits between kg, pounds and cm, inch
function changeUnits(selectedUnit: string, inputName: string){
  return `Enter your ${inputName} (${selectedUnit})`;
};
// name validation to make sure it has nothing other than the specified characters (and spaces).
function validateName(name: string){
  name = name.trim();
  const regex = /^[a-zA-Zا-ي]+(?:[ ][a-zA-Zا-ي]+)*$/;

  if (!regex.test(name)) {
    return 'Please insert a valid name! Only letters and spaces are allowed';
  } else if (name.length < 2) {
    return "Name can't have less than 2 characters.";
  } else if (name.length > 100) {
    return "Name can't have more than 100 characters.";
  }
  return null;
};
// convert height to meters no matter what the selectd unit is.
function adjustedHeight(selectedUnit:string, height:number){
    if(selectedUnit === 'inch'){
        return height / 100 * 2.54;
    }
    else{
        return height / 100;
    }
}
// convert weight to kg no matter what the selected unit is.
function adjustedWeight(selectedUnit:string, Weight:number){
    if(selectedUnit === 'pound'){
        return Weight / 2.2;
    }
    else{
        return Weight;
    }
}

function BMIComponent(){
    const [selectedUnit, setSelectedUnit] = useState<string>('cm');    // height selected unit, defaults to cm
    const [selectedWeightUnit, setSelectedWeightUnit] = useState<string>('kg');    // weight selected unit, defaults to kg
    const [name, setName] = useState<string>(''); // defaults to an empty string
    const [weight, setWeight] = useState<number | null>(null); // defaults to an empty input field
    const [height, setHeight] = useState<number | null>(null);
    const [message, setMessage] = useState<string>(''); // message field message, defaults to empty string
    const calculateBMI = function (event: React.FormEvent<HTMLFormElement>){
    event.preventDefault(); // prevent default HTML form submission.

    const validName = validateName(name);
    if (validName) {
      setMessage(validName);
      return;
    }

    if (!weight) {
      setMessage('Weight field is required! Cannot be 0');
      return;
    }

    if (!height) {
      setMessage('Height field is required! Cannot be 0');
      return;
    }

    if (selectedUnit === 'inch' && !isValueBetween(height, 101, 15)) {
      setMessage('Please insert a valid height! Between 16 Inches and 100 Inches.');
      return;
    } else if (selectedUnit === 'cm' && !isValueBetween(height, 251, 39)) {
      setMessage('Please insert a valid height! Between 40cm and 250cm.');
      return;
    }
    if (selectedWeightUnit === 'kg' && !isValueBetween(weight, 1, 150)) {
        setMessage('Please insert a valid weight! Between 1 and 150 kgs.');
        return;
      } else if (selectedWeightUnit === 'pound' && !isValueBetween(weight, 2.20, 330)) {
        setMessage('Please insert a valid weight! Between 2.2 and 330 pounds.');
        return;
      }
      // convert weight to kg and height to m before calculating BMI
    const bmi = adjustedWeight(selectedWeightUnit, weight) / Math.pow(adjustedHeight(selectedUnit, height), 2);
    setMessage(bmiClassification(name, bmi));
  };

  return (
    <form onSubmit={calculateBMI} className="text-start">
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>
              <h1>BMI Calculator</h1>
            </td>
          </tr>
          <tr className='row mb-2'>
            <td className='col'>
              <label htmlFor="name">Enter Your name<span className="text-danger  mx-0">*</span>: </label>
            </td>
            <td className='col'>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
            </td>
          </tr>
          <tr className='row mb-2'>
          <td className='col'>
              <label htmlFor="weightunit">Weight Unit: </label>
            </td>
            <td className='col'>
              <select
                id="weightunit"
                value={selectedWeightUnit}
                onChange={(e) => setSelectedWeightUnit(e.target.value)}
              >
                <option value="kg">Metric (kg)</option>
                <option value="pound">Imperial (pound)</option>
              </select>
            </td>
          </tr>
          <tr className='row mb-2'>
          <td className='col'>
              <label htmlFor="weight">{changeUnits(selectedWeightUnit, 'weight')}<span className="text-danger mx-0">*</span>: </label>
            </td>
            <td className='col'>
              <input
                type="number"
                id="weight"
                placeholder= {"Weight in " + selectedWeightUnit}
                value={weight ?? ''}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
              <br />
            </td>
          </tr>
          <tr className='row mb-2'>
          <td className='col'>
              <label htmlFor="unit">Height Unit: </label>
            </td>
            <td className='col'>
              <select
                id="unit"
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
              >
                <option value="cm">Metric (cm)</option>
                <option value="inch">Imperial (Inch)</option>
              </select>
            </td>
          </tr>
          <tr className='row mb-2'>
          <td className='col'>
              <label htmlFor="height">
                {changeUnits(selectedUnit, 'height')}
                <span className="text-danger  mx-0">*</span>:
              </label>
            </td>
            <td className='col'>
              <input
                type="number"
                id="height"
                placeholder={"Height in " + selectedUnit}
                value={height ?? ''}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </td>
          </tr>
          <tr className='text-center'>
            <td colSpan={2} className='col'>
              <button type="submit">Calculate my BMI</button>
            </td>
          </tr>
          <tr className='row mb-2'>
            <td colSpan={2}>
              <p>{message}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
export default BMIComponent;
