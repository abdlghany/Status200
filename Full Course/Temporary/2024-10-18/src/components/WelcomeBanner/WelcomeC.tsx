interface WelcomeCProps {
    name: string;
    role: string;
}

const WelcomeC = ({ name, role }: WelcomeCProps) => {
    return (
        <div>
            <h3>Props</h3>
            <p>
                Welcome, {name}! You are logged in as a {role}.
            </p>
        </div>
    );
};

export default WelcomeC;
