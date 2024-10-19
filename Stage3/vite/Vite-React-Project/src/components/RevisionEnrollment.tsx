interface properties {
    EnrollerName: string,
    EnrollerCourse?: string,
    EnrollerAge?: number
}

function RevisionEnrollment(props:properties) {
      return (
        <>
            <h2 className="text-start mt-5">Enrollment</h2>
            <div className="border-1 border-black border p-3 text-start">
                <p>Name: <span className="fst-italic">{props.EnrollerName}</span></p>
                <p>Course: <span className="fst-italic">{props.EnrollerCourse}</span></p>
                <p>AGE: <span className="fst-italic">{props.EnrollerAge}</span></p>
            </div>
        </>
    );
}
export default RevisionEnrollment;