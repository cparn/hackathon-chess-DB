import React from 'react';

type ButtonProps = {
    nextMove: () => void,
    prevMove: () => void
}


export const Buttons: React.FC<ButtonProps> = ({ nextMove, prevMove }) => {
    return (
        <div>
            <button onClick={prevMove}>Prev</button>
            <button onClick={nextMove}>Next</button>
        </div>
    )
}