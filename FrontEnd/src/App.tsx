import { useState } from 'react'
import './App.css'
import {Board} from "./components/Board.tsx";

function App() {

  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
        <Board/>
    </div>
  )
}

export default App
