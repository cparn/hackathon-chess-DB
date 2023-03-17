import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

export const Navbar: React.FC = () => {
    return (
        <header>
            <h1>MyChessDB</h1>
            <div className='navbar'>
                <Link to="/">Home</Link>
                <Link to="/games">My Games</Link>
                <Link to="/add">Add Game</Link>
                <Link to="/about">About</Link>
            </div>
        </header>
    )
}