import React, { useState } from 'react'
import { initialGame, makeMove } from '../chessEngine';
import './Board.css';
import { Square } from './Square';


export const Board = () => {
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
    const nextMove = () => {
        let newTurn = turn;
        if (isBlack) newTurn++;
        setIsBlack(!isBlack);
        setTurn(newTurn);
        console.log(turn);
        makeMove(gameBoard, game, turn, isBlack);
    }
    const prevMove = () => {
        let newTurn = turn;
        if (!isBlack) newTurn--;
        setIsBlack(!isBlack);
        setTurn(newTurn);
        console.log(turn);
    }
    const [game, setGame] = useState('1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.Nf3 Bg4 5.Be2 e6 6.c4 Nb6 7.exd6 cxd6 8.Nc3 Nc6 9.d5 exd5 10.cxd5 Bxf3 11.Bxf3 Ne5 12.O-O Be7 13.Bf4 O-O 14.Re1 Bf6 15.Be4 Rc8 16.Qb3 Qd7 17.Nb5 a6 18.Na7 Rc7 19.Bxe5 dxe5 20.Qxb6 Be7 21.Rac1 Bd6 22.Rxc7 Qxc7 23.Qxc7 Bxc7 24.Nc8 Rxc8 25.Rc1');
    const [turn, setTurn] = useState(0);
    const [isBlack, setIsBlack] = useState(false);
    const [gameBoard, setGameBoard] = useState(initialGame);
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
            <button onClick={prevMove}>prev</button>
            <button onClick={nextMove}>next</button>
        </>
    )
}
