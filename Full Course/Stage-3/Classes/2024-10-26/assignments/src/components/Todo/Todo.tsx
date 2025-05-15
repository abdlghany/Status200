import { useState } from "react";

interface TodoProps {
    title: string;
    todoItems: string[];
}

function Todo({ title, todoItems }: TodoProps) {
    const [items, setItems] = useState(todoItems);
    const [newItem, setNewItem] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);

    function addNewItem() {
        if (newItem.trim() !== "") {
            setItems([...items, newItem]);
        }
        setNewItem("");
    }

    function removeItem(index: number) {
        setItems(items.filter((_, i) => i !== index));
    }

    function activeItem(index: number) {
        if (activeIndex !== index) {
            setActiveIndex(index);
        } else {
            setActiveIndex(-1);
        }
    }

    return (
        <div className="w-50">
            <h2>{title}</h2>
            <ul className="list-group">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`list-group-item d-flex justify-content-between ${
                            activeIndex === index && "active"
                        }`}
                        onClick={() => activeItem(index)}
                    >
                        {item}
                        <span
                            className="text-danger ms-3"
                            onClick={() => removeItem(index)}
                        >
                            x
                        </span>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newItem}
                className="mt-3"
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={addNewItem}>Add</button>
        </div>
    );
}

export default Todo;
