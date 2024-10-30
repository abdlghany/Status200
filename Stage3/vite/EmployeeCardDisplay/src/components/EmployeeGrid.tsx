import EmployeeCard from "./EmployeeCard";
import { Employee } from "../App";

interface EmployeeListProps {
    employees: Employee[];
    onRemoveEmployee: (id: number) => void;
}

function EmployeeList({ employees, onRemoveEmployee }: EmployeeListProps) {
    return (
        <div className="employee-list">
            {employees.map((employee) => (
                <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onRemove={() => onRemoveEmployee(employee.id)}
                />
            ))}
        </div>
    );
}

export default EmployeeList;
