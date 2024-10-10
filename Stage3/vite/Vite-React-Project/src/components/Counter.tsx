import { useState } from 'react'

export default function Counter(){
    const [count, setCount] = useState(45);
    return (
    <>
      <div className="card">
        
      <button onClick={() => setCount((count) => count - 1000000000)}>
          -1000000000
        </button>
        <button onClick={() => setCount((count) => count - 1000)}>
          -1000
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          -1
        </button>
        <span>
          My card number is {count}
        </span>
        <button onClick={() => setCount((count) => count + 1)}>
          +1
        </button>
        <button onClick={() => setCount((count) => count + 1000)}>
          +1000
        </button>
        <button onClick={() => setCount((count) => count + 1000000000)}>
          +1000000000
        </button>
      </div>
    </>
  )
}