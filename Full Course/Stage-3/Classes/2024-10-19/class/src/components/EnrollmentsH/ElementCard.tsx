interface CardProps {
    student: { name: string; course: string; age: number };
}

const ElementCard = ({ student }: CardProps) => {
    return (
        <div className="col">
            <div className="card p-2">
                <h2 className="card-title">Enrollment</h2>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col">Name:</div>
                            <div className="col fst-italic">{student.name}</div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col">Course:</div>
                            <div className="col fst-italic">
                                {student.course}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col">Age:</div>
                            <div className="col fst-italic">{student.age}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ElementCard;
