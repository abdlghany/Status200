interface EnrollmentHProps {
    names: string[];
    courses: string[];
    ages: number[];
}

function EnrollmentsF({ names, courses, ages }: EnrollmentHProps) {
    return (
        <>
            <h5 className="text-primary">
                F: Novice enrollment component with 4 cards using deconstructed
                props with 3 string arrays.
            </h5>
            <p className=" pb-3">
                Each card with different student details. The props are passed
                through from the App.tsx and are getting deconstructed. Already
                a bit better because we don't have to prefix everything with
                `props.`. But still not ideal because lots of repeating HTML
            </p>
            <div className="row w-50 g-4">
                {names.map((student, index) => (
                    <div className="col">
                        <div className="card p-2">
                            <h2 className="card-title">Enrollment</h2>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col">Name:</div>
                                        <div className="col fst-italic">
                                            {student}
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col">Course:</div>
                                        <div className="col fst-italic">
                                            {courses[index]}
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col">Age:</div>
                                        <div className="col fst-italic">
                                            {ages[index]}
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

export default EnrollmentsF;
