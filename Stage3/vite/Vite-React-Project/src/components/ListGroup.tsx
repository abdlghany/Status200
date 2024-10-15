import { useState } from "react";

interface ListGroupProps {
    title: string;
    items: string[];
}

function ListGroup({ title, items }: ListGroupProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <h1>{title}</h1>
            <ul className="list-group">
                {items.sort().map(function (item, index) {
                    return (
                        <li
                            key={item}
                            className={`list-group-item ${
                                index === selectedIndex ? "active" : ""
                            }`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default ListGroup;