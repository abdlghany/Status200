import RevisionEnrollment from './RevisionEnrollment';
export default function Page(){
    const names = ["vee", "Khaled", "Abo", "Who?", "How could this be"];
    const ages = [25,36,45,36, 54];
    const courses = ["React.js", "Javascript", "HTML", "Bootstrap/CSS", "Math"];
    return (
        <>
            <div className='row'>
                {
                    names.map((name, index) =>
                        index % 2 === 0 ? (
                            <div className='col'>
                                <RevisionEnrollment 
                                    EnrollerName={names[index]} 
                                    EnrollerAge={ages[index]} 
                                    EnrollerCourse={courses[index]} />
                                {names[index + 1] && (
                                    <RevisionEnrollment 
                                        EnrollerName={names[index + 1]} 
                                        EnrollerAge={ages[index + 1]} 
                                        EnrollerCourse={courses[index + 1]} />
                                )}
                            </div>
                        ) : null
                    )
                }
            </div>
        </>
    );
    
}
