import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";

interface Employee {
    name: string;
    role: string;
    phone: string;
    hiring_year: number;
    picture: string;
    visible: boolean;
}

interface EmployeeGridProps {
    employees: Employee[];
    addEmployee: (employee: Employee) => void;
    removeEmployee: (index: number) => void;
    moveEmployee: (index: number, direction: string) => void;
}

const EmployeeGrid = ({
    employees,
    addEmployee,
    removeEmployee,
    moveEmployee,
}: EmployeeGridProps) => {
    return (
        <>
            <div className="container text-center">
                <div className="row g-4">
                    {employees.map((employee, index) => (
                        <div
                            key={index}
                            className={`col-12 col-md-6 col-xl-4 ${
                                employee.visible ? "" : "d-none"
                            }`}
                        >
                            <EmployeeCard
                                employee={employee}
                                index={index}
                                last={employees.length - 1}
                                removeEmployee={removeEmployee}
                                moveEmployee={moveEmployee}
                            />
                        </div>
                    ))}
                    <div className="col-12 col-md-6 col-xl-4">
                        <EmployeeForm addEmployee={addEmployee} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeGrid;
