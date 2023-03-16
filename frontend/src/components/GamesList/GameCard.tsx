import React from 'react'
import { Link } from 'react-router-dom'
import { Game } from './GamesList'

type GameCardProps = {
    game: Game
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {

    return (
        <Link to="/game-viewer" state={{ data: game }}><h3>{game.opponent}</h3></Link>)
}

