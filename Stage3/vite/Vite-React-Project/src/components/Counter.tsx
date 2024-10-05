import { useState } from 'react'
export function Counter(){
    const [count, setCount] = useState(45);
    return (
    <>
      <div className="card">
        <p>Please enter your credit card number<br/>(example: 58265985236):</p>
      <button onClick={() => setCount((count) => count - 2)}>
          -2
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          -1
        </button>
        <span>
          Count is {count}
        </span>
        <button onClick={() => setCount((count) => count + 1)}>
          +1
        </button>
        <button onClick={() => setCount((count) => count + 2)}>
          +2
        </button>

      </div>
    </>
  )
}