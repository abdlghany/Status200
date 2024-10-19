import { useState } from "react";
const defaultValue = 0;

function Counter() {
    const [value, setValue] = useState(defaultValue);

    return (
        <>
            <h2>{value}</h2>
            <button onClick={() => setValue(value -1)}>decrease by 1</button>
            <button onClick={() => setValue(defaultValue)}>reset</button>
            <button onClick={() => setValue(value + 1)}>increase by 1</button>
        </>
    );
}

export default Counter;