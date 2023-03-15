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
            <button onClick={prevMove} className={`${firstMove ? ' inactive' : ''}`}>Prev</button>
            <button onClick={nextMove}>Next</button>
        </div>
    )
}