interface EnrollmentGProps {
    students: { name: string; course: string; age: number }[];
}

function EnrollmentsG({ students }: EnrollmentGProps) {
    return (
        <>
            <h5 className="text-primary">
                G: Novice enrollment component with 4 cards using props with
                object array
            </h5>
            <p className=" pb-3">
                Already a bit better but still not ideal because lots of
                repeating HTML
            </p>
            <div className="row w-50 g-4">
                {students.map((student) => (
                    <div className="col">
                        <div className="card p-2">
                            <h2 className="card-title">Enrollment</h2>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col">Name:</div>
                                        <div className="col fst-italic">
                                            {student.name}
                                        </div>
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
                                        <div className="col fst-italic">
                                            {student.age}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default EnrollmentsG;
