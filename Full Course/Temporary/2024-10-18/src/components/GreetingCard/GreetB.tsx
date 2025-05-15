function GreetB() {
    const hour = new Date().getHours();
    let message;

    if (hour < 12) {
        message = "Good morning!";
    } else if (hour < 18) {
        message = "Good afternoon!";
    } else {
        message = "Good evening!";
    }

    return (
        <>
            <div>
                <h3>Conditional</h3>
                <p>{message}</p>
            </div>
        </>
    );
}

export default GreetB;

/*
const GreetB = () => {

    const hour = new Date().getHours();
    let message;

    if (hour < 12) {
        message = "Good morning!";
    } else if (hour < 18) {
        message = "Good afternoon!";
    } else {
        message = "Good evening!";
    }

    return (
        <>
            <div>
                <h3>Conditional</h3>
                <p>{message}</p>
            </div>
        </>
    );
};

export default GreetB;
*/
