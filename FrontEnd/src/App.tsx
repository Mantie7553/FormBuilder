import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Board} from "./components/Board.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
        <Board/>
    </div>
  )
}

export default App
