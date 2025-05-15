// import ListItem from "./ListItem";

import { MouseEvent } from "react";

function ListGroup() {
    const cities = [
        "Washington",
        "Amsterdam",
        "Kuala Lumpur",
        "Rome",
        "Paris",
        "Berlin",
        "Prague",
        "Madrid",
        "London",
        // "Oslo",
        // "Moscow",
    ];

    const forbiddenCities = ["Oslo", "Moscow"];

    if (forbiddenCities.some((city) => cities.includes(city))) {
        return (
            <>
                <p>
                    You can not access this website. You are based in{" "}
                    {forbiddenCities.join(" or you are based in ")}
                </p>
            </>
        );
    }

    const handleClick = (event: MouseEvent) => {
        event.currentTarget.parentElement?.childNodes.forEach(
            (node: ChildNode) => {
                if (node instanceof Element) {
                    node.classList.remove("active");
                }
            }
        );

        event.currentTarget.classList.toggle("active");
    };

    return (
        <>
            <ul className="list-group">
                {cities.sort().map(function (city) {
                    return (
                        <li
                            key={city}
                            className="list-group-item"
                            onClick={handleClick}
                        >
                            {city}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default ListGroup;
