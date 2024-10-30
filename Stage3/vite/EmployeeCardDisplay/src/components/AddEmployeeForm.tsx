import { useState, ChangeEvent, FormEvent } from "react";
import { Employee } from "../App";

interface AddEmployeeFormProps {
    onAddEmployee: (newEmployee: Employee) => void;
}

function AddEmployeeForm({ onAddEmployee }: AddEmployeeFormProps) {
    const [newEmployee, setNewEmployee] = useState({
        picture: "",
        name: "",
        role: "",
        phone: "",
        yearOfHiring: 2020,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newEmpWithId = { ...newEmployee, id: Date.now() };
        onAddEmployee(newEmpWithId);
        setNewEmployee({
            picture: "",
            name: "",
            role: "",
            phone: "",
            yearOfHiring: 2020,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="add-employee-form">
            <input
                type="text"
                name="picture"
                placeholder="Picture URL"
                value={newEmployee.picture}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={newEmployee.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="role"
                placeholder="Role"
                value={newEmployee.role}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newEmployee.phone}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="yearOfHiring"
                placeholder="Year of Hiring"
                value={newEmployee.yearOfHiring}
                onChange={handleInputChange}
            />
            <button type="submit">Add Employee</button>
        </form>
    );
}

export default AddEmployeeForm;
