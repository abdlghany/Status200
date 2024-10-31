import { useState, ChangeEvent, FormEvent } from "react";
import { Employee } from "../App";

interface AddEmployeeFormProps {
    onAddEmployee: (newEmployee: Employee) => void;
}
const defaultNewEmployeeInfo = {
    picture: "",
    name: "",
    role: "",
    phone: "",
    yearOfHiring: 2020,
}
function AddEmployeeForm({ onAddEmployee }: AddEmployeeFormProps) {
    const [newEmployee, setNewEmployee] = useState(defaultNewEmployeeInfo);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newEmpWithId = { ...newEmployee, id: Date.now() };
        onAddEmployee(newEmpWithId);
        setNewEmployee(defaultNewEmployeeInfo);
    };

    return (
        <form onSubmit={handleSubmit} className="add-employee justify-content-center d-flex flex-column align-content-center m-auto gap-2 mb-4 mt-2">
            <h2 className="bold text-black">Add New Employee</h2>
            <input
                type="text"
                name="picture"
                placeholder="Picture file name"
                value={newEmployee.picture}
                onChange={handleInputChange}
                className="fs-5 rounded-3 ps-1 pb-1"
            />
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={newEmployee.name}
                onChange={handleInputChange}
                className="fs-5 rounded-3 ps-1 pb-1"
            />
            <input
                type="text"
                name="role"
                placeholder="Role"
                value={newEmployee.role}
                onChange={handleInputChange}
                className="fs-5 rounded-3 ps-1 pb-1"
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newEmployee.phone}
                onChange={handleInputChange}
                className="fs-5 rounded-3 ps-1 pb-1"
            />
            <input
                type="number"
                name="yearOfHiring"
                placeholder="Year of Hiring"
                value={newEmployee.yearOfHiring}
                onChange={handleInputChange}
                className="fs-5 rounded-3 ps-1 pb-1"
                min={1900}
                /* Date toISOString() formatted as follows:
                    2024-12-30T24:60:60 therefore splitting by - then selecting the first index will give us the highest possible selectable year  */
                max={new Date().toISOString().split("-")[0]}
            />
            <button type="submit" className="rounded-3 fs-5">Add Employee</button>
        </form>
    );
}

export default AddEmployeeForm;
