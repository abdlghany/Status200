interface DogCardProps {
    dog: { name: string; age: number; breed: string; image: string };
}

const DogCard = ({ dog }: DogCardProps) => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={dog.image}
                        className="img-fluid h-100 object-fit-cover rounded-start"
                        alt={dog.name}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{dog.name}</h5>
                        <div className="card-text">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Age: {dog.age}
                                </li>
                                <li className="list-group-item">
                                    Breed: {dog.breed}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DogCard;
