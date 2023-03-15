import { useState } from 'react';
import { initialGame, makeMove } from '../chessEngine';
import './Board.css';
import { Square } from './Square';

type BoardProps ={
    game:string
}
    

export const Board: React.FC<BoardProps> = ({game}) => {
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


    const findMoveString = (game: string, turn: number, isBlack: boolean) => {
        const moveString = game.split(' ');
        let move = moveString[turn];
        const slice = turn < 18 ? 2 : 3;
        return isBlack ? move : move.slice(slice);
    }

    const [iterator, setIterator] = useState(0);
    const [gameBoard, setGameBoard] = useState<number[][]>(initialGame);
    const [gameBoardHistory, setGameBoardHistory] = useState<number[][][]>([initialGame]);

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
