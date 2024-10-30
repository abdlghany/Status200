import { Employee } from "../App";

interface EmployeeCardProps {
    employee: Employee;
    onRemove: () => void;
}

function EmployeeCard({ employee, onRemove }: EmployeeCardProps) {
    return (
        <div className="employee-card">
            <img src={employee.picture} alt={employee.name} />
            <h3>{employee.name}</h3>
            <p>Role: {employee.role}</p>
            <p>Phone: {employee.phone}</p>
            <p>Year of Hiring: {employee.yearOfHiring}</p>
            <button onClick={onRemove}>Remove</button>
        </div>
    );
}

export default EmployeeCard;
