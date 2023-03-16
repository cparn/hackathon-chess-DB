import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Game } from './GamesList'
import './GameCard.css'
import { EditGameForm } from './EditGameForm'

type GameCardProps = {
    game: Game,
    putGame: (game: Game) => void,
    deleteGame: (id: number) => void
}

export const GameCard: React.FC<GameCardProps> = ({ game, putGame, deleteGame }) => {

    const [edit, setEdit] = useState(false);
    const [success, setSucces] = useState(false);
    const [del, setDel] = useState(false);

    const onEditClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setEdit(!edit);
    }
    const onDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setDel(true);
    }
    const onDeleteCancel = () => {
        setDel(false);
    }
    const onDeleteConfirm = async () => {
        const delResponse = await fetch(`http://localhost:5172/api/ChessGame/${game.gameId}`, {
            method: 'DELETE',
        });
        if (delResponse.status != 200) {

        } else {
            deleteGame(game.gameId);
        }

    }
    const onSuccess = () => {
        setSucces(true);
        setTimeout(() => {
            setSucces(false);
            setEdit(false);
        }, 2000);
    }
    if (del) {
        return (
            <div className="game-card">
                <div className="confirmation-box">
                    Are you sure?
                    <button onClick={onDeleteCancel}>No</button>
                    <button onClick={onDeleteConfirm}>Yes</button>
                </div>
            </div>
        )
    }
    if (!edit) {
        return (
            <Link to="/game-viewer" state={{ data: game }}>
                <div className='game-card'>
                    <img onClick={onDeleteClick} className="game-card__delete" src="delete.svg" />
                    <img onClick={onEditClick} className="game-card__edit" src="edit.svg" />
                    <h3>{game.opponent}</h3>
                    <h4>Location:</h4>
                    <p>{game.location}</p>
                    <h4>Date:</h4>
                    <p>{game.date}</p>
                </div>
            </Link>)
    } if (success) {
        return (
            <div className="game-card">
                <h2 className="success-message">Successfully updated game info.</h2>
            </div>
        )
    }
    else {
        return (
            <div className='game-card'>
                <img onClick={onEditClick} className="game-card__edit" src="back.svg" />
                <EditGameForm game={game} putGame={putGame} onSuccess={onSuccess} />
            </div>
        )
    }
}

