import { MouseEvent } from "react";

interface MoodCProps {
    title: string;
    moods: { name: string; emoji: string }[];
}

const MoodG = ({ title, moods }: MoodCProps) => {
    const handleClick = (e: MouseEvent) => {
        document
            .querySelectorAll(".item")
            .forEach((badge) => badge.classList.remove("text-primary"));

        e.target.classList.add("text-primary");
        // (e.target as HTMLElement).classList.add("text-primary");
    };

    return (
        <>
            <h3>Props + Event</h3>
            <div>
                <p>{title}</p>
                <ul>
                    {moods.map((mood, index) => (
                        <li key={index} className="item" onClick={handleClick}>
                            {mood.name} {mood.emoji}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MoodG;
