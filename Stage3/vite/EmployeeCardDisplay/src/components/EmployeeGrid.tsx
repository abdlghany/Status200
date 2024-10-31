import EmployeeCard from "./EmployeeCard";
import { Employee } from "../App";
import EmployeeSearch from "./EmployeeSearch";
import {SortOptions, SortOption} from "./SortOptions";
import { useState } from "react";

interface EmployeeListProps {
    employees: Employee[];
    onRemoveEmployee: (id: number) => void;
}

function EmployeeGrid({ employees, onRemoveEmployee }: EmployeeListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>(SortOption.Seniority); /* Defaults to 'orderBy'  = 'seniority' */
    const perRow = 4;
    /* Filter then sort filtered employees, to make sure that sorting works even after searching for a specific name,
        for example searching for "AL" will return 3 employees that can be sorted by name or by seniority */
    const filteredEmployees = employees
        .filter((employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((x, y) =>{
            if(sortBy === "name"){
                return x.name.localeCompare(y.name); 
                /* Returns a number depending on the comparison value,
                    for example, if we have 2 names, x is "Alice", y is "Alee" 
                    x.localeCompare(y) will return 1 -> the first argument is bigger than the second one (i comes after e).
                    y.localeCompare(x) will return -1  -> the first argument is smaller than the second one (e comes before i).
                    - if they're equal, x = "Alice"; y = "Alice"; it'll return 0 -> arguments are equal.
                    sort(x, y) is expected to return a negative value if the first argument is less than the second argument, 
                    zero if they're equal, and a positive value otherwise.
                    another example: 
                        [11,2,22,1].sort((x, y) => x - y) -> is: [1,2,11,22]
                    But
                        [11,2,22,1].sort((x, y) => y - x) -> is: [22,11,2,1]
                 */
            }
            else{
                return x.yearOfHiring - y.yearOfHiring; 
            }
            }
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
                : filteredEmployees.map((_, index) => (
                    index % perRow === 0 ? ( /* Display every 'perRow' filteredEmployees in 1 row */
                        <div className="row mb-4" key={filteredEmployees[index].id}>
                            {[...Array(perRow)].map((_, i) => {
                                const currentEmployee = filteredEmployees[index + i];
                                return currentEmployee ? (
                                    <EmployeeCard
                                        key={currentEmployee.id}
                                        employee={currentEmployee}
                                        onRemove={() => onRemoveEmployee(currentEmployee.id)}
                                    />
                                ) : null;
                            })}
                        </div>
                    ) : null /* if (index % perRow) is not 0, return null, note that 0 % 4 = 0 */
                    
                ))}
            </div>
        </div>
    );
}

export default EmployeeGrid;
