function EnrollmentsA() {
    return (
        <>
            <h5 className="text-primary pb-3">
                A: Basic enrollment component with a card
            </h5>
            <div className="card w-25 p-2">
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
                            <div className="col fst-italic">React.js</div>
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
        </>
    );
}

export default EnrollmentsA;
