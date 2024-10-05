import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(45);
  return (
    <>
      <div className="card">
      <button onClick={() => setCount((count) => count - 2)}>
          -2
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          -1
        </button>
        <span>Count is {count}</span>
        <button onClick={() => setCount((count) => count + 1)}>
          +1
        </button>
        <button onClick={() => setCount((count) => count + 2)}>
          +2
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          <code>Import from 'react'</code>
        </p>
      </div>
    </>
  )
}

export default App
