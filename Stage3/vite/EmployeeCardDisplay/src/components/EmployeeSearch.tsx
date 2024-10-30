import { ChangeEvent } from "react";

interface SearchBarProps {
    setSearchQuery: (query: string) => void;
}

function EmployeeSearch({ setSearchQuery }: SearchBarProps) {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
            <input
                type="text"
                placeholder="Search employees..."
                onChange={handleSearchChange}
                className="fs-5 rounded-3 ps-1"
            />
    );
}

export default EmployeeSearch;
