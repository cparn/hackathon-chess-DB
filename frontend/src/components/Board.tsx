import { useState } from 'react';
import { initialGame, makeMove } from '../chessEngine';
import './Board.css';
import { Square } from './Square';

type BoardProps = {
    gameBoard: number[][],
}


export const Board: React.FC<BoardProps> = ({ gameBoard }) => {
    let b = false;
    let count = 0;
    const getColour = (): string => {
        const ret = b ? "dark" : "light";
        b = !b;
        count++;
        if (count >= 8) {
            count = 0;
            b = !b;
        }
        return ret;
    }

    return (
        <>
            <section className="board">
                {[...gameBoard].reverse().map(r =>
                    <div className="board__row">
                        {[...r].reverse().map(s =>
                            <Square piece={s} cssClass={getColour()} />
                        )}
                    </div>
                )}
            </section >
        </>
    )
}
