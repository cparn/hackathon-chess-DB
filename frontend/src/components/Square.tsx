import React from 'react';
import { getClassNameForPiece } from '../utils2';
import './Square.css';

type SquareProps = {
    piece?: number,
    cssClass: string
}


export const Square: React.FC<SquareProps> = ({ piece, cssClass }) => {
    const pieceClass = getClassNameForPiece(piece!);
    if (piece == 0) {
        piece = undefined;
    }
    return (
        <>
            <div className={cssClass + pieceClass + " board__square"}>
            </div>
        </>
    )
}
