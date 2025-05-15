interface EnrollmentEProps {
    names: string[];
    courses: string[];
    ages: number[];
}

function EnrollmentsE(props: EnrollmentEProps) {
    return (
        <>
            <h5 className="text-primary">
                E: Novice enrollment component with 4 cards using props with 3
                string arrays.
            </h5>
            <p className=" pb-3">
                Each card with different student details. The props are passed
                through from the App.tsx. Already a bit better, because this
                mimics data coming from database or API. But still not ideal
                because lots of repeating HTML
            </p>
            <div className="row w-50 g-4">
                {props.names.map((student, index) => (
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
                                            {props.courses[index]}
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col">Age:</div>
                                        <div className="col fst-italic">
                                            {props.ages[index]}
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

export default EnrollmentsE;
