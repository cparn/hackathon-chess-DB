import React, { useEffect, useState } from "react";
import { GameCard } from "./GameCard";
import './GamesList.css';

export type Game = {
    gameId: number,
    opponent: string,
    date: string,
    location: string,
    gamePGN: string,
    comments: string
}

export const GamesList: React.FC = (): any => {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            const games = await fetch('http://localhost:5172/api/ChessGame');
            const gamesJson = (await games.json()) as Game[];
            setGames(gamesJson);
        }
        fetchGames();
    }, [])

    const putGame = (putgame: Game) => {
        const i = games.map(g => g.gameId).indexOf(putgame.gameId);
        const newArr = [...games];
        newArr[i] = putgame;
        setGames(newArr);
    }
    const deleteGame = async (gameId: number) => {
        const i = games.map(g => g.gameId).indexOf(gameId);
        const newArr = [...games];
        newArr.splice(i, 1);
        setGames(newArr);
    }

    return (
        <div className="games-list">
            {games.map(g => {
                return (
                    <GameCard game={g} putGame={putGame} deleteGame={deleteGame} />)
            })}
        </div>
    )
}