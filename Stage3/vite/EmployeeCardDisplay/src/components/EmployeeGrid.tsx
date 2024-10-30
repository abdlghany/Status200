import EmployeeCard from "./EmployeeCard";
import { Employee } from "../App";
import EmployeeSearch from "./EmployeeSearch";
import SortOptions from "./SortOptions";
import { useState } from "react";

interface EmployeeListProps {
    employees: Employee[];
    onRemoveEmployee: (id: number) => void;
}

function EmployeeGrid({ employees, onRemoveEmployee }: EmployeeListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "seniority">("seniority");

    
    const filteredEmployees = employees
        .filter((employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) =>
            sortBy === "name" ? a.name.localeCompare(b.name) : a.yearOfHiring - b.yearOfHiring
        );

    return (
        <div className="employee-grid p-4">
        <div className="d-flex flex-row justify-content-around mb-4">
                <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
                <EmployeeSearch setSearchQuery={setSearchQuery} />
            </div>
        <div className="col">
            {
            filteredEmployees.length === 0 /* Show a message if there are no employees to display */
            ? searchQuery != "" /* show search result message if there's a searchQuery, otherwise, list is empty. */
                ? <h4>There are no employees that match the search result...</h4>
                : <h4>Employees list is empty...</h4>
            : filteredEmployees.map((employee, index) => (
                index % 4 === 0 ? ( /* Display every 4 filteredEmployees in 1 */
                    <div className="row mb-4" >
                    <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onRemove={() => onRemoveEmployee(employee.id)}
                />{/* Display the next employee if it exists */}
                {filteredEmployees[index+1]? 
                (<EmployeeCard
                    key={filteredEmployees[index+1].id}
                    employee={filteredEmployees[index+1]}
                    onRemove={() => onRemoveEmployee(filteredEmployees[index+1].id)}
                />)
                :null}
                {filteredEmployees[index+2]? 
                (<EmployeeCard
                    key={filteredEmployees[index+2].id}
                    employee={filteredEmployees[index+2]}
                    onRemove={() => onRemoveEmployee(filteredEmployees[index+2].id)}
                />)
                :null}
                {filteredEmployees[index+3]? 
                (<EmployeeCard
                    key={filteredEmployees[index+3].id}
                    employee={filteredEmployees[index+3]}
                    onRemove={() => onRemoveEmployee(filteredEmployees[index+3].id)}
                />)
                :null}
                </div>
                ) : null
                
            ))}
        </div>
        </div>
    );
}

export default EmployeeGrid;
