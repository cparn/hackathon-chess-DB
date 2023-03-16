import React, { ReactElement, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AddGame.css'
import { ChessInterface } from './Chess/ChessInterface'
import { Game } from './GamesList/GamesList'

type FormState = {
    opponent: string,
    date: string,
    location: string,
    comments: string,
    gamePGN: string
}

type ErrorType = {
    Location: string[] | undefined,
    Date: string[] | undefined,
    Opponent: string[] | undefined,
    GamePGN: string[] | undefined
}

export const AddGame = () => {
    const [error, setError] = useState(false);
    const [formState, setFormState] = useState<FormState>({
        opponent: '',
        date: '',
        location: '',
        comments: '',
        gamePGN: ''
    });
    const [errorMessage, setErrorMessage] = useState<ErrorType>({
        Location: undefined,
        Date: undefined,
        Opponent: undefined,
        GamePGN: undefined
    });
    const [game, setGame] = useState<Game>();
    const [preview, setPreview] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postResponse = await fetch('http://localhost:5172/api/ChessGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState)
        });
        if (postResponse.status != 201) {
            const result = await postResponse.json();
            console.log(result);
            const errors = result.errors as ErrorType;
            setError(true);
            setErrorMessage(errors);
            setTimeout(() => {
                setError(false);
            }, 4000);
        } else {
            const result = await postResponse.json() as Game;
            setGame(result)
            setSuccess(true);
        }
    }
    const handlePreviews = (e: any) => {
        e.preventDefault();
        setPreview(!preview);
    }
    const getErrors = () => {
        const res: string[] = [];
        if (errorMessage.Date != undefined) {
            res.push(errorMessage.Date[0]);
        }
        if (errorMessage.Location != undefined) {
            res.push(errorMessage.Location[0]);
        }
        if (errorMessage.Opponent != undefined) {
            res.push(errorMessage.Opponent[0]);
        }
        if (errorMessage.GamePGN != undefined) {
            res.push(errorMessage.GamePGN[0]);
        }
        return res;
    }
    if (success) {
        return (
            <div className="addgame-card">
                <Link to="/game-viewer" state={{ data: game }}>
                    <h1>Success!</h1>
                    <h2> Click anywhere to continue.</h2>
                </Link>
            </div>
        )
    }
    return (
        <div className="addgame-card">
            <h2>Add game</h2>
            <form className="addgame-card__form" onSubmit={handleSubmit}>
                <div className="addgame-card__field">
                    <label htmlFor="editOpponent">Opponent</label>
                    <input id="editOpponent"
                        type="text"
                        name="opponent"
                        value={formState.opponent}
                        onChange={handleInputChange}>
                    </input>
                </div>
                <div className="addgame-card__field">
                    <label htmlFor="editDate">Date</label>
                    <input id="editDate"
                        type="text"
                        name="date"
                        value={formState.date}
                        onChange={handleInputChange}>
                    </input>
                </div>
                <div className="addgame-card__field">
                    <label htmlFor="editLocation">Location</label>
                    <input id="editLocation"
                        type="text"
                        name="location"
                        value={formState.location}
                        onChange={handleInputChange}>
                    </input>
                </div>
                <div className="addgame-card__field">
                    <label htmlFor="editComments">Comments</label>
                    <input id="editComments"
                        type="text"
                        name="comments"
                        value={formState.comments}
                        onChange={handleInputChange}>
                    </input>
                </div>
                <div className="addgame-card__field">
                    <label htmlFor="editGamePGN">PGN</label>
                    <textarea className="addgame-card__field--pgn"
                        id="editGamePGN"
                        name="gamePGN"
                        value={formState.gamePGN}
                        onChange={handleInputChange}>
                    </textarea>
                </div>
                {error && <div>{getErrors().map(m => <p>{m}</p>)}</div>}
                {!error && <button type="submit">Submit</button>}
                {!error && <button onClick={handlePreviews}>Preview</button>}
            </form>
            {preview &&
                <div className="game-popup">
                    <img src="close.svg" className="game-popup__close" onClick={() => setPreview(false)} />
                    <h2>PGN preview</h2>
                    < ChessInterface optpgn={formState.gamePGN} />
                </div>
            }
        </div>
    )
}
