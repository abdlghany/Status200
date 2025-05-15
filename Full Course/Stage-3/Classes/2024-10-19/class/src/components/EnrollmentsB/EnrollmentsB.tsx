function EnrollmentsB() {
    return (
        <>
            <h5 className="text-primary">
                B: Basic enrollment component with 4 cards
            </h5>
            <p className=" pb-3">
                Each card with different student details. Already becomes clear
                we're repeating ourselves here.
            </p>
            <div className="row w-50 g-4">
                <div className="col">
                    <div className="card p-2">
                        <h2 className="card-title">Enrollment</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Name:</div>
                                    <div className="col fst-italic">Khaled</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Course:</div>
                                    <div className="col fst-italic">
                                        React.js
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Age:</div>
                                    <div className="col fst-italic">18</div>
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
                                    <div className="col fst-italic">Vee</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Course:</div>
                                    <div className="col fst-italic">Vue.js</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Age:</div>
                                    <div className="col fst-italic">19</div>
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
                                    <div className="col fst-italic">Dada</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Course:</div>
                                    <div className="col fst-italic">
                                        ASP.NET
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Age:</div>
                                    <div className="col fst-italic">20</div>
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
                                    <div className="col fst-italic">Basil</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Course:</div>
                                    <div className="col fst-italic">Python</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">Age:</div>
                                    <div className="col fst-italic">21</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EnrollmentsB;
