import { useState } from "react";

interface MoodCProps {
    title: string;
    moods: { name: string; emoji: string }[];
}

const MoodH = ({ title, moods }: MoodCProps) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleClick = (index: number) => {
        if (index === selectedIndex) {
            setSelectedIndex(-1);
        } else {
            setSelectedIndex(index);
        }
    };

    return (
        <>
            <h3>State</h3>
            <div>
                <p>{title}</p>
                <ul>
                    {moods.map((mood, index) => (
                        <li
                            key={index}
                            className={
                                selectedIndex === index
                                    ? "text-primary fw-bold"
                                    : "text-secondary"
                            }
                            onClick={() => handleClick(index)}
                        >
                            {mood.name} {mood.emoji}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MoodH;
