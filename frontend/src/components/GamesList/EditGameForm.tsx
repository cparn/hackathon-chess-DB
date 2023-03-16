import React, { useEffect, useState } from 'react';
import { Game } from './GamesList';
import './EditGameForm.css';

type EditGameFormProps = {
    game: Game
}

type FormState = {
    opponent: string,
    date: string,
    location: string,
    comments: string
}

type ErrorType = {
    Location: string[] | undefined,
    Date: string[] | undefined,
    Opponent: string[] | undefined
}

export const EditGameForm: React.FC<EditGameFormProps> = ({ game }) => {
    const [formState, setFormState] = useState<FormState>({
        opponent: game.opponent,
        date: game.date,
        location: game.location,
        comments: game.comments
    });
    const [errorMessage, setErrorMessage] = useState<ErrorType>({
        Location: undefined,
        Date: undefined,
        Opponent: undefined
    });
    const [error, setError] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            gameId: game.gameId,
            opponent: formState.opponent,
            location: formState.location,
            date: formState.date,
            gamePGN: game.gamePGN,
            comments: formState.comments
        }
        const putResponse = await fetch(`http://localhost:5172/api/ChessGame/${game.gameId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const result = await putResponse.json();
        if (result.status != 204) {
            const errors = result.errors as ErrorType;
            setError(true);
            setErrorMessage(errors);
            setTimeout(() => {
                setError(false);
            }, 4000);
        }
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
        return res;
    }

    return (
        <>
            <h3>Edit game info</h3>
            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="edit-form__field">
                    <label htmlFor="editOpponent">Opponent</label>
                    <input id="editOpponent"
                        type="text"
                        name="opponent"
                        value={formState.opponent}
                        onChange={handleInputChange}>
                    </input>
                </div>
                <div className="edit-form__field">
                    <label htmlFor="editDate">Date</label>
                    <input id="editDate"
                        type="text"
                        name="date"
                        value={formState.date}
                        onChange={handleInputChange}>
                    </input>
                </div>
                <div className="edit-form__field">
                    <label htmlFor="editLocation">Location</label>
                    <input id="editLocation"
                        type="text"
                        name="location"
                        value={formState.location}
                        onChange={handleInputChange}>
                    </input>
                </div>
                <div className="edit-form__field">
                    <label htmlFor="editComments">Comments</label>
                    <input id="editComments"
                        type="text"
                        name="comments"
                        value={formState.comments}
                        onChange={handleInputChange}>
                    </input>
                </div>
                {error && <p>{getErrors().map(m => <p>{m}</p>)}</p>}
                {!error && <button type="submit">Submit</button>}
            </form>
        </>
    )
}
