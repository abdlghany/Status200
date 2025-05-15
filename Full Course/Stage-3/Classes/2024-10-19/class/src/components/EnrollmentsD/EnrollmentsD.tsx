function EnrollmentsD() {
    const students = ["Dada", "Basil", "Vee", "Khaled"];
    const courses = ["React.js", "Vue.js", "Svelte", "Angular"];
    const ages = [18, 19, 20, 21];

    return (
        <>
            <h5 className="text-primary">
                D: Simple enrollment component using arrays to show 4 cards
                using map loop
            </h5>
            <p className=" pb-3">
                Each card with different student details. The component is a bit
                more dynamic, but still not ideal.
            </p>
            <div className="row w-50 g-4">
                {students.map((student, index) => (
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

export default EnrollmentsD;
