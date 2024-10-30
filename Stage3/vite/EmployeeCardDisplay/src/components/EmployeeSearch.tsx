import { ChangeEvent } from "react";

interface SearchBarProps {
    setSearchQuery: (query: string) => void;
}

function SearchBar({ setSearchQuery }: SearchBarProps) {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search employees..."
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default SearchBar;
