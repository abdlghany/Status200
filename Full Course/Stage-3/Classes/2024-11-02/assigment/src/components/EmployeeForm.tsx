import { useState } from "react";

interface Employee {
    name: string;
    role: string;
    phone: string;
    hiring_year: number;
    picture: string;
    visible: boolean;
}

interface EmployeeFormProps {
    addEmployee: (employee: Employee) => void;
}

const EmployeeForm = ({ addEmployee }: EmployeeFormProps) => {
    const [newEmployee, setNewEmployee] = useState<Employee>({
        name: "",
        role: "",
        phone: "",
        hiring_year: new Date().getFullYear(),
        picture: "https://picsum.photos/id/633/400/400",
        visible: true,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const validationErrors: { [key: string]: string } = {};

        if (!newEmployee.name.trim())
            validationErrors.name = "Name is required";
        if (!newEmployee.role.trim())
            validationErrors.role = "Role is required";
        if (!newEmployee.phone.trim())
            validationErrors.phone = "Phone is required";
        if (
            isNaN(newEmployee.hiring_year) ||
            newEmployee.hiring_year <= 1900 ||
            newEmployee.hiring_year > new Date().getFullYear()
        ) {
            validationErrors.hiring_year = "Enter a valid hiring year";
        }
        if (!newEmployee.picture.trim()) {
            validationErrors.picture = "Picture is required";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            addEmployee(newEmployee);
            setNewEmployee({
                name: "",
                role: "",
                phone: "",
                hiring_year: new Date().getFullYear(),
                picture: "",
                visible: true,
            });
            setErrors({});
        }
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h6>New Employee</h6>
            </div>
            <div className="card-body row g-2">
                <div className="col-4 text-start fw-bold">Name:</div>
                <div className="col-8 text-start">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={newEmployee.name}
                        onChange={(e) =>
                            setNewEmployee({
                                ...newEmployee,
                                name: e.target.value,
                            })
                        }
                    />
                    {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                    )}
                </div>
                <div className="col-4 text-start fw-bold">Role:</div>
                <div className="col-8 text-start">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter role"
                        value={newEmployee.role}
                        onChange={(e) =>
                            setNewEmployee({
                                ...newEmployee,
                                role: e.target.value,
                            })
                        }
                    />
                    {errors.role && (
                        <div className="text-danger">{errors.role}</div>
                    )}
                </div>
                <div className="col-4 text-start fw-bold">Phone:</div>
                <div className="col-8 text-start">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter phone"
                        value={newEmployee.phone}
                        onChange={(e) =>
                            setNewEmployee({
                                ...newEmployee,
                                phone: e.target.value,
                            })
                        }
                    />
                    {errors.phone && (
                        <div className="text-danger">{errors.phone}</div>
                    )}
                </div>
                <div className="col-4 text-start fw-bold">Hiring year:</div>
                <div className="col-8 text-start">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter year"
                        value={newEmployee.hiring_year}
                        onChange={(e) =>
                            setNewEmployee({
                                ...newEmployee,
                                hiring_year: Number(e.target.value),
                            })
                        }
                    />
                    {errors.hiring_year && (
                        <div className="text-danger">{errors.hiring_year}</div>
                    )}
                </div>
                <div className="col-4 text-start fw-bold">Picture:</div>
                <div className="col-8 text-start">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter URL"
                        value={newEmployee.picture}
                        onChange={(e) =>
                            setNewEmployee({
                                ...newEmployee,
                                picture: e.target.value,
                            })
                        }
                    />
                    {errors.picture && (
                        <div className="text-danger">{errors.picture}</div>
                    )}
                </div>
            </div>
            <div className="card-footer d-flex justify-content-end items-align-center">
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Add Employee
                </button>
            </div>
        </div>
    );
};

export default EmployeeForm;
