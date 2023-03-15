import React, { useEffect, useState } from 'react'
import { Board } from './Board'
import { History } from './History';
import './ChessInterface.css';
import { initialGame, makeMove } from '../../chessEngine';
import { Buttons } from './Buttons';

export const ChessInterface = () => {

    const [game, setGame] = useState('1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.Nf3 Bg4 5.Be2 e6 6.c4 Nb6 7.exd6 cxd6 8.Nc3 Nc6 9.d5 exd5 10.cxd5 Bxf3 11.Bxf3 Ne5 12.O-O Be7 13.Bf4 O-O 14.Re1 Bf6 15.Be4 Rc8 16.Qb3 Qd7 17.Nb5 a6 18.Na7 Rc7 19.Bxe5 dxe5 20.Qxb6 Be7 21.Rac1 Bd6 22.Rxc7 Qxc7 23.Qxc7 Bxc7 24.Nc8 Rxc8 25.Rc1');
    const [iterator, setIterator] = useState(0);
    const [gameBoard, setGameBoard] = useState<number[][]>(initialGame);
    const [gameBoardHistory, setGameBoardHistory] = useState<number[][][]>([initialGame]);
    const [gameSplitted, setGameSplitted] = useState<string[]>([]);

    const nextMove = () => {
        if (iterator >= gameBoardHistory.length - 1) {
            const isBlack = iterator % 2 == 0 ? false : true;
            const copy = gameBoard.map(arr => [...arr]);
            setGameBoard(makeMove(copy, game, iterator, isBlack));
            setGameBoardHistory([...gameBoardHistory, copy]);
        }
        else {
            setGameBoard(gameBoardHistory[iterator + 1]);
        }
        setIterator(iterator + 1);
    }
    const prevMove = () => {
        setGameBoard(gameBoardHistory[iterator - 1]);
        setIterator(iterator - 1);
    }
    useEffect(() => {
        let arr = game.split(' ');
        let splittedGame: string[] = [];
        for (let i = 0; i < arr.length; i += 2) {
            const tmpArr = arr[i].split('.');
            splittedGame.push(`${tmpArr[0]}.`);
            splittedGame.push(`${tmpArr[1]}`);
            splittedGame.push(`${arr[i + 1]}`);
        }
        setGameSplitted(splittedGame);

    }, [game]);

    return (
        <main className="chess-interface">
            <Board gameBoard={gameBoard} />
            <History iterator={iterator} game={gameSplitted} />
            <Buttons nextMove={nextMove}
                prevMove={prevMove}
                firstMove={iterator == 0}
                lastMove={iterator == gameSplitted.length / 3 * 2 - 1} />
        </main>
    )
}
