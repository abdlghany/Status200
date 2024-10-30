import { useState } from "react";
import EmployeeList from "./components/EmployeeGrid"
import SearchBar from "./components/EmployeeSearch";
import AddEmployeeForm from "./components/AddEmployeeForm";
import SortOptions from "./components/SortOptions";
import "bootstrap/dist/css/bootstrap.min.css";

export interface Employee {
    id: number;
    picture: string;
    name: string;
    role: string;
    phone: string;
    yearOfHiring: number;
}

const initialEmployees: Employee[] = [
    { id: 1, picture: "pic1.jpg", name: "Alice Johnson", role: "Manager", phone: "123-456-7890", yearOfHiring: 2015 },
    { id: 2, picture: "pic2.jpg", name: "Bob Smith", role: "Engineer", phone: "987-654-3210", yearOfHiring: 2018 },
    // Add more sample employees
];

function App() {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "seniority">("seniority");

    const handleAddEmployee = (newEmployee: Employee) => {
        setEmployees([...employees, newEmployee]);
    };

    const handleRemoveEmployee = (id: number) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    };

    const filteredEmployees = employees
        .filter((employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) =>
            sortBy === "name" ? a.name.localeCompare(b.name) : a.yearOfHiring - b.yearOfHiring
        );

    return (
        <div className="App">
            <h1>Employee Management System</h1>
            <SearchBar setSearchQuery={setSearchQuery} />
            <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
            <AddEmployeeForm onAddEmployee={handleAddEmployee} />
            <EmployeeList employees={filteredEmployees} onRemoveEmployee={handleRemoveEmployee} />
        </div>
    );
}

export default App;
