const MoodD = () => {
    const moods = ["Happy", "Sad", "Excited"];

    const hideMood = moods[Math.floor(Math.random() * moods.length)];

    const emojis = ["😊", "😢", "🤩"];

    return (
        <>
            <h3>Conditional</h3>
            <div>
                <p>Moods</p>
                <ul>
                    {moods.map((mood, index) =>
                        mood !== hideMood ? (
                            <li key={index}>
                                {mood} {emojis[index]}
                            </li>
                        ) : (
                            ""
                        )
                    )}
                </ul>
            </div>
        </>
    );
};

export default MoodD;

/*
const MoodD = () => {
    const moods = ["Happy", "Sad", "Excited"];
    const positiveMoods = moods.filter((mood) => mood !== "Sad");

    return (
        <>
            <h3>Conditional</h3>
            <div>
                <p>Moods</p>
                <ul>
                    {positiveMoods.map((mood, index) =>
                        <li key={index}>{mood}</li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default MoodD;
*/
