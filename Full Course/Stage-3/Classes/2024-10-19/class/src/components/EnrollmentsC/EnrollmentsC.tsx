function EnrollmentsC() {
    const students = ["Dada", "Basil", "Vee", "Khaled"];
    const courses = ["React.js", "Vue.js", "Svelte", "Angular"];
    const ages = [18, 19, 20, 21];

    return (
        <>
            <h5 className="text-primary">
                C: Simple enrollment component using arrays to show 4 cards, no
                loop
            </h5>
            <p className=" pb-3">
                Each card with different student details. The component is a bit
                more dynamic, but still not ideal.
            </p>
            <div className="row w-50 g-4">
                <div className="col">
                    <div className="card p-2">
                        <h2 className="card-title">Enrollment</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Name:</div>
                                    <div className="col fst-italic">
                                        {students[0]}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Course:</div>
                                    <div className="col fst-italic">
                                        {courses[0]}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Age:</div>
                                    <div className="col fst-italic">
                                        {ages[0]}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <div className="card p-2">
                        <h2 className="card-title">Enrollment</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Name:</div>
                                    <div className="col fst-italic">
                                        {students[1]}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Course:</div>
                                    <div className="col fst-italic">
                                        {courses[1]}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Age:</div>
                                    <div className="col fst-italic">
                                        {ages[1]}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <div className="card p-2">
                        <h2 className="card-title">Enrollment</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Name:</div>
                                    <div className="col fst-italic">
                                        {students[2]}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Course:</div>
                                    <div className="col fst-italic">
                                        {courses[2]}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Age:</div>
                                    <div className="col fst-italic">
                                        {ages[2]}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <div className="card p-2">
                        <h2 className="card-title">Enrollment</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Name:</div>
                                    <div className="col fst-italic">
                                        {students[3]}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Course:</div>
                                    <div className="col fst-italic">
                                        {courses[3]}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Age:</div>
                                    <div className="col fst-italic">
                                        {ages[3]}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EnrollmentsC;
