interface GreetCProps {
    name: string;
    message: string;
}

function GreetC({ name, message }: GreetCProps) {
    return (
        <>
            <div>
                <h3>Props</h3>
                <p>Hello, {name}!</p>
                <p>{message}</p>
            </div>
        </>
    );
}

export default GreetC;

/*
interface GreetCProps {
    name: string;
    message: string;
}

const GreetC = ({ name, message }: GreetCProps) => {
    return (
        <>
            <div>
                <h3>Props</h3>
                <p>Hello, {name}!</p>
                <p>{message}</p>
            </div>
        </>
    );
};

export default GreetC;
*/
