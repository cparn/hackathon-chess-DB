import React from 'react';
import './Buttons.css'

type ButtonProps = {
    nextMove: () => void,
    prevMove: () => void,
    firstMove: boolean,
    lastMove: boolean
}


export const Buttons: React.FC<ButtonProps> = ({ nextMove, prevMove, firstMove, lastMove }) => {
    return (
        <div>
            <button onClick={prevMove} className={`chess-interface__button ${firstMove ? ' inactive' : ''}`}>Prev</button>
            <button onClick={nextMove} className={`chess-interface__button ${lastMove ? ' inactive' : ''}`}>Next</button>
        </div>
    )
}