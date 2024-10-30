import { useState } from "react";
import EmployeeGrid from "./components/EmployeeGrid"
import AddEmployeeForm from "./components/AddEmployeeForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

export interface Employee {
    id: number;
    picture: string;
    name: string;
    role: string;
    phone: string;
    yearOfHiring: number;
}

const initialEmployees: Employee[] = [
    { id: 1, picture: "pic1.png", name: "Alice Johnson", role: "Manager", phone: "123-456-7890", yearOfHiring: 2015 },
    { id: 2, picture: "pic2.png", name: "Bob Smith", role: "Engineer", phone: "987-654-3210", yearOfHiring: 2018 },
    { id: 3, picture: "pic3.png", name: "Samantha Carlson", role: "Developer", phone: "011-111-1111", yearOfHiring: 2012 },
    { id: 4, picture: "pic4.png", name: "Another Each", role: "Shoplifter", phone: "012-589-8569", yearOfHiring: 2023 },
    { id: 5, picture: "pic5.png", name: "Not Telling", role: "Assassin", phone: "058-588-9999", yearOfHiring: 2000 },
    { id: 6, picture: "pic6.png", name: "Wealthier Dan U.", role: "Wealth Management", phone: "055-555-5555", yearOfHiring: 1998 },
];

function App() {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    

    const handleAddEmployee = (newEmployee: Employee) => {
        setEmployees([...employees, newEmployee]);
    };

    const handleRemoveEmployee = (id: number) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    };


    return (
        <div className="">
            <h1 className="text-center text-black bold mb-3">Employee Management System</h1>    
            <hr />        
            <AddEmployeeForm onAddEmployee={handleAddEmployee} />
            <hr />
            <EmployeeGrid employees={employees} onRemoveEmployee={handleRemoveEmployee} />
        </div>
    );
}

export default App;
