import { ChangeEvent } from "react";

export enum SortOption {
    /* Specifies all available sort options
        Note to self: after adding a sort option make sure to add it  in 'filteredEmployees' in 'EmployeeGrid' as well */
    Name = "name",
    Seniority = "seniority"
}

interface SortOptionsProps {
    sortBy: SortOption;
    setSortBy: (sortBy: SortOption) => void;
}

export function SortOptions({ sortBy, setSortBy }: SortOptionsProps) {

    function handleSortChange (e: ChangeEvent<HTMLSelectElement>) {
        setSortBy(e.target.value as SortOption);
    };

    return (
        <div>
            <label className="me-1 fs-5">Sort by:</label>
            <select value={sortBy} onChange={handleSortChange} className="rounded-3 ps-1 sort-selection">
                {/* Loop through the values of SortOption */}
            {Object.values(SortOption).map((option) => (
                <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize first letter then slice it and display the rest*/}
                </option>
            ))}
                
            </select>
        </div>
    );
}


