import { useState } from 'react'
import './App.css'
import { initialGame } from './chessEngine';
import { Board } from './components/Chess/Board';
import { ChessInterface } from './components/Chess/ChessInterface';
import { Navbar } from './components/Navbar';

function App() {

  return (
    <>
      <Navbar />
      <ChessInterface />
    </>
  )
}

export default App
