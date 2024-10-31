import { Employee } from "../App";

interface EmployeeCardProps {
    employee: Employee;
    onRemove: () => void;
}

function EmployeeCard({ employee, onRemove }: EmployeeCardProps) {
    return (
        <div className="w-25 employee-card d-flex flex-column justify-content-between text-start">
            {/* profile-picture class is custom css in App.css */}
            <img src={"./src/assets/" + employee.picture} alt={employee.name + "'s Picuture"} className="profile-picture img-thumbnail"/>
            <h3>{employee.name}</h3>
            <p className="employee-card-paragraph">Role: {employee.role}</p>
            <p>Phone: {employee.phone}</p>
            <p>Year of Hiring: {employee.yearOfHiring}</p>
            <button onClick={onRemove} className="rounded-2">Remove</button>
        </div>
    );
}

export default EmployeeCard;
