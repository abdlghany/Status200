import React, { useState } from 'react';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
};

// Controlled Input component
const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        if(e.target.value.includes("j")){
            onChange("Your name cannot contain the letter j.");
      }
      else{
        onChange(e.target.value);
      }
    }}
    />
  );
};

// Parent component that uses the controlled Input component
const FormComponent: React.FC = () => {
  const [name, setName] = useState<string>('');

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <Input value={name} onChange={handleNameChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;