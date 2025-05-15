interface MoodCProps {
    title: string;
    moods: { name: string; emoji: string }[];
}

const MoodF = ({ title, moods }: MoodCProps) => {
    const hideMood = moods[Math.floor(Math.random() * moods.length)];

    return (
        <>
            <h3>Props</h3>
            <div>
                <p>{title}</p>
                <ul>
                    {moods.map((mood, index) =>
                        hideMood !== mood ? (
                            <li key={index}>
                                {mood.name} {mood.emoji}
                            </li>
                        ) : (
                            <li
                                key={index}
                                className="text-decoration-line-through"
                            >
                                {mood.name} {mood.emoji}
                            </li>
                        )
                    )}
                </ul>
            </div>
        </>
    );
};

export default MoodF;

/*
interface MoodCProps {
    moods: { name: string; emoji: string }[];
}

const MoodF = ({ moods }: MoodCProps) => {
    const hideMood = moods[Math.floor(Math.random() * moods.length)];
    const visibleMoods = moods.filter((mood) => mood !== hideMood);

    return (
        <>
            <h3>Props</h3>
            <div>
                <p>Moods</p>
                <ul>
                    {visibleMoods.map((mood, index) => (
                        <li key={index}>
                            {mood.name} {mood.emoji}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MoodF;
*/
