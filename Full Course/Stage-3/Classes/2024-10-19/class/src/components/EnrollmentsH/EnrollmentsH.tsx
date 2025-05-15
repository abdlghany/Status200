import ElementCard from "./ElementCard";

interface EnrollmentGProps {
    students: { name: string; course: string; age: number }[];
}

function EnrollmentsH({ students }: EnrollmentGProps) {
    return (
        <>
            <h5 className="text-primary">
                H: Novice enrollment component with 4 cards using a card
                component using props with object arrays
            </h5>
            <p className=" pb-3">End result</p>
            <div className="row w-50 g-4">
                {students.map((student) => (
                    <ElementCard student={student} />
                ))}
            </div>
        </>
    );
}

export default EnrollmentsH;
