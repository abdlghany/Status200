import { useState } from "react";
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeSearch from "./components/EmployeeSearch";

interface Employee {
    name: string;
    role: string;
    phone: string;
    hiring_year: number;
    picture: string;
    visible: boolean;
}

function App() {
    const employeesFromDatabase = [
        {
            name: "Karel van Zijl",
            role: "Software Engineer",
            phone: "1234567890",
            hiring_year: 2020,
            picture: "https://picsum.photos/id/548/400/400",
            visible: true,
        },
        {
            name: "Ferry Kemperman",
            role: "Eduction Consultant",
            phone: "345678901",
            hiring_year: 2022,
            picture: "https://picsum.photos/id/550/400/400",
            visible: true,
        },
        {
            name: "Sebsatian van der Velden",
            role: "AI Engineer",
            phone: "567890123",
            hiring_year: 2021,
            picture: "https://picsum.photos/id/602/400/400",
            visible: true,
        },
    ];

    const [employees, setEmployees] = useState<Employee[]>(
        employeesFromDatabase
    );

    const addEmployee = (employee: Employee) => {
        setEmployees([...employees, employee]);
    };

    const removeEmployee = (index: number) => {
        const newEmployees = employees.filter((_, i) => i !== index);
        setEmployees(newEmployees);
    };

    const moveEmployee = (index: number, direction: string) => {
        const newEmployees = [...employees];
        const employee = newEmployees[index];
        const newIndex = index + (direction === "left" ? -1 : 1);
        if (newIndex < 0 || newIndex >= newEmployees.length) return;
        newEmployees[index] = newEmployees[newIndex];
        newEmployees[newIndex] = employee;
        setEmployees(newEmployees);
    };

    const searchEmployees = (searchTerm: string) => {
        const newEmployees = employees.map((employee) => ({
            ...employee,
            visible:
                searchTerm.trim() === "" ||
                employee.name?.toLowerCase().includes(searchTerm.toLowerCase()),
        }));
        setEmployees(newEmployees);
    };

    return (
        <>
            <div className="p-4">
                <EmployeeSearch searchEmployees={searchEmployees} />
                <EmployeeGrid
                    employees={employees}
                    addEmployee={addEmployee}
                    removeEmployee={removeEmployee}
                    moveEmployee={moveEmployee}
                />
            </div>
        </>
    );
}

export default App;
