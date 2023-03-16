import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GameCard } from "./GameCard";

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
            console.log(gamesJson);
        }
        fetchGames();
    }, [])
    return (
        games.map(g => {
            return (
                <GameCard game={g} />)
        })

    )
}