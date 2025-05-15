import { MouseEvent } from "react";

interface WelcomeFProps {
    people: { name: string; role: string }[];
}

const WelcomeF = ({ people }: WelcomeFProps) => {
    const handleClick = (e: MouseEvent) => {
        document
            .querySelectorAll(".second.card")
            .forEach((card) => card.classList.remove("bg-info-subtle"));

        e.currentTarget.classList.add("bg-info-subtle");
        // (e.target as HTMLElement).classList.add("text-primary");
    };

    return (
        <>
            <h3>Props + Event</h3>
            <div className="mt-3 d-flex flex-wrap">
                {people.map((person, index) => (
                    <div
                        key={index}
                        className="second card m-2"
                        onClick={handleClick}
                    >
                        <div className="card-body">
                            <h5 className="card-title">{person.name}</h5>
                            <p className="card-text">Role: {person.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default WelcomeF;
