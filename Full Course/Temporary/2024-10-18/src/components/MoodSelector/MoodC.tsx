const MoodC = () => {
    const moods = ["Happy", "Sad"];
    let emoji;

    const mood = moods[Math.floor(Math.random() * moods.length)];

    if (mood === "Happy") {
        emoji = "😊";
    } else {
        emoji = "😢";
    }

    return (
        <div>
            <h3>Conditional</h3>
            <p>Your current mood is: {emoji}</p>
        </div>
    );
};

export default MoodC;
