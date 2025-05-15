interface MoodCProps {
    title: string;
    moods: string[];
    emojis: string[];
}

const MoodE = ({ title, moods, emojis }: MoodCProps) => {
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
                                {mood} {emojis[index]}
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
        </>
    );
};

export default MoodE;

/*
interface MoodCProps {
    moods: string[];
    emojis: string[];
}

const MoodE = ({ moods, emojis }: MoodCProps) => {
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
                            {mood} {emojis[index]}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MoodE;
*/
