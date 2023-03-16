import React, { useState } from 'react';
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
export const EditGameForm: React.FC<EditGameFormProps> = ({ game }) => {
    const [formState, setFormState] = useState<FormState>({
        opponent: game.opponent,
        date: game.date,
        location: game.location,
        comments: game.comments
    });

    return (
        <>
            <h3>Edit game</h3>
            <form className="edit-form">
                <div className="edit-form__field">
                    <label htmlFor="editOpponent">Opponent</label>
                    <input id="editOpponent" type="text" value={formState.opponent}>
                    </input>
                </div>
                <div className="edit-form__field">
                    <label htmlFor="editDate">Date</label>
                    <input id="editDate" type="text" value={formState.date}>
                    </input>
                </div>
                <div className="edit-form__field">
                    <label htmlFor="editLocation">Location</label>
                    <input id="editLocation" type="text" value={formState.location}>
                    </input>
                </div>
                <div className="edit-form__field">
                    <label htmlFor="editComments">Comments</label>
                    <input id="editComments" type="text" value={formState.comments}>
                    </input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
