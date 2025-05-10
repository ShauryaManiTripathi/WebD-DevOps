import { useState } from 'react'
import './App.css'
// ! dynamic websites, you write so much JS code that does DOM manipulation
// ! react is a library that helps you build dynamic websites by simplifying the process of writing JS code
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br></br>
        <button onClick={() => setCount(Math.random())}>
          count is {count}
        </button>
    </>
  )
}

export default App
