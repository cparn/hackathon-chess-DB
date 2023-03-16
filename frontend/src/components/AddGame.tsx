import React, { useState } from 'react'
import './AddGame.css'
import { Game } from './GamesList/GamesList'

type FormState = {
    opponent: string,
    date: string,
    location: string,
    comments: string,
    gamePGN: string
}

type GameRequest = {

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
        console.log(postResponse);
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
                {error && <div>error</div>}
                {!error && <button type="submit">Submit</button>}
            </form>
        </div>
    )
}
