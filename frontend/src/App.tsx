import { useState } from 'react'
import './App.css'
import { initialGame } from './chessEngine';
import { Board } from './components/Board';

function App() {
  const [game, setGame] = useState('');
  const [gameBoard, setGameBoard] = useState(initialGame);

  return (
    <Board/>
  )
}

export default App
