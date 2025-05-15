interface Employee {
    name: string;
    role: string;
    phone: string;
    hiring_year: number;
    picture: string;
}

interface EmployeeCardProps {
    employee: Employee;
    index: number;
    last: number;
    removeEmployee: (index: number) => void;
    moveEmployee: (index: number, direction: string) => void;
}

const EmployeeCard = ({
    employee,
    index,
    last,
    removeEmployee,
    moveEmployee,
}: EmployeeCardProps) => {
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h6>{employee.name}</h6>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeEmployee(index)}
                >
                    Remove
                </button>
            </div>
            <div className="row g-0">
                <div className="col-4">
                    <img
                        src={employee.picture}
                        className="img-fluid"
                        alt={employee.name}
                    />
                </div>
                <div className="col-8">
                    <div className="card-body py-0 px-2 d-flex align-items-center h-100 fs-6">
                        <table className="table text-start m-0 table-borderless table-sm">
                            <tbody>
                                <tr>
                                    <th>Role</th>
                                    <td>{employee.role}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{employee.phone}</td>
                                </tr>
                                <tr>
                                    <th>Year</th>
                                    <td>{employee.hiring_year}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <button
                    className={`btn btn-sm btn-outline-secondary ${
                        index === 0 ? "disabled" : ""
                    }`}
                    onClick={() => moveEmployee(index, "left")}
                >
                    move left
                </button>
                <button
                    className={`btn btn-sm btn-outline-secondary ${
                        index === last ? "disabled" : ""
                    }`}
                    onClick={() => moveEmployee(index, "right")}
                >
                    move right
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;
