import React from 'react'
import { Link } from 'react-router-dom'
import { Game } from './GamesList'
import './GameCard.css'

type GameCardProps = {
    game: Game
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {

    return (
        <Link to="/game-viewer" state={{ data: game }}>
            <div className='game-card'>
                <h3>{game.opponent}</h3>
                <p>Played at:</p>
                <p>{game.location}</p>
            </div>
        </Link>)
}

