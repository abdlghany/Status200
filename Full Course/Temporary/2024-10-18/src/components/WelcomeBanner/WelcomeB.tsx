const WelcomeB = () => {
    const isTeacher = false;

    return (
        <div>
            <h3>Conditional</h3>
            <p>{isTeacher ? "Welcome, teacher!" : "Welcome, student!"}</p>
        </div>
    );
};

export default WelcomeB;
