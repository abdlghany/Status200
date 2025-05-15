const MoodB = () => {
    const moods = ["Happy", "Sad", "Excited"];

    return (
        <>
            <h3>Basic</h3>
            <div>
                <p>Moods</p>
                <ul>
                    {moods.map((mood, index) => (
                        <li key={index}>{mood}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MoodB;
