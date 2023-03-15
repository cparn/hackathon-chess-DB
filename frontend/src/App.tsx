import { useState } from 'react'
import './App.css'
import { initialGame } from './chessEngine';
import { Board } from './components/Board';
import { ChessInterface } from './components/ChessInterface';

function App() {
  const [game, setGame] = useState('');
  const [gameBoard, setGameBoard] = useState(initialGame);

  return (
    <ChessInterface/>
  )
}

export default App
