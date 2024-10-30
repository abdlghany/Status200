import { ChangeEvent } from "react";

interface SortOptionsProps {
    sortBy: "name" | "seniority";
    setSortBy: (sortBy: "name" | "seniority") => void;
}

function SortOptions({ sortBy, setSortBy }: SortOptionsProps) {
    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as "name" | "seniority");
    };

    return (
        <div className="sort-options">
            <label>Sort by: </label>
            <select value={sortBy} onChange={handleSortChange}>
                <option value="name">Name</option>
                <option value="seniority">Seniority</option>
            </select>
        </div>
    );
}

export default SortOptions;
