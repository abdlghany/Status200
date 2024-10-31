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
        <div>
            <label className="me-1 fs-5">Sort by:</label>
            <select value={sortBy} onChange={handleSortChange} className="rounded-3 ps-1 sort-selection">
                <option value="name">Name</option>
                <option value="seniority">Seniority</option>
            </select>
        </div>
    );
}

export default SortOptions;
