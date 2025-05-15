interface WelcomeDProps {
    people: string[];
    roles: string[];
}

const WelcomeD = ({ people, roles }: WelcomeDProps) => {
    return (
        <>
            <h3>Props</h3>
            <div className="mt-3 d-flex flex-wrap">
                {people.map((person, index) => (
                    <div key={index} className="card m-2">
                        <div className="card-body">
                            <h5 className="card-title">{person}</h5>
                            <p className="card-text">Role: {roles[index]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default WelcomeD;
