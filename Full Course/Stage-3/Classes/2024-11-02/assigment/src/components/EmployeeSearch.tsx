import { useState } from "react";

interface EmployeeGridProps {
    searchEmployees: (searchTerm: string) => void;
}

const EmployeeSearch = ({ searchEmployees }: EmployeeGridProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="container text-center mb-4">
            <div className="row g-4">
                <div className="col-12">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for employee"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => searchEmployees(searchTerm)}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeSearch;
