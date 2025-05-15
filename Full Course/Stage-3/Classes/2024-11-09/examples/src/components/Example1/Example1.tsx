import { useEffect, useRef } from "react";

const Example1 = () => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, []);

    useEffect(() => {
        document.title = "useEffect Hook Example";
    }, []);

    return (
        <>
            <div className="p-4">
                <div>
                    <label>Input</label>
                    <input ref={ref} type="text" className="form-control" />
                    <h1>useEffect Hook Example</h1>
                </div>
            </div>
        </>
    );
};

export default Example1;
