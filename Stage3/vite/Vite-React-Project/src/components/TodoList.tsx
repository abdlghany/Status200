import { useState } from "react";

interface TodoListProps {
    title: string;
    items: string[];
}

function TodoList(props: TodoListProps) {
    const [input, setInput] = useState(''); // starting with an empty input field.
    const [tasks, setTasks] = useState(props.items); // (start with whatever items are passed to the element via properties)

    const removeTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index)); // Remove task by filtering out the index
      };
    const addTask = () => {
        if (input.trim()) {
          setTasks([...tasks, input]); // return a new array that contains the old array + new input.
          setInput(''); // Clear the input
        }
      };

      return (
        <>
          <h1>{props.title}</h1>
          <input
            type="text"
            placeholder="Task here..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />&nbsp;
          <button type="button" onClick={addTask}>
            Add
          </button>
          <ul className="list-group">
            {tasks.map((item, index) => (
              <li key={index} className="list-group-item">
                {item}&nbsp;
                <button onClick={() => removeTask(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      );
}

export default TodoList;