import React, { useEffect, useState } from 'react'
import { Board } from './Board'
import { History } from './History';
import './ChessInterface.css';
import { initialGame, makeMove } from '../../chessEngine';
import { Buttons } from './Buttons';
import { ChessTitle } from './ChessTitle';
import { useLocation } from 'react-router-dom';
import { Game } from '../GamesList/GamesList';

type testprop = {
    optpgn?: string
}

export const ChessInterface: React.FC<testprop> = ({ optpgn }) => {
    const location = useLocation();
    let data: Game = location.state?.data;
    if (data == null && optpgn == null) return (
        <div>
            <h1>404</h1>
            <h2>The developer didn't have time to route this properly</h2>
            <h3>Try to access games from the Games page</h3>
        </div>
    );
    if (optpgn != undefined) {
        data = {
            gameId: 0,
            opponent: '',
            date: '',
            location: '',
            comments: '',
            gamePGN: optpgn!
        };
    }
    const [game, setGame] = useState(data.gamePGN);
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
        <div className="chess-interface">
            {optpgn == undefined && <ChessTitle opp={data.opponent} date={data.date} loc={data.location} />}
            <Board gameBoard={gameBoard} />
            <History iterator={iterator} game={gameSplitted} />
            <Buttons nextMove={nextMove}
                prevMove={prevMove}
                firstMove={iterator == 0}
                lastMove={iterator - (iterator % 2 == 0 ? 1 : 0) == gameSplitted.length / 3 * 2 - 1} />
            {/* <ChessInfo /> */}
        </div>
    )
}
