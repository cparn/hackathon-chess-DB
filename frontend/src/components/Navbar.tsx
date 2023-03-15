import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

export const Navbar: React.FC = () => {
    return (
        <header>
            <h1>Personal chess explorer</h1>
            <div className='navbar'>
                <Link to="/">Home</Link>
                <Link to="/games">Games</Link>
                <Link to="/about">About</Link>
                <Link to="/testGame">Test</Link>
            </div>
        </header>
    )
}