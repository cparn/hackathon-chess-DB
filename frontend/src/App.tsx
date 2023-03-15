import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { initialGame } from './chessEngine';
import { About } from './components/About';
import { Board } from './components/Chess/Board';
import { ChessInterface } from './components/Chess/ChessInterface';
import { GamesList } from './components/GamesList';
import { Navbar } from './components/Navbar';
import { Splash } from './components/Splash';

function App() {

  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/games" element={<GamesList />} />
        <Route path="/about" element={<About />} />
        <Route path="/game-viewer" element={<ChessInterface />} />
      </Routes>
    </main>
  )
}

export default App
